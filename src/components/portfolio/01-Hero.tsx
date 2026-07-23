import React, { useContext } from "react"

import ScrollTrigger from "gsap/ScrollTrigger"
import styled from "styled-components"

import MainButton from "components/MainButton"
import OverlayImage from "components/OverlayImage"
import { ScreenContext } from "components/Providers"
import { usePinType } from "components/Scroll"
import HeroImageJPG from "images/portfolio/hero.webp"
import colors from "styles/colors"
import media from "styles/media"
import text from "styles/text"
import { useT } from "utils/i18n/useT"
import useAnimation from "utils/useAnimation"

export default function Hero() {
  const t = useT()
  const { mobile, tablet } = useContext(ScreenContext)
  const handleClick = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  const pinType = usePinType()

  useAnimation(() => {
    if (!mobile && !tablet)
      ScrollTrigger.create({
        trigger: "#portfolio-hero",
        start: "top top",
        end: "bottom top",
        pin: true,
        pinType,
        pinSpacing: false,
      })
  }, [mobile, pinType, tablet])

  return (
    <Wrapper id="portfolio-hero">
      <Content>
        <Left>
          <OverlayImage type="halftone" src={HeroImageJPG} alt={t.hero.alt} />
        </Left>
        <Right>
          <Title>{t.projectsPage.title}</Title>
          <Text>{t.projectsPage.description}</Text>
          <MainButton darkBackground={false} onClick={handleClick}>
            {t.projectsPage.cta}
          </MainButton>
        </Right>
      </Content>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  ${colors.backgroundWhite};
  height: var(--hundred-vh);
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.mobile} {
    background: unset;
    padding: 16vw 4vw 14.667vw;
  }

  ${media.desktop} {
    margin-bottom: -100vh;
  }
  ${media.fullWidth} {
    margin-bottom: -100vh;
  }
`

const Content = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;

  ${media.fullWidth} {
    width: 954px;
    height: 491px;
  }

  ${media.desktop} {
    width: 66.25vw;
    height: 34.1vw;
  }

  ${media.tablet} {
    width: 90.23vw;
    height: 50.1vw;
  }

  ${media.mobile} {
    flex-direction: column;
    width: 100%;
    align-items: center;
    justify-content: center;
  }
`

const Left = styled.div`
  overflow: hidden;
  object-fit: cover;
  transform: translateZ(0);

  ${media.fullWidth} {
    filter: drop-shadow(1px 5px 20px rgba(0, 0, 0, 0.1));
    border-radius: 8px;
    width: 325px;
    height: 475px;
  }

  ${media.desktop} {
    filter: drop-shadow(0.07vw 0.35vw 1.39vw rgba(0, 0, 0, 0.1));
    border-radius: 0.56vw;
    width: 22.57vw;
    height: 32.99vw;
  }

  ${media.tablet} {
    order: 2;
    filter: drop-shadow(0.1vw 0.49vw 1.95vw rgba(0, 0, 0, 0.1));
    border-radius: 0.78vw;
    width: 31.74vw;
    height: 46.39vw;
  }

  ${media.mobile} {
    width: 92vw;
    height: 40vh;
    border-radius: 2.13vw;
  }
`

const Right = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-end;
  height: 100%;

  ${media.fullWidth} {
    width: 557px;
  }

  ${media.desktop} {
    width: 38.68vw;
  }

  ${media.tablet} {
    order: 1;
    width: 54.39vw;
  }

  ${media.mobile} {
    position: relative;
    justify-content: flex-start;
    width: 100%;
    margin-top: 5.333vw;
  }
`

const Title = styled.h1`
  ${text.h3}
  color: ${colors.mainBlack};

  ${media.fullWidth} {
    margin-bottom: 30px;
  }

  ${media.desktop} {
    margin-bottom: 2.08vw;
  }

  ${media.tablet} {
    margin-bottom: 2.93vw;
  }

  ${media.mobile} {
    ${text.h5}
    margin-bottom: 1.23vh;
  }
`

const Text = styled.p`
  ${text.bodyS}
  color: ${colors.mainBlack};

  ${media.fullWidth} {
    margin-bottom: 40px;
    width: 408px;
  }

  ${media.desktop} {
    margin-bottom: 2.78vw;
    width: 28.33vw;
  }

  ${media.tablet} {
    ${text.bodyM}
    margin-bottom: 2.93vw;
    width: 36.13vw;
  }

  ${media.mobile} {
    width: 100%;
    margin-bottom: 4.31vh;
  }
`
