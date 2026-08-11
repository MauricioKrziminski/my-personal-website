/**
 * Cloudflare Turnstile (anti-spam do formulário de contato).
 *
 * ─── Como ligar ─────────────────────────────────────────────────────────────
 * O Turnstile é OPCIONAL. Com a site key vazia (o padrão), o widget não é nem
 * carregado e o formulário funciona normalmente, protegido só pelo honeypot.
 *
 * Para ligar, precisa dos DOIS lados, senão o formulário para de aceitar envios:
 *   1. site key (pública) aqui embaixo;
 *   2. TURNSTILE_SECRET_KEY nos secrets do Cloudflare Pages (Production E
 *      Preview). A Function só exige o token quando esse secret existe.
 *
 * Ambos saem do mesmo widget, criado em Turnstile no dashboard do Cloudflare
 * (produto no nível da CONTA, fora de Workers e Pages).
 *
 * ─── Por que a site key mora no código ──────────────────────────────────────
 * Ela é pública por design: fica no HTML, visível para qualquer um. Quem protege
 * é a secret key, que só existe no ambiente da Function. Com output: "export"
 * uma NEXT_PUBLIC_* seria inlinada no bundle do mesmo jeito, então uma constante
 * documentada é mais honesta que fingir que é segredo.
 *
 * ─── Para testar localmente ─────────────────────────────────────────────────
 * Cole temporariamente a chave de teste da Cloudflare, que aprova sempre:
 *   1x00000000000000000000AA
 * e no .dev.vars use o secret par dela: 1x0000000000000000000000000000000AA
 * (o 2x000...AA é o par que reprova sempre, útil para testar o caminho de erro).
 *
 * NÃO faça deploy com a chave de teste: o widget aparece em produção com a
 * tarja vermelha "For testing only. If seen, report to site owner".
 */
export const TURNSTILE_SITE_KEY = ""

/** Com a site key vazia o widget é ignorado por inteiro (ver useTurnstile). */
export const isTurnstileEnabled = TURNSTILE_SITE_KEY.length > 0

/** URL do script, em modo de renderização explícita (ver useTurnstile). */
export const TURNSTILE_SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
