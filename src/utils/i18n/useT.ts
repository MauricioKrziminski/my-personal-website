import { useContext } from "react"

import { LanguageContext } from "./LanguageContext"
import { strings, type Strings } from "./strings"

/**
 * `useLang()` — read/set the current language.
 * `useT()` — the copy dictionary for the current language.
 */
export const useLang = () => useContext(LanguageContext)

export const useT = (): Strings => {
  const { lang } = useContext(LanguageContext)
  return strings[lang]
}
