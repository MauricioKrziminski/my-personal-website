import React, { useState } from "react"

import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import styled from "styled-components"

import Pictures from "components/Pictures"
import { useIsSmooth } from "components/Scroll"
import ScrollInvite from "components/ScrollInvite"
import Office1 from "images/team/03-office/Office-1.webp"
import Office2 from "images/team/03-office/Office-2.webp"
import Office3 from "images/team/03-office/Office-3.webp"
import colors from "styles/colors"
import media from "styles/media"
import text from "styles/text"
import { useT } from "utils/i18n/useT"
import useAnimation from "utils/useAnimation"

const photos = [Office1.src, Office3.src, Office2.src]
const alts = ["a modern office space", "a workspace", "a desk setup"]

export default function Office() {
  const [wrapperEl, setWrapperEl] = useState<HTMLElement | null>(null)
  const [tl, setTl] = useState<GSAPTimeline | null>(null)

  const isSmooth = useIsSmooth()

  useAnimation(() => {
    if (wrapperEl) {
      ScrollTrigger.create({
        pin: wrapperEl.children,
        trigger: wrapperEl,
        start: "top top",
        end: "bottom bottom",
        pinType: isSmooth ? "transform" : "fixed",
      })

      const newTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperEl,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      })

      setTl(newTl)
    }
  }, [isSmooth, wrapperEl])

  const t = useT()

  return (
    <Wrapper id="team-office" ref={ref => setWrapperEl(ref)}>
      {/* <Blob background={colors.backgroundBlack} trigger={"#team-office"} /> */}

      <Inner>
        <Content>
          <Title>{t.aboutPage.officeName}</Title>
          <Line />
          <Text>{t.aboutPage.officeDescription}</Text>
        </Content>

        <InviteWrapper>
          <ScrollInvite />
        </InviteWrapper>

        <PicturesWrapper>
          <Pictures timeline={tl} photos={photos} alts={alts} />
        </PicturesWrapper>
      </Inner>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  position: relative;
  /* ${colors.backgroundBlack}; */
  height: 300vh;
  display: flex;
  align-items: start;
  justify-content: center;
  color: ${colors.mainWhite};
  z-index: 2;

  ${media.mobile} {
    padding-bottom: 26.667vw;
  }
`

const Inner = styled.div`
  /* overflow: hidden; */
  position: relative;
  width: 100%;
  height: 100vh;
  max-width: 1440px;
`

const Content = styled.div`
  position: absolute;
  z-index: 3;
  display: flex;
  flex-direction: column;
  top: 50%;
  transform: translateY(-50%);

  ${media.fullWidth} {
    width: 403px;
    left: 190px;
  }

  ${media.desktop} {
    width: 27.99vw;
    left: 13.19vw;
  }

  ${media.tablet} {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    transform: unset;
  }

  ${media.mobile} {
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    transform: unset;
  }
`

const Title = styled.h2`
  ${text.h4}
  color: ${colors.mainWhite};

  ${media.fullWidth} {
    margin-bottom: 30px;
  }

  ${media.desktop} {
    margin-bottom: 2.08vw;
  }

  ${media.tablet} {
    ${text.h3}
    position: absolute;
    top: 12.7vw;
    left: 4.88vw;
    width: 61.43vw;
  }

  ${media.mobile} {
    ${text.h5}
    position: absolute;
    top: 23vw;
    left: 4vw;
    width: 80.8vw;
  }
`

const Line = styled.div`
  position: absolute;
  background-color: ${colors.mainGreen};

  ${media.tablet} {
    height: 0.29vw;
    width: 4.88vw;
    left: 4.88vw;
    bottom: 18.55vw;
  }

  ${media.mobile} {
    height: 0.8vw;
    width: 13.33vw;
    left: 4vw;
    bottom: 21.67vh;
  }
`

const Text = styled.p`
  ${text.bodyS}
  color: ${colors.mainWhite};

  ${media.fullWidth} {
    width: 378px;
  }

  ${media.desktop} {
    width: 26.25vw;
  }

  ${media.tablet} {
    ${text.bodyM}
    position: absolute;
    bottom: 7.32vw;
    left: 4.88vw;
    width: 38.38vw;
  }

  ${media.mobile} {
    ${text.bodyS}
    position: absolute;
    bottom: 11vh;
    left: 4vw;
    width: 92vw;
  }
`

const InviteWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  ${media.fullWidth} {
    right: 725px;
  }

  ${media.desktop} {
    right: 50.35vw;
  }

  ${media.tablet} {
    left: 23.34vw;
  }

  ${media.mobile} {
    display: none;
  }
`

const PicturesWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  ${media.fullWidth} {
    right: 325px;
  }

  ${media.desktop} {
    right: 22.57vw;
  }

  ${media.tablet} {
    left: 50%;
    transform: translate(-50%, -50%);
  }

  ${media.mobile} {
    left: 4vw;
    height: 40vh;
  }
`
