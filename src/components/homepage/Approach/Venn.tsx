import React, { useEffect, useRef } from "react"

import styled from "styled-components"

import media from "styles/media"
import getMedia from "utils/getMedia"
import useAnimation from "utils/useAnimation"

import KEYFRAMES from "../05-KEYFRAMES"
import Frontend from "./Frontend"
import Data from "./Data"
import Backend from "./Backend"

type VennProps = {
  timeline: gsap.core.Timeline | null
  afterTimeline: gsap.core.Timeline | null
}

export default function Venn({ timeline, afterTimeline }: VennProps) {
  const container = useRef<HTMLDivElement>(null)

  const setSVGdisplay = (value: string) => {
    if (container.current) {
      // get all svg children
      const svgChildren = container.current.querySelectorAll("svg")
      svgChildren.forEach(child => {
        // get every circle and path
        const toRemove = Array.from(child.querySelectorAll("*"))

        // filter out the ones with .specialBackground
        const filtered = toRemove.filter(
          e => !e.classList.contains("specialBackground")
        )

        // set display to none
        filtered.forEach(e => {
          e.setAttribute("display", value)
        })
      })
    }
  }

  useAnimation(() => {
    setSVGdisplay("none") // make sure SVGs are initially invisible

    if (timeline && container.current) {
      // collapse venn diagram
      const circles = Array.from(container.current.children)
      for (let i = 0; i < circles.length; i += 1) {
        const circle = circles[i]
        if (circle instanceof HTMLElement)
          circle.style.removeProperty("transform")
      }
      timeline.from(container.current.children, {
          x: 0,
          y: 0,
          ease: "power3.inOut",
          duration:
            KEYFRAMES.FINISH_MOVE_TO_CENTER - KEYFRAMES.START_MOVE_TO_CENTER,
        }, KEYFRAMES.START_MOVE_TO_CENTER)

      // expand venn diagram
      timeline.to(container.current.children, {
          x: "inherit",
          y: "inherit",
          ease: "power3.inOut",
          duration:
            KEYFRAMES.FINISH_EXPAND_VENN_DIAGRAM -
            KEYFRAMES.START_EXPAND_VENN_DIAGRAM,
        }, KEYFRAMES.START_EXPAND_VENN_DIAGRAM)

      // cull svgs during zoom
      timeline
        .call(() => setSVGdisplay(""), [], KEYFRAMES.FINISH_EXPAND_VENN_DIAGRAM)
        .call(
          () => setSVGdisplay("none"),
          [],
          KEYFRAMES.FINISH_EXPAND_VENN_DIAGRAM + 0.1
        )
        .call(() => setSVGdisplay(""), [], KEYFRAMES.FINISH_MOVE_TO_CENTER)
        .call(
          () => setSVGdisplay("none"),
          [],
          KEYFRAMES.FINISH_MOVE_TO_CENTER - 0.1
        )
    }
  }, [timeline, container])

  useEffect(() => {
    if (container.current && afterTimeline) {
      // actual zoom
      // framed relative to bottom of container (instead of global timeline)
      afterTimeline
        .to(container.current.querySelectorAll("img:not(.intersection)"), {
          opacity: 0,
          display: "none",
          duration: 0.25,
        })
        .fromTo(container.current, {
            y: 0,
            scale: 1,
          },
          {
            scale: 800,
            y: () => getMedia("8000%", "8000%", "8000%", "6000%"),
            duration: 2,
            ease: "power3.in",
          }, 0)
        .to(container.current, {
            opacity: 0,
            duration: 0.5,
          }, 1)
        .set(container.current, {}, 2)
    }
  }, [afterTimeline, container])

  // if we start after the venn diagram, we need to make sure the svgs are invisible for performance
  useEffect(() => {
    if (timeline) {
      const time = timeline.rawTime()
      if (time >= KEYFRAMES.FINISH_EXPAND_VENN_DIAGRAM + 0.1)
        setSVGdisplay("none")
    }
  }, [timeline])

  return (
    <Wrapper>
      <Inner ref={container}>
        <Circle>
          <Backend timeline={timeline} />
        </Circle>
        <Circle>
          <Data timeline={timeline} />
        </Circle>
        <Circle>
          <Frontend timeline={timeline} />
        </Circle>
      </Inner>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  position: relative;
  grid-area: venn;
  height: 100%;

  ${media.tablet} {
    height: 100%;
  }
  ${media.mobile} {
    height: 111.2vw;
    @media (max-height: 800px) {
      height: 100%;
    }
  }
`

const Inner = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  position: relative;
  z-index: 2; //above maintext
  transform-origin: center;
  pointer-events: none;

  padding: 50px;
  ${media.desktop} {
    padding: 3.472vw;
  }
  ${media.tablet} {
    padding: 4.883vw;
  }
  ${media.mobile} {
    padding: 13.333vw 0 9.867vw;
    @media (max-height: 800px) {
      padding: 0;
    }
  }
`

const Circle = styled.div`
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0.95;

  &:last-child {
    grid-column: span 2;
    justify-self: center;
    z-index: 3;
  }

  &:first-child {
    z-index: 2;
  }

  width: 350px;
  height: 350px;
  margin: -60px -43px;
  &:nth-child(1) {
    transform: translate(132.5px, 115.5px);
  }
  &:nth-child(2) {
    transform: translate(-132.5px, 115.5px);
  }
  &:nth-child(3) {
    transform: translate(0, -115.5px);
  }
  ${media.desktop} {
    width: 24.306vw;
    height: 24.306vw;
    margin: -4.167vw -2.986vw;
    &:nth-child(1) {
      transform: translate(9.201vw, 8.021vw);
    }
    &:nth-child(2) {
      transform: translate(-9.201vw, 8.021vw);
    }
    &:nth-child(3) {
      transform: translate(0, -8.021vw);
    }
  }
  ${media.tablet} {
    width: 34.18vw;
    height: 34.18vw;
    margin: -5.859vw -4.199vw;
    &:nth-child(1) {
      transform: translate(12.939vw, 11.279vw);
    }
    &:nth-child(2) {
      transform: translate(-12.939vw, 11.279vw);
    }
    &:nth-child(3) {
      transform: translate(0, -11.279vw);
    }
  }
  ${media.mobile} {
    width: 52vw;
    height: 52vw;
    margin: -8vw -5.6vw;
    &:nth-child(1) {
      transform: translate(20.267vw, 18vw);
    }
    &:nth-child(2) {
      transform: translate(-20.267vw, 18vw);
    }
    &:nth-child(3) {
      transform: translate(0, -18vw);
    }
  }
`
