import { useCallback, useEffect, useRef, useState } from "react"

import {
  isTurnstileEnabled,
  TURNSTILE_SCRIPT_SRC,
  TURNSTILE_SITE_KEY,
} from "utils/turnstile"

type TurnstileOptions = {
  sitekey: string
  callback: (token: string) => void
  "expired-callback": () => void
  "error-callback": () => void
  theme?: "light" | "dark" | "auto"
}

type TurnstileApi = {
  render: (el: HTMLElement, options: TurnstileOptions) => string
  remove: (id: string) => void
  reset: (id: string) => void
}

declare global {
  interface Window {
    turnstile?: TurnstileApi
  }
}

/**
 * Carrega o script uma vez só. O site navega sem recarregar a página (o
 * ScrollSmoother e o loader do projeto mantêm o documento vivo), então entrar e
 * sair da página de contato não pode injetar o script de novo.
 */
function loadTurnstileScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve()

  const existing = document.querySelector<HTMLScriptElement>(
    `script[src="${TURNSTILE_SCRIPT_SRC}"]`,
  )
  if (existing) {
    return new Promise((resolve, reject) => {
      existing.addEventListener("load", () => resolve())
      existing.addEventListener("error", () =>
        reject(new Error("turnstile: falha ao carregar o script")),
      )
    })
  }

  return new Promise((resolve, reject) => {
    const script = document.createElement("script")
    script.src = TURNSTILE_SCRIPT_SRC
    script.async = true
    script.defer = true
    script.addEventListener("load", () => resolve())
    script.addEventListener("error", () =>
      reject(new Error("turnstile: falha ao carregar o script")),
    )
    document.head.appendChild(script)
  })
}

/**
 * Renderiza o widget do Turnstile no elemento apontado e devolve o token atual.
 *
 * Usa renderização explícita (e não a implícita por class="cf-turnstile") porque
 * a implícita só roda uma vez, quando o script carrega: numa navegação de volta
 * para /contact o widget não voltaria a aparecer.
 *
 * `ready` é false enquanto o script não carregou. Se ele nunca carregar (rede
 * bloqueada, bloqueador de anúncios), o token fica vazio e o submit segue assim
 * mesmo: quem decide é o servidor, que rejeita sem token quando o secret está
 * configurado. Nunca travar o botão por causa de um script de terceiro.
 */
export default function useTurnstile(
  container: React.RefObject<HTMLDivElement | null>,
) {
  const [token, setToken] = useState("")
  const [ready, setReady] = useState(false)
  const widgetId = useRef<string | null>(null)

  useEffect(() => {
    // sem site key configurada o Turnstile fica desligado: nem carrega o script
    // de terceiro, nem renderiza widget. O honeypot continua valendo, e a
    // Function tambem nao exige token (ela so exige quando o secret existe).
    if (!isTurnstileEnabled) return undefined

    let cancelled = false

    loadTurnstileScript()
      .then(() => {
        if (cancelled || !container.current || !window.turnstile) return
        widgetId.current = window.turnstile.render(container.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: (value: string) => setToken(value),
          "expired-callback": () => setToken(""),
          "error-callback": () => setToken(""),
          theme: "light",
        })
        setReady(true)
      })
      .catch((error: unknown) => {
        console.error(error)
      })

    return () => {
      cancelled = true
      if (widgetId.current && window.turnstile) {
        window.turnstile.remove(widgetId.current)
        widgetId.current = null
      }
    }
  }, [container])

  /** Depois de um envio, o token queima: precisa de um novo para o próximo. */
  const reset = useCallback(() => {
    setToken("")
    if (widgetId.current && window.turnstile) {
      window.turnstile.reset(widgetId.current)
    }
  }, [])

  return { token, ready, reset }
}
