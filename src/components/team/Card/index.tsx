import React, { useState, useContext } from "react"

import gsap from "gsap"
import styled, { css } from "styled-components"

import OverlayImage from "components/OverlayImage"
import { ScreenContext } from "components/Providers"
import colors from "styles/colors"
import media from "styles/media"
import text from "styles/text"
import { useT } from "utils/i18n/useT"
import useAnimation from "utils/useAnimation"

import Social from "./Social"

type Props = {
  member: Contentful.TeamMemberNode
}

export default function Card({ member }: Props) {
  const t = useT()
  const [wrapperEl, setWrapperEl] = useState<HTMLDivElement | null>(null)
  const [innerEl, setInnerEl] = useState<HTMLDivElement | null>(null)
  const [contentEl, setContentEl] = useState<HTMLDivElement | null>(null)

  const { mobile } = useContext(ScreenContext)

  useAnimation(() => {
    const duration = 0.5
    if (wrapperEl && innerEl && contentEl && !mobile) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperEl,
          start: "top 50%",
        },
      })

      tl.fromTo(wrapperEl, {
          opacity: 0.5,
          duration,
          ease: "power3",
        },
        {
          opacity: 1,
        }, 0)

      tl.from(innerEl, {
          scaleY: 0,
          duration,
          ease: "power3",
        }, 0)

      tl.fromTo(contentEl.children, {
          xPercent: -200,
          opacity: 1,
        },
        {
          duration,
          delay: duration * 0.75,
          xPercent: 0,
          ease: "power3.out",
          opacity: 1,
        }, 0)
    }
  }, [wrapperEl, innerEl, mobile, contentEl])

  return (
    <Wrapper ref={ref => setWrapperEl(ref)}>
      {member.headshot && (
        <ImgWrapper>
          <OverlayImage
            type="halftone"
            src={`https://${member.headshot?.file?.url ?? ""}?fm=webp&w=400`}
            alt={member.headshot?.description ?? "photo of team member"}
            width={member.headshot.file?.details?.image?.width ?? 0}
            height={member.headshot.file?.details?.image?.height ?? 0}
            loading="lazy"
          />
        </ImgWrapper>
      )}
      <Inner ref={ref => setInnerEl(ref)}>
        <Content ref={ref => setContentEl(ref)}>
          <Name>{member.name}</Name>
          <Title>{member.title}</Title>
          <Line />
          {!!member.description && (
            <Text>{member.description?.description}</Text>
          )}
          {!!member.linkedin && (
            <Social href={member.linkedin}>{t.common.viewMore}</Social>
          )}
        </Content>
      </Inner>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transform: translateZ(0);
  height: 100%;

  ${media.fullWidth} {
    filter: drop-shadow(1px 3px 20px rgba(0, 0, 0, 0.04));
    border-radius: 10px;
    min-height: 700px;
  }

  ${media.desktop} {
    filter: drop-shadow(0.07vw 0.21vw 1.39vw rgba(0, 0, 0, 0.04));
    border-radius: 0.69vw;
    min-height: 48.61vw;
  }

  ${media.tablet} {
    filter: drop-shadow(0.1vw 0.29vw 1.95vw rgba(0, 0, 0, 0.04));
    border-radius: 0.98vw;
    min-height: 75.68vw;
  }

  ${media.mobile} {
    filter: drop-shadow(0.27vw 0.8vw 5.33vw rgba(0, 0, 0, 0.04));
    border-radius: 2.67vw;
    min-height: 181.33vw;
  }
`

const ImgSize = css`
  ${media.fullWidth} {
    width: 385px;
    min-height: 300px;
  }

  ${media.desktop} {
    width: 26.74vw;
    min-height: 20.83vw;
  }

  ${media.tablet} {
    width: 37.6vw;
    min-height: 29.3vw;
  }

  ${media.mobile} {
    width: 92vw;
    min-height: 53.33vw;
  }
`

const ImgWrapper = styled.div`
  ${ImgSize}
  height: 100%;

  filter: grayscale(100%);

  img {
    /* align face */
    object-position: 0 20%;
  }
`

const Inner = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.mainWhite};
  transform-origin: top;

  ${media.fullWidth} {
    width: 385px;
    min-height: 400px;
  }

  ${media.desktop} {
    width: 26.74vw;
    min-height: 27.78vw;
  }

  ${media.tablet} {
    min-height: 46.39vw;
    width: 37.6vw;
  }

  ${media.mobile} {
    min-height: 128vw;
    width: 92vw;
  }
`

const Content = styled.div`
  display: grid;
  position: relative;

  // initial animation state
  > * {
    opacity: 0;
  }

  ${media.fullWidth} {
    width: 325px;
    min-height: 335px;
  }

  ${media.desktop} {
    width: 22.57vw;
    min-height: 23.26vw;
  }

  ${media.tablet} {
    width: 31.74vw;
    min-height: 40.63vw;
  }

  ${media.mobile} {
    width: 77.87vw;
    min-height: 114.13vw;
    > * {
      opacity: 1;
    }
  }

  margin-top: 20px;
  margin-bottom: 20px;
`

const Name = styled.h6`
  ${text.sub1}
  color: ${colors.mainBlack};

  ${media.fullWidth} {
    margin-bottom: 10px;
  }

  ${media.desktop} {
    margin-bottom: 0.69vw;
  }

  ${media.tablet} {
    margin-bottom: 0.98vw;
  }

  ${media.mobile} {
    margin-bottom: 2.67vw;
  }
`

const Title = styled.p`
  ${text.captionS}
  color: ${colors.white700};

  ${media.fullWidth} {
    margin-bottom: 25px;
  }

  ${media.desktop} {
    margin-bottom: 1.74vw;
  }

  ${media.tablet} {
    margin-bottom: 2.44vw;
  }

  ${media.mobile} {
    margin-bottom: 5.33vw;
  }
`

const Line = styled.div`
  background-color: ${colors.green500};

  ${media.fullWidth} {
    height: 3px;
    width: 50px;
    margin-bottom: 25px;
  }

  ${media.desktop} {
    height: 0.21vw;
    width: 3.47vw;
    margin-bottom: 1.74vw;
  }

  ${media.tablet} {
    height: 0.29vw;
    width: 4.88vw;
    margin-bottom: 2.44vw;
  }

  ${media.mobile} {
    height: 0.8vw;
    width: 13.33vw;
    margin-bottom: 5.33vw;
  }
`

const Text = styled.p`
  ${text.bodyXS}
  color: ${colors.mainBlack};
  overflow: hidden;

  ${media.fullWidth} {
    min-height: 180px;
  }

  ${media.desktop} {
    min-height: 12.5vw;
  }

  ${media.tablet} {
    ${text.bodyS}
    min-height: 23.73vw;
  }

  ${media.mobile} {
    ${text.bodyS}
    min-height: 70.67vw;
  }
`
