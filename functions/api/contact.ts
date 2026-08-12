/**
 * Cloudflare Pages Function: POST /api/contact
 *
 * O site é exportado estático (`output: "export"` no next.config.ts), então não
 * há backend no bundle do Next. Este arquivo vive FORA de src/, na raiz do
 * repositório, que é onde o Cloudflare Pages procura Functions. Ele é compilado
 * num Worker e servido pelo mesmo projeto do Pages: como `out/` não gera nada em
 * /api/contact, não existe conflito de rota.
 *
 * IMPORTANTE: `npm run dev` (Turbopack) NÃO executa Pages Functions, então em
 * dev este endpoint responde 404. Para testar de verdade:
 *
 *   npm run build && npx wrangler pages dev out
 *
 * com um `.dev.vars` na raiz (git-ignorado) contendo RESEND_API_KEY e
 * TURNSTILE_SECRET_KEY.
 *
 * Secrets em produção: painel do Cloudflare Pages > Settings > Environment
 * variables, em Production E Preview.
 */

type Env = {
  RESEND_API_KEY?: string
  TURNSTILE_SECRET_KEY?: string
}

type PagesContext = {
  request: Request
  env: Env
}

/** Sobrenome antes do nome é intencional, é o endereço real. Não "corrigir". */
const TO_EMAIL = "krziminski.mauricio@gmail.com"
const FROM_ADDRESS = "contato@mauriciokrziminski.com.br"

const TURNSTILE_VERIFY_URL =
  "https://challenges.cloudflare.com/turnstile/v0/siteverify"
const RESEND_URL = "https://api.resend.com/emails"

const LIMITS = {
  name: { min: 2, max: 100 },
  email: { min: 5, max: 160 },
  message: { min: 10, max: 5000 },
}

/**
 * Códigos de erro estáveis. O cliente traduz cada um via i18n, então este
 * arquivo nunca devolve texto voltado ao usuário final (e muito menos a
 * resposta crua do Resend, que pode conter detalhes da conta).
 */
type ErrorCode =
  | "invalid_json"
  | "invalid_name"
  | "invalid_email"
  | "invalid_message"
  | "captcha_failed"
  | "not_configured"
  | "send_failed"

function json(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      // resposta de formulário nunca deve ser cacheada por proxy nenhum
      "Cache-Control": "no-store",
    },
  })
}

const fail = (error: ErrorCode, status = 400) => json({ ok: false, error }, status)
const succeed = () => json({ ok: true }, 200)

function asTrimmedString(value: unknown): string {
  return typeof value === "string" ? value.trim() : ""
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}

/** Impede que o conteúdo enviado quebre (ou injete) markup no corpo HTML. */
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

/**
 * Cabeçalhos de email não podem conter quebra de linha: sem isso, um nome com
 * "\n" conseguiria injetar cabeçalhos próprios no email gerado.
 */
function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim()
}

/**
 * Monta o nome de exibição do remetente como quoted-string.
 *
 * O texto vem de quem preencheu o formulário, então aspas e barra invertida
 * precisam ser escapadas: um nome como `Ana "Aninha" Souza` quebraria o
 * cabeçalho se entrasse cru.
 */
function quotedName(value: string): string {
  const escaped = sanitizeHeader(value)
    .replace(/\\/g, "\\\\")
    .replace(/"/g, '\\"')
  return `"${escaped}"`
}

async function verifyTurnstile(
  token: string,
  secret: string,
  ip: string | null,
): Promise<boolean> {
  const body = new FormData()
  body.append("secret", secret)
  body.append("response", token)
  if (ip) body.append("remoteip", ip)

  try {
    const response = await fetch(TURNSTILE_VERIFY_URL, { method: "POST", body })
    const result = (await response.json()) as { success?: boolean }
    return result.success === true
  } catch {
    return false
  }
}

export async function onRequestPost(context: PagesContext): Promise<Response> {
  const { request, env } = context

  let payload: Record<string, unknown>
  try {
    payload = (await request.json()) as Record<string, unknown>
  } catch {
    return fail("invalid_json")
  }

  // Honeypot: campo escondido por CSS que só um bot preenche. Responde 200
  // fingindo sucesso de propósito, para não ensinar o bot a contornar.
  if (asTrimmedString(payload.company)) {
    return succeed()
  }

  const name = asTrimmedString(payload.name)
  const email = asTrimmedString(payload.email)
  const message = asTrimmedString(payload.message)
  const lang = asTrimmedString(payload.lang) === "en" ? "en" : "pt"

  if (name.length < LIMITS.name.min || name.length > LIMITS.name.max) {
    return fail("invalid_name")
  }
  if (
    email.length < LIMITS.email.min ||
    email.length > LIMITS.email.max ||
    !isValidEmail(email)
  ) {
    return fail("invalid_email")
  }
  if (
    message.length < LIMITS.message.min ||
    message.length > LIMITS.message.max
  ) {
    return fail("invalid_message")
  }

  // Turnstile só é exigido quando o secret está configurado. Isso mantém o
  // endpoint testável localmente sem o widget, sem abrir brecha em produção,
  // onde o secret sempre existe.
  if (env.TURNSTILE_SECRET_KEY) {
    const token = asTrimmedString(payload.turnstileToken)
    if (!token) return fail("captcha_failed")

    const ok = await verifyTurnstile(
      token,
      env.TURNSTILE_SECRET_KEY,
      request.headers.get("CF-Connecting-IP"),
    )
    if (!ok) return fail("captcha_failed")
  }

  if (!env.RESEND_API_KEY) {
    // Falha controlada: a chave não está configurada no ambiente. Não é culpa
    // de quem preencheu o formulário, então devolve 500, não 400.
    return fail("not_configured", 500)
  }

  const safeName = sanitizeHeader(name)
  const text = [
    `Nome: ${name}`,
    `Email: ${email}`,
    `Idioma do site: ${lang}`,
    "",
    message,
  ].join("\n")

  const html = [
    `<p><strong>Nome:</strong> ${escapeHtml(name)}</p>`,
    `<p><strong>Email:</strong> ${escapeHtml(email)}</p>`,
    `<p><strong>Idioma do site:</strong> ${lang}</p>`,
    "<hr />",
    `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
  ].join("")

  try {
    const response = await fetch(RESEND_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        // charset explicito por precaucao. JSON ja e UTF-8 por definicao
        // (RFC 8259) e o Resend interpreta certo sem isto, entao nao e correcao
        // de bug nenhum: e so nao depender do default de quem recebe.
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify({
        // O nome de exibição é o de quem preencheu, para a lista do Gmail
        // mostrar quem escreveu sem precisar abrir a mensagem. O ENDEREÇO
        // continua sendo o do domínio verificado, que é o que DKIM/SPF/DMARC
        // conferem, então a autenticação não muda.
        from: `${quotedName(`${safeName} (via site)`)} <${FROM_ADDRESS}>`,
        to: [TO_EMAIL],
        // responder no Gmail vai direto para quem preencheu o formulário
        reply_to: sanitizeHeader(email),
        // o nome já vai no remetente, então não se repete aqui
        subject: "Novo contato pelo site",
        text,
        html,
      }),
    })

    if (!response.ok) {
      // O corpo do erro do Resend pode expor detalhes da conta, então fica só
      // no log do Worker e nunca na resposta ao cliente.
      console.error("Resend respondeu", response.status, await response.text())
      return fail("send_failed", 502)
    }
  } catch (error) {
    console.error("Falha ao chamar o Resend", error)
    return fail("send_failed", 502)
  }

  return succeed()
}
