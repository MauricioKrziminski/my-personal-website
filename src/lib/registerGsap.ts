import gsap from "gsap"
import ScrollSmoother from "gsap/ScrollSmoother"
import ScrollTrigger from "gsap/ScrollTrigger"
import SplitText from "gsap/SplitText"
import { TextPlugin } from "gsap/TextPlugin"

/**
 * Registers the GSAP plugins the ported site relies on. The original Gatsby
 * build did this in gatsby-browser.js (not carried over), so without it
 * ScrollSmoother/ScrollTrigger/SplitText/TextPlugin fail at runtime (e.g.
 * `new SplitText()` throws "reading 'overwrite'" when its gsap link is unset).
 *
 * Imported for its side effect at the top of the client AppShell boundary,
 * before any effects run.
 */
// CSSPlugin nao entra aqui de proposito: ele ja vem embutido e auto-registrado
// no core do GSAP 3, e importa-lo so aumentava o bundle.
gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText, TextPlugin)

// The original site set a global default ease in gatsby-browser.tsx, so every
// tween that doesn't specify its own ease animates with power1.inOut. Without
// this the port's animations use GSAP's built-in default and feel different.
gsap.defaults({
  ease: "power1.inOut",
})

// Also expose gsap globally: some plugins (notably SplitText) fall back to
// `window.gsap` to locate the core, and ESM builds don't set it automatically.
if (typeof window !== "undefined") {
  ;(window as unknown as { gsap: typeof gsap }).gsap = gsap
}

export {}
