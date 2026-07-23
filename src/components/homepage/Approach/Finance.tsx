import React, { useRef } from "react"

import styled from "styled-components"

import BackgroundPNG from "images/homepage/approach/finance-background.webp"
import FinanceSVG from "images/homepage/approach/finance.svg"
import useAnimation from "utils/useAnimation"
import { useT } from "utils/i18n/useT"

import KEYFRAMES from "../05-KEYFRAMES"
import { Wrapper, Image, Text, BeforeText } from "./VennUI"

type FinanceProps = {
  timeline: gsap.core.Timeline | null
}

export default function Finance({ timeline }: FinanceProps) {
  const svg = useRef<SVGSVGElement>(null)
  const t = useT()
  const text = useRef<HTMLDivElement>(null)
  const beforeText = useRef<HTMLDivElement>(null)
  const staticBackground = useRef<HTMLImageElement>(null)

  useAnimation(() => {
    if (svg.current && timeline) {
      const elementsToAnimate = svg.current.querySelectorAll("rect")
      // filter out elements with class of "background"
      const elementsToAnimateArray = Array.from(elementsToAnimate)
      const filtered = elementsToAnimateArray.filter(
        element => !element.classList.contains("background")
      )

      // animate in the lines
      timeline.from(filtered, {
          scaleY: 0,
          stagger: {
            amount:
              KEYFRAMES.FINISH_FINANCE_LINES - KEYFRAMES.START_FINANCE_LINES,
            from: "end",
          },
        }, KEYFRAMES.START_FINANCE_LINES)

      // fade in colored background
      timeline.fromTo(svg.current, {
          opacity: 0,
        },
        {
          opacity: 1,
          duration:
            KEYFRAMES.FINISH_FINANCE_COLOR - KEYFRAMES.START_FINANCE_COLOR,
        }, KEYFRAMES.START_FINANCE_COLOR)

      // fade out before text and fade in text (part of color change)
      timeline
        .fromTo(beforeText.current, {
            y: "0%",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          },
          {
            y: "100%",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration:
              KEYFRAMES.FINISH_FINANCE_COLOR - KEYFRAMES.START_FINANCE_COLOR,
          }, KEYFRAMES.START_FINANCE_COLOR)
        .fromTo(text.current, {
            y: "-100%",
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          },
          {
            y: "0%",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration:
              KEYFRAMES.FINISH_FINANCE_COLOR - KEYFRAMES.START_FINANCE_COLOR,
          }, KEYFRAMES.START_FINANCE_COLOR)

      // fade out everything
      timeline
        .fromTo([svg.current, text.current], {
            opacity: 1,
          },
          {
            opacity: 0,
            duration:
              KEYFRAMES.FINISH_DATA_FADE_IN - KEYFRAMES.START_DATA_FADE_IN,
          }, KEYFRAMES.START_DATA_FADE_IN)
        .fromTo([staticBackground.current], {
            opacity: 0.08,
          },
          {
            opacity: 0,
            duration:
              KEYFRAMES.FINISH_DATA_FADE_IN - KEYFRAMES.START_DATA_FADE_IN,
          }, KEYFRAMES.START_DATA_FADE_IN)

      // remove the green when nobody's looking at it
      timeline.fromTo(filtered, {
          opacity: 1,
        },
        {
          opacity: 0,
          duration: 0,
        }, KEYFRAMES.FINISH_BLOCKCHAIN_LINES)

      // fade back in when expanding diagram
      // fade out everything
      timeline
        .fromTo([svg.current, text.current], {
            opacity: 0,
          },
          {
            opacity: 1,
            duration:
              KEYFRAMES.FINISH_EXPAND_VENN_DIAGRAM -
              KEYFRAMES.START_EXPAND_VENN_DIAGRAM,
          }, KEYFRAMES.START_EXPAND_VENN_DIAGRAM)
        .fromTo([staticBackground.current], {
            opacity: 0,
          },
          {
            opacity: 0.08,
            duration:
              KEYFRAMES.FINISH_EXPAND_VENN_DIAGRAM -
              KEYFRAMES.START_EXPAND_VENN_DIAGRAM,
          }, KEYFRAMES.START_EXPAND_VENN_DIAGRAM)

      // slide text up and to the left when expanding diagram
      timeline.to(text.current, {
          yPercent: -10,
          xPercent: -12,
          duration:
            KEYFRAMES.FINISH_EXPAND_VENN_DIAGRAM -
            KEYFRAMES.START_EXPAND_VENN_DIAGRAM,
        }, KEYFRAMES.START_EXPAND_VENN_DIAGRAM)
    }
  }, [svg, timeline])

  return (
    <Wrapper>
      <Image
        loading="lazy"
        src={BackgroundPNG.src}
        ref={staticBackground}
        alt="a textured background"
      />
      <BG ref={svg} />
      <Text ref={text}>{t.skills.backend}</Text>
      <BeforeText ref={beforeText}>{t.skills.backendShort}</BeforeText>
    </Wrapper>
  )
}

const BG = styled(FinanceSVG)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
