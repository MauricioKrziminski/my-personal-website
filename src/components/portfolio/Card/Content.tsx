import React, { useState, useEffect } from "react"

import gsap from "gsap"
import styled from "styled-components"

import colors from "styles/colors"
import media from "styles/media"
import text from "styles/text"
import useAnimation from "utils/useAnimation"
import useMedia from "utils/useMedia"

import Visit from "./Visit"

type Props = {
  company: Contentful.CompanyNode
  trigger: boolean
}

export default function Content({ company, trigger }: Props) {
  const [wrapperEl, setWrapperEl] = useState<HTMLDivElement | null>(null)
  const [nameEl, setNameEl] = useState<HTMLHeadingElement | null>(null)
  const [lineEl, setLineEl] = useState<HTMLDivElement | null>(null)
  const [textEl, setTextEl] = useState<HTMLParagraphElement | null>(null)
  const [visitEl, setVisitEl] = useState<HTMLAnchorElement | null>(null)
  const [techEl, setTechEl] = useState<HTMLDivElement | null>(null)
  const [timeline, setTimeline] = useState<GSAPTimeline | null>(null)

  const lineWidth = useMedia("60px", "4.17vw", "5.86vw", "16vw")

  useAnimation(() => {
    if (wrapperEl && nameEl && lineEl && textEl && visitEl) {
      const tl = gsap.timeline({
        paused: true,
      })

      tl.fromTo(wrapperEl, {
          display: "none",
        },
        {
          duration: 0,
          display: "flex",
        }, 0)

      tl.fromTo(lineEl, {
          width: "0%",
        },
        {
          duration: 0.5,
          width: lineWidth,
        }, 0)

      tl.fromTo([nameEl, visitEl, techEl].filter(Boolean), {
          opacity: 0,
        },
        {
          duration: 0.5,
          opacity: 1,
        }, 0)

      tl.fromTo(textEl, {
          y: "200%",
        },
        {
          y: 0,
          duration: 0.25,
        }, 0.25)

      setTimeline(tl)
    }
  }, [wrapperEl, nameEl, lineEl, textEl, visitEl, techEl, setTimeline, lineWidth])

  useEffect(() => {
    if (timeline) {
      if (trigger) {
        timeline.play()
      } else {
        timeline.reverse()
      }
    }
  }, [trigger, timeline])

  return (
    <Wrapper ref={(ref: HTMLDivElement) => setWrapperEl(ref)}>
      <Name ref={(ref: HTMLHeadingElement) => setNameEl(ref)}>
        {company.name}
      </Name>
      <Line ref={(ref: HTMLDivElement) => setLineEl(ref)} />
      {!!company.description?.description && (
        <TextWrapper>
          <Text ref={(ref: HTMLParagraphElement) => setTextEl(ref)}>
            {company.description.description}
          </Text>
        </TextWrapper>
      )}
      {!!company.tech?.length && (
        <TechRow ref={(ref: HTMLDivElement) => setTechEl(ref)}>
          {company.tech.map(tag => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TechRow>
      )}
      {!!company.url && (
        <Visit
          href={company.url}
          setRef={setVisitEl}
          color={colors.mainBlack}
        />
      )}
    </Wrapper>
  )
}

const TechRow = styled.div`
  display: flex;
  flex-wrap: wrap;

  ${media.fullWidth} {
    gap: 8px;
    margin-bottom: 24px;
  }
  ${media.desktop} {
    gap: 0.56vw;
    margin-bottom: 1.67vw;
  }
  ${media.tablet} {
    gap: 0.78vw;
    margin-bottom: 2.34vw;
  }
  ${media.mobile} {
    gap: 2.13vw;
    margin-bottom: 6vw;
  }
`

const Tag = styled.span`
  ${text.bodyXS}
  color: ${colors.mainBlack};
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 100px;
  white-space: nowrap;

  ${media.fullWidth} {
    padding: 4px 12px;
  }
  ${media.desktop} {
    padding: 0.28vw 0.83vw;
  }
  ${media.tablet} {
    padding: 0.39vw 1.17vw;
  }
  ${media.mobile} {
    padding: 1vw 3vw;
  }
`

const Wrapper = styled.div`
  display: none;
  flex-direction: column;
  align-items: flex-start;
  position: absolute;
  top: 50%;
  transform: translateY(-50%) translateZ(0);

  ${media.fullWidth} {
    padding: 20px;
    width: 404px;
    height: 267px;
    right: 135px;
  }

  ${media.desktop} {
    padding: 1.39vw;
    width: 28.06vw;
    height: 18.54vw;
    right: 9.38vw;
  }

  ${media.tablet} {
    padding: 1.95vw;
    width: 36.23vw;
    height: 29.79vw;
    right: 1.37vw;
  }

  ${media.mobile} {
    width: 100%;
    padding: 5.33vw;
  }
`

const Name = styled.h6`
  ${text.sub1}
  color: ${colors.mainBlack};

  ${media.fullWidth} {
    margin-bottom: 16px;
  }

  ${media.desktop} {
    margin-bottom: 1.11vw;
  }

  ${media.tablet} {
    margin-bottom: 2.93vw;
  }

  ${media.mobile} {
    margin-bottom: 8vw;
  }
`

const Line = styled.div`
  background: ${colors.green500};

  ${media.fullWidth} {
    height: 3px;
    width: 60px;
    margin-bottom: 18px;
  }

  ${media.desktop} {
    height: 0.21vw;
    width: 4.17vw;
    margin-bottom: 1.25vw;
  }

  ${media.tablet} {
    height: 0.29vw;
    width: 5.86vw;
    margin-bottom: 2.93vw;
  }

  ${media.mobile} {
    height: 0.8vw;
    width: 16vw;
    margin-bottom: 8vw;
  }
`

const TextWrapper = styled.div`
  overflow: hidden;
`

const Text = styled.p`
  position: relative;
  transform: translateY(110%) translateZ(0);
  ${text.bodyS}
  color: ${colors.mainBlack};
  text-align: left;

  ${media.fullWidth} {
    margin-bottom: 18px;
  }

  ${media.desktop} {
    margin-bottom: 1.25vw;
  }

  ${media.tablet} {
    margin-bottom: 2.93vw;
  }

  ${media.mobile} {
    margin-bottom: 8vw;
  }
`
