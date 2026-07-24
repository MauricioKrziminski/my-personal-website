import React, { useRef } from "react"

import gsap from "gsap"
import styled from "styled-components"

import OverlayImage from "components/OverlayImage"
import CryptoOne from "images/homepage/hero/Hero-CRYPTO-01.webp"
import CryptoTwo from "images/homepage/hero/Hero-CRYPTO-02.webp"
import CryptoThree from "images/homepage/hero/Hero-CRYPTO-03.webp"
import CryptoFour from "images/homepage/hero/Hero-CRYPTO-04.webp"
import NYSEOne from "images/homepage/hero/Hero-NYSE-01.webp"
import NYSETwo from "images/homepage/hero/Hero-NYSE-02.webp"
import NYSEThree from "images/homepage/hero/Hero-NYSE-03.webp"
import NYSEFour from "images/homepage/hero/Hero-NYSE-04.webp"
import media from "styles/media"
import text from "styles/text"
import { useT } from "utils/i18n/useT"
import useAnimation from "utils/useAnimation"

const TIME = 3
const DURATION = 1
const STAGGER = 0.25

export default function Hero() {
  const wrapper = useRef<HTMLDivElement>(null)
  const t = useT()

  useAnimation(() => {
    if (wrapper.current) {
      const images = wrapper.current.querySelectorAll(".animate")

      gsap
        .timeline({ repeat: -1 })
        .fromTo(images, { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)" },
          {
            clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)",
            duration: DURATION,
            stagger: STAGGER,
            ease: "power2.inOut",
          }, TIME)

        // cant be a fromTo because that screwed up the beginning
        .set(
          images,
          {
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          },
          (TIME + DURATION) * 2
        )
        .to(images, {
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            duration: DURATION,
            stagger: STAGGER,
            ease: "power2.inOut",
          }, (TIME + DURATION) * 2)
    }
  }, [])

  return (
    <Outer>
      <Wrapper ref={wrapper}>
        <Text area="adv">{t.hero.line1}</Text>
        <Image area="im1">
          <ImgContainer>
            <OverlayImage
              type="pixelated"
              src={CryptoOne}
              alt={t.hero.alt}
            />
            <OverlayImage
              className="animate"
              type="halftone"
              src={NYSEOne}
              alt={t.hero.alt}
            />
          </ImgContainer>
        </Image>
        <Text area="eco">{t.hero.line2}</Text>
        <Image area="im2">
          <ImgContainer>
            <OverlayImage
              type="pixelated"
              src={CryptoTwo}
              alt={t.hero.alt}
            />
            <OverlayImage
              className="animate"
              type="halftone"
              src={NYSETwo}
              alt={t.hero.alt}
            />
          </ImgContainer>
        </Image>
        <Text area="net">{t.hero.line3}</Text>
        <Image area="im3">
          <ImgContainer>
            <OverlayImage
              type="pixelated"
              src={CryptoThree}
              alt={t.hero.alt}
            />
            <OverlayImage
              className="animate"
              type="halftone"
              src={NYSEThree}
              alt={t.hero.alt}
            />
          </ImgContainer>
        </Image>
        <Text area="fut">{t.hero.line4}</Text>
        <Image area="im4">
          <ImgContainer>
            <OverlayImage
              type="pixelated"
              src={CryptoFour}
              alt={t.hero.alt}
            />
            <OverlayImage
              className="animate"
              type="halftone"
              src={NYSEFour}
              alt={t.hero.alt}
            />
          </ImgContainer>
        </Image>
      </Wrapper>
    </Outer>
  )
}

const Outer = styled.div`
  display: grid;
  place-items: center;
  min-height: 100vh;
`

const Wrapper = styled.div`
  display: grid;
  margin: 0 auto;
  grid-template-columns: repeat(4, 1fr);

  padding: 100px 0 60px;
  /* size to the actual content (the nowrap headline can be wider than the
     original) so place-items:center on Outer keeps it truly centered instead
     of overflowing to the right of a fixed 1060px box */
  width: max-content;
  grid-template-columns: 135px 220px auto 53px 249px;
  grid-gap: 0 20px;
  grid-template-areas:
    "adv adv adv im1 im1"
    "im2 eco eco eco eco"
    "net net net net im3"
    "im4 im4 fut fut fut";
  ${media.desktop} {
    padding: 6.944vw 0 4.167vw;
    width: max-content;
    grid-template-columns: 9.375vw 15.278vw auto 3.681vw 17.292vw;
    grid-gap: 0 1.389vw;
  }
  ${media.tablet} {
    grid-template-areas: "adv" "im1" "eco" "im2" "net" "im3" "fut" "im4";
    grid-template-columns: 1fr;
    width: 90.234vw;
  }
  ${media.mobile} {
    grid-template-areas: "adv" "im1" "eco" "im2" "net" "im3" "fut" "im4";
    grid-template-columns: 1fr;
    width: calc(100vw - 5.333vw);
  }
`

const Text = styled.h1<{ area: string }>`
  grid-area: ${props => props.area};
  ${text.h3};
  /* hug the image that sits next to each line instead of centering in the
     (wider) cell — adv/net have their image on the right, eco/fut on the left */
  text-align: ${({ area }) =>
    area === "adv" || area === "net" ? "right" : "left"};
  white-space: nowrap;

  ${media.tablet} {
    font-size: 12.7vw;
    text-align: center;
  }

  ${media.mobile} {
    ${text.m1};
    /* the personal headline lines ("Software Robusto", "e Experiências") are
       longer than the original firm's single words: drop the nowrap so a line
       can wrap instead of overflowing off-screen */
    white-space: normal;
    text-align: center;
  }
  /* separate block so this font-size wins over text.m1's hoisted mobile size;
     shrink a touch so a whole phrase fits the column width without clipping */
  ${media.mobile} {
    font-size: 12.8vw;
  }
`

const Image = styled.div<{ area: string }>`
  grid-area: ${props => props.area};
  width: 100%;
  overflow: hidden;
  position: relative;

  margin: 10px 0;
  border-radius: 8px;
  ${media.desktop} {
    margin: 0.694vw 0;
    border-radius: 0.556vw;
  }
  ${media.tablet} {
    border-radius: 0.781vw;
    height: 13.184vw;
  }
  ${media.mobile} {
    border-radius: 2.133vw;
    height: 24vw;
  }
`

const ImgContainer = styled.div`
  position: absolute;
  min-height: 100%;
  min-width: 100%;
  & > div {
    position: absolute;
    top: 0;
    left: 0;
  }
`
