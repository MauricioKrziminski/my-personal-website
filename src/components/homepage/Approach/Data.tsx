import React, { useRef } from "react"

import styled from "styled-components"

import BackgroundPNG from "images/homepage/approach/data-background.webp"
import DataSVG from "images/homepage/approach/Data.svg"
import useAnimation from "utils/useAnimation"
import { useT } from "utils/i18n/useT"

import KEYFRAMES from "../05-KEYFRAMES"
import { Wrapper, Image, Text, BeforeText } from "./VennUI"

type DataProps = {
  timeline: gsap.core.Timeline | null
}

export default function Data({ timeline }: DataProps) {
  const svg = useRef<SVGSVGElement>(null)
  const t = useT()
  const text = useRef<HTMLDivElement>(null)
  const beforeText = useRef<HTMLDivElement>(null)
  const staticBackground = useRef<HTMLImageElement>(null)

  useAnimation(() => {
    if (svg.current && timeline) {
      const elementsToAnimate = svg.current.querySelectorAll(
        "circle:not(.specialBackground)"
      )

      const SIZE = 1000

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
      // fade out everything at beginning
      timeline
        .fromTo([beforeText.current], {
            opacity: 0,
          },
          {
            opacity: 1,
            duration:
              KEYFRAMES.FINISH_DATA_FADE_IN - KEYFRAMES.START_DATA_FADE_IN,
          }, KEYFRAMES.START_DATA_FADE_IN)
        .fromTo([staticBackground.current], {
            opacity: 0,
          },
          {
            opacity: 0.08,
            duration:
              KEYFRAMES.FINISH_DATA_FADE_IN - KEYFRAMES.START_DATA_FADE_IN,
          }, KEYFRAMES.START_DATA_FADE_IN)

      // animate the circles
      timeline.fromTo(elementsToAnimate, {
          scale: 10,
          x: () => {
            const x = Math.random()
            return x < 0.5 ? x * -SIZE - SIZE : x * SIZE + SIZE
          },
          y: () => {
            const x = Math.random()
            return x < 0.5 ? x * -SIZE - SIZE : x * SIZE + SIZE
          },
        },
        {
          scale: 1,
          x: 0,
          y: 0,
          stagger: {
            amount: KEYFRAMES.FINISH_DATA_DOTS - KEYFRAMES.START_DATA_DOTS,
            from: "end",
          },
          ease: "power4.out",
        }, KEYFRAMES.START_DATA_DOTS)

      // fade in colored background
      timeline.fromTo(svg.current, {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: KEYFRAMES.FINISH_DATA_COLOR - KEYFRAMES.START_DATA_COLOR,
        }, KEYFRAMES.START_DATA_COLOR)

      // fade out before text and fade in text (part of color change)
      timeline
        .fromTo(beforeText.current, {
            y: "0%",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          },
          {
            y: "100%",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            duration: KEYFRAMES.FINISH_DATA_COLOR - KEYFRAMES.START_DATA_COLOR,
          }, KEYFRAMES.START_DATA_COLOR)
        .fromTo(text.current, {
            y: "-100%",
            clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          },
          {
            y: "0%",
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: KEYFRAMES.FINISH_DATA_COLOR - KEYFRAMES.START_DATA_COLOR,
          }, KEYFRAMES.START_DATA_COLOR)

      // fade out everything
      timeline
        .fromTo([svg.current, text.current], {
            opacity: 1,
          },
          {
            opacity: 0,
            duration:
              KEYFRAMES.FINISH_BLOCKCHAIN_FADE_IN -
              KEYFRAMES.START_BLOCKCHAIN_FADE_IN,
          }, KEYFRAMES.START_BLOCKCHAIN_FADE_IN)
        .fromTo([staticBackground.current], {
            opacity: 0.08,
          },
          {
            opacity: 0,
            duration:
              KEYFRAMES.FINISH_BLOCKCHAIN_FADE_IN -
              KEYFRAMES.START_BLOCKCHAIN_FADE_IN,
          }, KEYFRAMES.START_BLOCKCHAIN_FADE_IN)

      // remove the green when nobody's looking at it
      timeline.fromTo(elementsToAnimate, {
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

      // slide text up and to the right when expanding diagram
      timeline.to(text.current, {
          yPercent: -10,
          xPercent: 12,
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
      <Text ref={text}>{t.skills.data}</Text>
      <BeforeText ref={beforeText}>{t.skills.dataShort}</BeforeText>
    </Wrapper>
  )
}

const BG = styled(DataSVG)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
