import React, { useRef } from "react"

import gsap from "gsap"
import type { StaticImageData } from "next/image"
import styled from "styled-components"

import Marquee from "components/ConsistentMarquee"
import OverlayImage from "components/OverlayImage"
import media from "styles/media"
import text from "styles/text"
import useAnimation from "utils/useAnimation"

type MarqueeWrapperProps = {
  children: React.ReactNode[]
  images: StaticImageData[]
  alts: string[]
  atBottom?: boolean
}
export default function HomepageMarqueeUpper({
  children,
  images,
  atBottom = false,
  alts,
}: MarqueeWrapperProps) {
  const wrapper = useRef<HTMLDivElement>(null)

  useAnimation(() => {
    gsap.fromTo(wrapper.current, { x: 0 },
      {
        x: -1500,
        ease: "linear",
        scrollTrigger: {
          trigger: wrapper.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          refreshPriority: 10 - 7,
        },
      })
  }, [])

  return (
    <Wrapper ref={wrapper} extraPadding={atBottom ?? false}>
      <Marquee timing={60}>
        <Content>
          <Editorial>{children[0]}</Editorial>
          <ImageWrapper>
            <OverlayImage
              type="halftone"
              loading="lazy"
              src={images[0]}
              alt={alts[0]}
            />
          </ImageWrapper>
        </Content>
      </Marquee>
      <Marquee timing={40}>
        <Content>
          <ImageWrapper>
            <OverlayImage
              type="pixelated"
              loading="lazy"
              src={images[1]}
              alt={alts[1]}
            />
          </ImageWrapper>
          <Mondwest>{children[1]}</Mondwest>
        </Content>
      </Marquee>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ extraPadding: boolean }>`
  display: grid;

  padding-top: 120px;
  padding-bottom: 135px;
  gap: 45px;

  ${media.desktop} {
    padding-top: 8.333vw;
    padding-bottom: 9.375vw;
    gap: 3.125vw;
  }

  ${media.tablet} {
    padding-top: 11.719vw;
    padding-bottom: 13.184vw;
    gap: 4.395vw;
  }

  ${media.mobile} {
    padding: 14.13vw 0vw
      ${props => (props.extraPadding ? "26.667vw" : "14.13vw")};
    gap: 5.33vw;
  }
`

const Content = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
  margin-left: 50px;

  ${media.desktop} {
    gap: 3.472vw;
    margin-left: 3.472vw;
  }
  ${media.tablet} {
    gap: 4.883vw;
    margin-left: 4.883vw;
  }
  ${media.mobile} {
    gap: 5.333vw;
    margin-left: 5.333vw;
  }
`

const Editorial = styled.h2`
  ${text.d2Editorial}

  ${media.mobile} {
    ${text.d4Editorial}
  }
`

const ImageWrapper = styled.div`
  position: relative;
  transform: translateY(-8%);
  border-radius: 10px;
  height: 250px;
  width: 400px;
  overflow: hidden;
  display: grid;
  place-items: center;

  ${media.desktop} {
    border-radius: 0.694vw;
    height: 17.361vw;
    width: 27.778vw;
  }

  ${media.tablet} {
    border-radius: 0.977vw;
    height: 24.414vw;
    width: 39.063vw;
  }
  ${media.mobile} {
    border-radius: 2.667vw;
    height: 17.333vw;
    width: 42.667vw;
  }
`

const Mondwest = styled.h2`
  ${text.d2Mondwest}
  ${media.mobile} {
    ${text.d4Mondwest}
  }
`
