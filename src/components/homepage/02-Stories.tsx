import React, { useEffect, useRef, useState } from "react"

import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import styled from "styled-components"

import Pictures from "components/Pictures"
import { useIsSmooth, usePinType } from "components/Scroll"
import Story1 from "images/homepage/stories/Story-01.webp"
import Story2 from "images/homepage/stories/Story-02.webp"
import Story3 from "images/homepage/stories/Story-03.webp"
import media from "styles/media"
import { useT } from "utils/i18n/useT"
import useAnimation from "utils/useAnimation"

import ScrollInvite from "../ScrollInvite"
import MainText from "./Stories/MainText"
import PortfolioInvite from "./Stories/PortfolioInvite"

const storyPhotos = [Story1, Story2, Story3]

const DURATION = "2000px"

export default function Stories() {
  const t = useT()
  const stories = [t.stories.one, t.stories.two, t.stories.three]
  const alts = [t.stories.altOne, t.stories.altTwo, t.stories.altThree]
  const wrapper = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const [photoTl, setPhotoTl] = useState<gsap.core.Timeline | null>(null)
  const [textTl, setTextTl] = useState<gsap.core.Timeline | null>(null)

  const instantResize = () => {
    setTimeout(() => {
      gsap.set(inner.current, {
        height: Math.round(window.innerHeight),
      })
    }, 0)
  }

  const pinType = usePinType()
  const isSmooth = useIsSmooth()

  const setupTimelines = () => {
    // create new timelines
    if (wrapper.current && inner.current) {
      ScrollTrigger.create({
        trigger: wrapper.current,
        start: "top top",
        end: "bottom bottom",
        pin: inner.current,
        pinType,
        anticipatePin: isSmooth ? undefined : 1,
        onRefresh: instantResize,
        onToggle: instantResize,
      })
      const newTextTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper.current,
          start: "top top",
          end: "bottom 110%",
          scrub: true,
          refreshPriority: 10 - 2.2,
        },
      })
      const newPhotoTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper.current,
          start: "top top",
          end: "bottom 110%",
          scrub: true,
          refreshPriority: 10 - 2.3,
        },
      })

      setTextTl(newTextTl)
      setPhotoTl(newPhotoTl)
    }
  }

  useAnimation(setupTimelines, [isSmooth, pinType])

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
    <Outer ref={wrapper}>
      <Wrapper ref={inner}>
        <InviteWrapper>
          <ScrollInvite />
        </InviteWrapper>
        <Inner>
          <PicturesWrapper>
            <Pictures
              photos={storyPhotos.map(p => p.src)}
              timeline={photoTl}
              alts={alts}
            />
          </PicturesWrapper>
          <MainText stories={stories} timeline={textTl} />
          <PortfolioInvite />
        </Inner>
      </Wrapper>
    </Outer>
  )
}

/**
 * The largest container, contains all the space used by the pinning
 */
const Outer = styled.div`
  height: calc(100vh + ${DURATION});
  padding-bottom: ${DURATION};
`

/**
 * second largest container, fills the entire screen
 */
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`

/**
 * smallest container, just contains the main content in the middle of the screen
 */

const InviteWrapper = styled.div`
  ${media.mobile} {
    display: none;
  }
`

const Inner = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(2, auto);

  ${media.mobile} {
    display: flex;
    flex-direction: column;
    place-items: unset;
    justify-content: space-between;
    width: 100vw;
    height: 100%;
    padding: 18.667vw 4vw 9.333vw;
  }
`

const PicturesWrapper = styled.div`
  transform: translateX(20px);

  ${media.desktop} {
    transform: translateX(1.389vw);
  }

  ${media.tablet} {
    transform: translateX(1.953vw);
  }

  ${media.mobile} {
    height: 100%;
    margin-top: 2.667vw;
  }
`
