import { useState, useEffect, useCallback } from "react"

import { isBrowser } from "./functions"

export default function useInnerVh(vh: number) {
  /* o valor inicial precisa ser a propria fracao pedida, nao 100vh. este hook
     alimenta distancias pequenas (o bottom do marquee do loader, o gap do menu),
     entao um default de 100vh jogava o elemento para fora da tela no HTML
     estatico, antes do primeiro effect. no loader isso deixava o "0%" como unico
     elemento pintavel no mobile, o que ajudava o Lighthouse a falhar com
     NO_FCP. */
  const [currentHeight, setCurrentHeight] = useState(`${vh}vh`)

  const updateSize = useCallback(() => {
    if (isBrowser()) {
      if (window.innerHeight === 0) setCurrentHeight(`${vh}vh`)
      else setCurrentHeight(`${window.innerHeight * (vh / 100)}px`)
    }
  }, [vh])

  useEffect(() => {
    updateSize()
    window.addEventListener("resize", updateSize)
    return () => {
      window.removeEventListener("resize", updateSize)
    }
  }, [updateSize])

  return currentHeight
}
