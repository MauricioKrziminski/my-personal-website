"use client"

import React, { useEffect, useRef, useState } from "react"

import styled from "styled-components"

import colors from "styles/colors"
import { isBrowser, isColorLight } from "utils/functions"

import { type Language } from "./LanguageContext"
import { useLang } from "./useT"

/**
 * PT | EN language switch. The active language is the brand accent; the inactive
 * one is a dimmed neutral. Because header sections range from light to dark, the
 * inactive color would vanish if it just inherited a fixed header color (dark on
 * a dark section). So the toggle samples the background behind it — like the
 * logo does — and flips its neutral between dark and light to stay legible.
 */
export default function LanguageToggle({ className }: { className?: string }) {
  const { lang, setLang } = useLang()
  const wrapper = useRef<HTMLDivElement>(null)
  const [onLight, setOnLight] = useState(true)

  useEffect(() => {
    if (!isBrowser()) return undefined

    const update = () => {
      const el = wrapper.current
      const header = document.querySelector("header")
      if (!el || !header) return

      const rect = el.getBoundingClientRect()
      const elements = document.elementsFromPoint(
        rect.left + rect.width / 2,
        rect.top + rect.height / 2
      )
      // first element behind the header that actually paints a background
      const behind = elements.find(
        node =>
          !header.contains(node) &&
          window.getComputedStyle(node).backgroundColor !== "rgba(0, 0, 0, 0)"
      )
      if (behind) {
        const color = window.getComputedStyle(behind).backgroundColor
        setOnLight(isColorLight(color))
      }
    }

    const id = setInterval(() => requestAnimationFrame(update), 250)
    return () => clearInterval(id)
  }, [])

  const langs: Language[] = ["pt", "en"]

  return (
    <Wrapper className={className} ref={wrapper}>
      {langs.map((code, i) => (
        <React.Fragment key={code}>
          {i > 0 && <Divider $onLight={onLight}>/</Divider>}
          <Option
            type="button"
            $isActive={lang === code}
            $onLight={onLight}
            onClick={() => setLang(code)}
            aria-label={code === "pt" ? "Português" : "English"}
          >
            {code.toUpperCase()}
          </Option>
        </React.Fragment>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 14px;
  line-height: 1;
  letter-spacing: 0.02em;
`

const Divider = styled.span<{ $onLight: boolean }>`
  color: ${({ $onLight }) => ($onLight ? colors.mainBlack : colors.mainWhite)};
  opacity: 0.4;
`

const Option = styled.button<{ $isActive: boolean; $onLight: boolean }>`
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  font: inherit;
  color: ${({ $isActive, $onLight }) =>
    $isActive
      ? colors.mainAccent
      : $onLight
      ? colors.mainBlack
      : colors.mainWhite};
  opacity: ${({ $isActive }) => ($isActive ? 1 : 0.55)};
  transition: opacity 0.2s, color 0.2s;

  &:hover {
    opacity: 1;
  }
`
