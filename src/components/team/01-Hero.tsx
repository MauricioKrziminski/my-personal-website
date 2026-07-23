import React from "react"

import gsap, { ScrollSmoother } from "gsap/all"
import styled from "styled-components"

import ArrowLink from "components/ArrowLink"
import MainButton from "components/MainButton"
import OverlayImage from "components/OverlayImage"
import HeroImg from "images/team/Hero-team-main.webp"
import colors from "styles/colors"
import media from "styles/media"
import text from "styles/text"
import { useT } from "utils/i18n/useT"

export default function Hero() {
  const t = useT()
  const handleClick = () => {
    const scroller = ScrollSmoother.get()

    gsap.to(scroller, {
      scrollTop: window.innerHeight,
    })
  }

  return (
    <Wrapper>
      <Inner id="team-hero">
        <Content>
          <Title>{t.aboutPage.title}</Title>
          <Text>{t.aboutPage.description}</Text>
          <Actions>
            <MainButton darkBackground onClick={handleClick}>
              {t.aboutPage.heroCta}
            </MainButton>
            <a href="/Mauricio-Krziminski-CV.pdf" download>
              <ArrowLink>{t.intro.cvCta}</ArrowLink>
            </a>
          </Actions>
        </Content>
        <ImageWrapper>
          <OverlayImage type="halftone" src={HeroImg} alt={t.hero.alt} />
        </ImageWrapper>
      </Inner>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  /* no opaque background here: the <Section isDark> + wave canvas paint behind
     it, so the section-divider waves stay visible while scrolling */
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.mobile} {
    padding: 16vw 4vw 14.67vw;
  }
`

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  ${media.fullWidth} {
    width: 1075px;
    height: 481px;
  }

  ${media.desktop} {
    width: 74.65vw;
    height: 33.4vw;
  }

  ${media.tablet} {
    width: 89.75vw;
    height: 47.95vw;
  }

  ${media.mobile} {
    width: 100%;
    height: 100%;
    flex-direction: column;
    justify-content: center;
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;

  ${media.fullWidth} {
    width: 385px;
  }

  ${media.desktop} {
    width: 26.74vw;
  }

  ${media.tablet} {
    width: 40.92vw;
  }

  ${media.mobile} {
    position: relative;
    z-index: 2;
    order: 2;
    justify-content: flex-start;
    width: 92vw;
    margin-top: 5.333vw;
  }
`

const Actions = styled.div`
  display: flex;
  align-items: center;

  gap: 30px;
  ${media.desktop} {
    gap: 2.083vw;
  }
  ${media.tablet} {
    gap: 2.93vw;
  }
  ${media.mobile} {
    gap: 6.667vw;
    flex-wrap: wrap;
  }
`

const Title = styled.h1`
  ${text.h3}
  color: ${colors.mainWhite};

  ${media.fullWidth} {
    margin-bottom: 30px;
    transform: translateX(-15px);
  }

  ${media.desktop} {
    margin-bottom: 2.08vw;
    transform: translateX(-1.04vw);
  }

  ${media.tablet} {
    margin-bottom: 2.93vw;
    transform: translateX(-1.46vw);
  }

  ${media.mobile} {
    ${text.h5}
    margin-bottom: 1.23vh;
    width: 55.2vw;
    transform: translateX(-1.46vw);
  }
`

const Text = styled.p`
  ${text.bodyS}
  color: ${colors.mainWhite};

  ${media.fullWidth} {
    margin-bottom: 30px;
  }

  ${media.desktop} {
    margin-bottom: 2.08vw;
  }

  ${media.tablet} {
    ${text.bodyM}
    margin-bottom: 2.93vw;
  }

  ${media.mobile} {
    width: 100%;
    margin-bottom: 3.69vh;
  }
`

const ImageWrapper = styled.div`
  overflow: hidden;
  transform: translateZ(0);

  ${media.fullWidth} {
    width: 325px;
    height: 470px;
    filter: drop-shadow(1px 6px 30px rgba(0, 0, 0, 0.25));
    border-radius: 8px;
  }

  ${media.desktop} {
    width: 22.57vw;
    height: 32.64vw;
    filter: drop-shadow(0.07vw 0.42vw 2.08vw rgba(0, 0, 0, 0.25));
    border-radius: 0.56vw;
  }

  ${media.tablet} {
    width: 31.74vw;
    height: 46.39vw;
    filter: drop-shadow(0.1vw 0.59vw 2.93vw rgba(0, 0, 0, 0.25));
    border-radius: 0.78vw;
  }

  ${media.mobile} {
    width: 92vw;
    height: 40vh;
    filter: drop-shadow(0.27vw 1.6vw 8vw rgba(0, 0, 0, 0.25));
    border-radius: 2.13vw;

    img {
      object-fit: cover;
      object-position: bottom center;
    }
  }
`
