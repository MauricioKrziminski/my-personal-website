"use client"

import React, { createContext, useEffect, useMemo, useState } from "react"

export type Language = "pt" | "en"

interface LanguageContextValue {
  lang: Language
  setLang: (lang: Language) => void
}

export const LanguageContext = createContext<LanguageContextValue>({
  lang: "pt",
  setLang: () => {},
})

const STORAGE_KEY = "lang"

const getInitialLang = (): Language => {
  if (typeof window === "undefined") return "pt"
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored === "pt" || stored === "en") return stored
  const browser = window.navigator.language?.toLowerCase() ?? ""
  return browser.startsWith("pt") ? "pt" : "en"
}

type Props = {
  children: React.ReactNode
}

export default function Language({ children }: Props) {
  // Start from the SSR-safe default so server and first client render match,
  // then resolve the real preference on mount (avoids hydration mismatch).
  const [lang, setLangState] = useState<Language>("pt")

  useEffect(() => {
    setLangState(getInitialLang())
  }, [])

  const setLang = (next: Language) => {
    setLangState(next)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next)
      document.documentElement.lang = next
    }
  }

  useEffect(() => {
    if (typeof document !== "undefined") document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(() => ({ lang, setLang }), [lang])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
