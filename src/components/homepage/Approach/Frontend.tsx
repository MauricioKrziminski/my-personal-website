import React, { useRef } from "react"

import styled from "styled-components"

import BackgroundPNG from "images/homepage/approach/frontend-background.webp"
import FrontendSVG from "images/homepage/approach/frontend.svg"
const IntersectionSVG = "/images/homepage/approach/intersection.svg"
import media from "styles/media"
import useAnimation from "utils/useAnimation"
import { useT } from "utils/i18n/useT"

import KEYFRAMES from "../05-KEYFRAMES"
import { Wrapper, BeforeText, Text, Image } from "./VennUI"

type FrontendProps = {
  timeline: gsap.core.Timeline | null
}

export default function Frontend({ timeline }: FrontendProps) {
  const svg = useRef<SVGSVGElement>(null)
  const t = useT()
  const text = useRef<HTMLDivElement>(null)
  const beforeText = useRef<HTMLDivElement>(null)
  const staticBackground = useRef<HTMLImageElement>(null)
  const intersection = useRef<HTMLImageElement>(null)

  useAnimation(() => {
    if (svg.current && timeline) {
      const elementsToAnimate = svg.current.querySelectorAll("g")
      const elementsToAnimateArray = Array.from(elementsToAnimate)
      const one = elementsToAnimateArray.filter(element =>
        element.classList.contains("one")
      )
      const two = elementsToAnimateArray.filter(element =>
        element.classList.contains("two")
      )
      const three = elementsToAnimateArray.filter(element =>
        element.classList.contains("three")
      )
      const four = elementsToAnimateArray.filter(element =>
        element.classList.contains("four")
      )

      // fade out everything at beginning
      timeline
        .fromTo([beforeText.current], {
            opacity: 1,
          },
          {
            opacity: 0,
            duration:
              KEYFRAMES.FINISH_MOVE_TO_CENTER - KEYFRAMES.START_MOVE_TO_CENTER,
          }, KEYFRAMES.START_MOVE_TO_CENTER)
        .fromTo([staticBackground.current], {
            opacity: 0.08,
          },
          {
            opacity: 0,
            duration:
              KEYFRAMES.FINISH_MOVE_TO_CENTER - KEYFRAMES.START_MOVE_TO_CENTER,
          }, KEYFRAMES.START_MOVE_TO_CENTER)

      // fade back in when needed
      timeline
        .fromTo([beforeText.current], {
            opacity: 0,
          },
          {
            opacity: 1,
            duration:
              KEYFRAMES.FINISH_BLOCKCHAIN_FADE_IN -
              KEYFRAMES.START_BLOCKCHAIN_FADE_IN,
          }, KEYFRAMES.START_BLOCKCHAIN_FADE_IN)
        .fromTo([staticBackground.current], {
            opacity: 0,
          },
          {
            opacity: 0.08,
            duration:
              KEYFRAMES.FINISH_BLOCKCHAIN_FADE_IN -
              KEYFRAMES.START_BLOCKCHAIN_FADE_IN,
          }, KEYFRAMES.START_BLOCKCHAIN_FADE_IN)

      // animate in the lines
      const TIME = KEYFRAMES.START_BLOCKCHAIN_LINES
      const TOTAL = KEYFRAMES.FINISH_BLOCKCHAIN_LINES - TIME
      timeline
        .fromTo(one, {
            y: -500,
          },
          {
            y: 0,
            duration: TOTAL,
          }, TIME)
        .fromTo(two, {
            x: -500,
            y: -500,
          },
          {
            x: 0,
            y: 0,
            duration: TOTAL,
          }, TIME)
        .fromTo(three, {
            y: 500,
          },
          {
            y: 0,
            duration: TOTAL,
          }, TIME)
        .fromTo(four, {
            x: 500,
            y: 500,
          },
          {
            x: 0,
            y: 0,
            duration: TOTAL,
          }, TIME)

      // fade in colored background
      timeline.fromTo(svg.current, {
          opacity: 0,
        },
        {
          opacity: 1,
          duration:
            KEYFRAMES.FINISH_BLOCKCHAIN_COLOR -
            KEYFRAMES.START_BLOCKCHAIN_COLOR,
        }, KEYFRAMES.START_BLOCKCHAIN_COLOR)

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
              KEYFRAMES.FINISH_BLOCKCHAIN_COLOR -
              KEYFRAMES.START_BLOCKCHAIN_COLOR,
          }, KEYFRAMES.START_BLOCKCHAIN_COLOR)
        .fromTo(text.current, {
            y: "-100%",
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          },
          {
            y: "0%",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration:
              KEYFRAMES.FINISH_BLOCKCHAIN_COLOR -
              KEYFRAMES.START_BLOCKCHAIN_COLOR,
          }, KEYFRAMES.START_BLOCKCHAIN_COLOR)

      // remove o accent ao expandir o diagrama
      timeline.fromTo([one, two, three, four], {
          opacity: 1,
        },
        {
          opacity: 0,
          duration:
            KEYFRAMES.FINISH_EXPAND_VENN_DIAGRAM -
            KEYFRAMES.START_EXPAND_VENN_DIAGRAM,
        }, KEYFRAMES.START_EXPAND_VENN_DIAGRAM)

      // slide main text down

      timeline.to(text.current, {
          y: "30%",
          duration:
            KEYFRAMES.FINISH_EXPAND_VENN_DIAGRAM -
            KEYFRAMES.START_EXPAND_VENN_DIAGRAM,
        }, KEYFRAMES.START_EXPAND_VENN_DIAGRAM)

      // fade in intersection
      timeline.fromTo(intersection.current, {
          opacity: 0,
        },
        {
          opacity: 1,
          duration:
            KEYFRAMES.FINISH_SHOW_TRIANGLE - KEYFRAMES.START_SHOW_TRIANGLE,
        }, KEYFRAMES.START_SHOW_TRIANGLE)
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
      <Text ref={text}>{t.skills.frontend}</Text>
      <BeforeText ref={beforeText}>{t.skills.frontendShort}</BeforeText>
      <Intersection
        className="intersection"
        ref={intersection}
        src={IntersectionSVG}
        alt="triangulo destacando a intersecao dos tres circulos do diagrama"
      />
    </Wrapper>
  )
}

const BG = styled(FrontendSVG)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const Intersection = styled.img<{ alt: string }>`
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 3;
  opacity: 0;

  transform: translateX(calc(-50% + 0.2px));
  width: 66.4px;
  ${media.desktop} {
    transform: translateX(calc(-50% + 0.014vw));
    width: 4.611vw;
  }
  ${media.tablet} {
    transform: translateX(calc(-50% + 0.02vw));
    width: 6.484vw;
  }
  ${media.mobile} {
    transform: translateX(calc(-50% + 0.0265vw));
    width: 6.83vw;
  }
`
