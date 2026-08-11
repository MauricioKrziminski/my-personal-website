import React, { useEffect, useRef } from "react"

import gsap from "gsap"
import styled, { keyframes } from "styled-components"

import colors from "styles/colors"
import media from "styles/media"
import { strokeText } from "styles/text"
import { pageReady } from "utils/pageReady"

type NavItemProps = {
  children: string
  navOnScreen?: boolean
  color: string
  isActive: boolean
}

export default function NavItem({
  children: textValue,
  navOnScreen = false,
  color,
  isActive,
}: NavItemProps) {
  const hoverEl = useRef<HTMLDivElement>(null)
  const item = useRef<HTMLDivElement>(null)
  const blinky = useRef<HTMLDivElement>(null)

  const textTimeline = useRef<gsap.core.Timeline | null>(null)

  // initial animation into screen
  useEffect(() => {
    pageReady(() => {
      if (navOnScreen) {
        textTimeline.current?.kill()
        textTimeline.current = gsap.timeline({})

        // make item width static
        if (item.current && hoverEl.current) {
          hoverEl.current.style.removeProperty("width")
          item.current.innerText = textValue
          hoverEl.current.style.width = `${hoverEl.current.offsetWidth}px`
          item.current.innerText = ""
        }

        gsap.fromTo(item.current, {
            text: {
              value: "",
            },
          },
          {
            text: {
              value: textValue,
            },
            delay: 0.5,
            onStart: () => {
              if (blinky.current) {
                blinky.current.style.opacity = "1"
                blinky.current.style.animation = "unset"
              }
            },
            onComplete: () => {
              if (blinky.current) {
                blinky.current.style.removeProperty("opacity")
                blinky.current.style.removeProperty("animation")
              }
            },
          })
      }
    }).catch(console.error)
  }, [navOnScreen, textValue])

  // On hover the word must stay put — only the accent blinky dash should pulse
  // (handled purely by the `${Wrapper}:hover &` CSS below). The old
  // mouse-enter handler re-typed the whole word letter-by-letter, which is not
  // how the original menu behaves.

  return (
    <Wrapper ref={hoverEl}>
      <Item ref={item} isActive={isActive} color={color}>
        {textValue}
      </Item>
      <Blinky ref={blinky} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  align-items: baseline;
  width: 100%;
  position: relative;
  cursor: pointer;
`

const Item = styled.div<{ isActive: boolean; color: string }>`
  ${({ isActive }) => !isActive && strokeText};
  color: ${({ color }) => color};
  /* o polígono ficava exatamente na caixa do elemento, que com o line-height:100%
     dos tokens de texto tem a altura da fonte: as descidas de g, j, p, q, y e @
     passam ~7% abaixo dela e maiúsculas acentuadas ~3% acima, então apareciam
     raspadas (e-mail do rodapé, "Projetos" no menu). Sobra vertical de 15% em
     cima e embaixo; o recorte horizontal segue igual. */
  clip-path: polygon(0 -15%, 100% -15%, 100% 115%, 0 115%);
  display: flex;
  flex-wrap: nowrap;
  width: fit-content;
  padding-right: 1%;
`

const blinks = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const Blinky = styled.div`
  border-bottom: 10px solid ${colors.mainAccent};
  display: inline-block;
  width: 60px;
  height: 80px;
  transform: translateY(10px);
  z-index: 1;
  opacity: 0;

  ${Wrapper}:hover & {
    animation: ${blinks} 0.5s steps(1) infinite;
  }

  ${media.mobile} {
    width: 8vw;
  }
`
