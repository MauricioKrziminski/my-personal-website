import React, { useEffect, useRef, useState } from "react"

import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import styled from "styled-components"

import { useIsSmooth } from "components/Scroll"
import media from "styles/media"
import text from "styles/text"
import { useT } from "utils/i18n/useT"
import useAnimation from "utils/useAnimation"

import ScrollInvite from "../ScrollInvite"
import KEYFRAMES from "./05-KEYFRAMES"
import Description from "./Approach/Description"
import Venn from "./Approach/Venn"

const SCROLL_DURATION = "3000px"

export default function Approach() {
  const t = useT()
  const wrapper = useRef<HTMLDivElement>(null)
  const outer = useRef<HTMLDivElement>(null)
  const [timeline, setTimeline] = useState<gsap.core.Timeline | null>(null)
  const [afterTimeline, setAfterTimeline] = useState<gsap.core.Timeline | null>(
    null
  )

  const instantResize = () => {
    setTimeout(() => {
      gsap.set(inner.current, {
        height: Math.round(window.innerHeight),
      })
    }, 0)
  }

  const isSmooth = useIsSmooth()

  useAnimation(() => {
    if (outer.current && wrapper.current) {
      ScrollTrigger.create({
        trigger: outer.current,
        start: "top top",
        end: "bottom 110%",
        pin: wrapper.current,
        pinType: isSmooth ? "transform" : "fixed",
        anticipatePin: isSmooth ? undefined : 1,
        onRefresh: instantResize,
        onToggle: instantResize,
      })

      const newTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: outer.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          refreshPriority: 10 - 5.1,
        },
      })

      newTimeline.to(wrapper.current, { duration: 0 }, KEYFRAMES.DURATION) // calibrate timeline duration

      /* A transicao de saida (o zoom do Venn ate o tagline) ficava atras
         de um if (isSmooth), entao nao existia no celular, onde o
         ScrollSmoother e desligado de proposito. O Venn ja tinha um valor
         proprio de mobile no getMedia do deslocamento, sinal de que a
         animacao foi pensada para o celular e o gate veio depois. */
      const newAfterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: outer.current,
          start: "bottom 100%",
          end: "bottom -100%",
          scrub: true,
          refreshPriority: 10 - 5.2,
        },
      })
      setAfterTimeline(newAfterTimeline)
      setTimeline(newTimeline)
    }
  }, [isSmooth])

  useEffect(() => {
    if (timeline) {
      // because the timeline is not setup in the order its used,
      // we need to "flash" the timeline to make sure everything is in the right state
      const time = timeline.rawTime()
      timeline.pause(timeline.duration())
      timeline.pause(0)
      timeline.pause(time)
      timeline.scrollTrigger?.refresh()
    }
  }, [timeline])

  const inner = useRef<HTMLDivElement>(null)
  const resize = () => {
    gsap.to(inner.current, {
      height: Math.round(window.innerHeight),
      ease: "none",
    })
  }
  useEffect(() => {
    window.addEventListener("resize", resize)
    return () => {
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <Outer ref={outer}>
      <Wrapper ref={wrapper}>
        <Inner ref={inner}>
          <Venn timeline={timeline} afterTimeline={afterTimeline} />
          <Title>{t.skills.heading}</Title>
          <Description />
          <InviteWrapper>
            <ScrollInvite />
          </InviteWrapper>
        </Inner>
      </Wrapper>
    </Outer>
  )
}

/**
 * largest container, has all the pinning space
 */
const Outer = styled.div`
  height: calc(100vh + ${SCROLL_DURATION});
  padding-bottom: ${SCROLL_DURATION};
`

/**
 * middle container, fills the screen
 */
const Wrapper = styled.div`
  display: grid;
  place-items: center;
  z-index: 1;
  height: 100vh;
`

/**
 * actual content, centered
 */
const Inner = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;

  padding: 0 190px 0 75px;
  max-width: 1440px;
  grid-template-areas: "venn title" "venn desc";
  align-items: start;
  gap: 35px;
  height: 100vh;

  ${media.desktop} {
    padding: 0 13.194vw 0 5.208vw;
    gap: 2.431vw;
  }

  ${media.tablet} {
    width: 100%;
    grid-template-areas: "title" "venn" "invite" "desc";
    grid-template-rows: min-content auto min-content min-content;
    grid-template-columns: 1fr;
    gap: 0;
    padding: 12.891vw 4.883vw 6.836vw;
  }

  ${media.mobile} {
    grid-template-areas: "title" "venn" "desc";
    grid-template-rows: min-content auto min-content;
    grid-template-columns: 1fr;
    gap: 0;
    padding: 29.333vw 4vw 16vw;
    align-self: flex-start;
    @media (max-height: 800px) {
      padding-top: 18.667vw;
    }
  }
`

const Title = styled.h2`
  ${text.h5}
  grid-area: title;
  align-self: end;

  ${media.tablet} {
    width: 58.594vw;
  }
  ${media.mobile} {
    ${text.h6};
    width: 58vw;
  }
`

const InviteWrapper = styled.div`
  display: none;
  justify-self: center;

  ${media.tablet} {
    display: block;
    grid-area: invite;
    margin-top: 7.813vw;
    margin-bottom: 6.055vw;
  }
`
