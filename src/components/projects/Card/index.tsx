/* eslint-disable no-console */
import React, {
  useEffect,
  useState,
  useCallback,
  MouseEventHandler,
} from "react"

import gsap from "gsap/all"
import styled from "styled-components"

import MovableBlob from "components/MovableBlob"
import CloseSVG from "images/global/close.svg"
import colors from "styles/colors"
import media from "styles/media"
import text from "styles/text"
import { zeroPad } from "utils/functions"
import getMedia from "utils/getMedia"
import useAnimation from "utils/useAnimation"
import useMedia from "utils/useMedia"

import Content from "./Content"
import Visit from "./Visit"

type Props = {
  company: Contentful.CompanyNode
  active: boolean
  setActive: (arg0: number | null) => void
  index: number
  setCenter: React.Dispatch<React.SetStateAction<number>>
}

export default function Card({
  company,
  active,
  setActive,
  index,
  setCenter,
}: Props) {
  const [hover, setHover] = useState<boolean>(false)
  const [contentTrigger, setContentTrigger] = useState<boolean>(false)
  const [wrapperEl, setWrapperEl] = useState<HTMLButtonElement | null>(null)
  const [timeline, setTimeline] = useState<GSAPTimeline | null>(null)
  const [logoEl, setLogoEl] = useState<HTMLImageElement | null>(null)
  const [numEl, setNumEl] = useState<HTMLDivElement | null>(null)
  const [closeEl, setCloseEl] = useState<SVGSVGElement | null>(null)
  const [visitWrapperEl, setVisitWrapperEl] = useState<HTMLDivElement | null>(
    null
  )

  const wrapperHeight = useMedia("500px", "34.72vw", "35.16vw", "86.67vw")
  const logoStyles = useCallback(
    () =>
      getMedia(
        {
          left: "55px",
          top: "140px",
          maxWidth: "440px",
          maxHeight: "220px",
        },
        {
          left: "3.82vw",
          top: "9.72vw",
          maxWidth: "30.56vw",
          maxHeight: "15.28vw",
        },
        {
          left: "3.91vw",
          top: "12.7vw",
          maxWidth: "31.25vw",
          maxHeight: "9.77vw",
        },
        {
          opacity: 0,
        }
      ),
    []
  )
  const numPos = useCallback(
    () =>
      getMedia(
        {
          bottom: "30px",
          left: "30px",
        },
        {
          bottom: "2.08vw",
          left: "2.08vw",
        },
        {
          bottom: "2.44vw",
          left: "2.44vw",
        },
        {
          bottom: "30px",
          left: "30px",
        }
      ),
    []
  )

  const handleClose: MouseEventHandler = e => {
    e.stopPropagation()

    setActive(null)
  }

  const handleClick = useCallback(() => {
    setActive(index)
    setCenter(index)
  }, [index, setActive, setCenter])

  const handleMouseEnter = useCallback(() => {
    if (!active) {
      setHover(true)
    }
  }, [active, setHover])

  const handleMouseLeave = useCallback(() => {
    setHover(false)
  }, [setHover])

  useAnimation(() => {
    if (wrapperEl && logoEl && closeEl && visitWrapperEl) {
      const tl = gsap.timeline({
        paused: true,
      })

      tl.fromTo(closeEl, {
          y: "-250%",
          rotate: -90,
        },
        {
          y: 0,
          rotate: 0,
          duration: 0.5,
        }, 0)

      tl.fromTo(visitWrapperEl, {
          opacity: 1,
        },
        {
          duration: 0.5,
          opacity: 0,
        }, 0)

      tl.to(wrapperEl, {
          duration: 0.5,
          height: wrapperHeight,
        }, 0)

      tl.to(logoEl, {
          duration: 0.5,
          transform: "unset",
          ...logoStyles(),
        }, 0)

      tl.to(numEl, {
          duration: 0.5,
          transform: "unset",
          ...numPos(),
        }, 0)

      setTimeline(tl)
    }
  }, [
    wrapperEl,
    logoEl,
    numEl,
    closeEl,
    visitWrapperEl,
    setTimeline,
    wrapperHeight,
    numPos,
    logoStyles,
  ])

  useEffect(() => {
    if (timeline) {
      if (active) {
        timeline.play()
        setContentTrigger(true)
      } else {
        timeline.reverse()
        setContentTrigger(false)
      }
    }
  }, [active, timeline, setContentTrigger])

  useEffect(() => {
    if (active) {
      setHover(false)
    }
  }, [active, setHover])

  return (
    <Wrapper
      ref={ref => setWrapperEl(ref)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      active={active}
      onClick={handleClick}
      id={`project-card-${index}`}
    >
      <BlobHolder>
        <MovableBlob isFilled={active} drawPath={hover} isStaticAnimation />
      </BlobHolder>

      <InnerWrapper active={active}>
        <Num ref={(ref: HTMLDivElement) => setNumEl(ref)}>
          {zeroPad(index + 1)}
        </Num>

        {(company.image || company.logo) && (
          <Logo
            $isImage={!!company.image}
            ref={(ref: HTMLImageElement) => setLogoEl(ref)}
            src={
              company.image ??
              `https://${company.logo?.file?.url ?? ""}?fm=webp&w=500`
            }
            alt={
              company.image
                ? `${company.name ?? "project"} preview`
                : company.logo?.description ?? "company logo"
            }
            loading="lazy"
          />
        )}
        <Plus />
        <Close
          ref={(ref: SVGSVGElement) => setCloseEl(ref)}
          onClick={handleClose}
        />

        <Content company={company} trigger={contentTrigger} />

        {!!company.url && (
          <VisitWrapper ref={(ref: HTMLDivElement) => setVisitWrapperEl(ref)}>
            <Visit href={company.url} color={colors.mainWhite} />
          </VisitWrapper>
        )}
      </InnerWrapper>
    </Wrapper>
  )
}

const BlobHolder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
`

const Num = styled.div`
  position: absolute;
  z-index: 1;
  color: ${colors.black200};
  ${text.sub3};
  bottom: 50%;
  transform: translate(0, 50%) translateZ(0);

  ${media.fullWidth} {
    left: 20px;
  }

  ${media.desktop} {
    left: 1.39vw;
  }

  ${media.tablet} {
    left: 2.44vw;
  }

  ${media.mobile} {
    display: none;
  }
`

const Logo = styled.img<{ $isImage: boolean }>`
  position: absolute;
  z-index: 1;
  left: 50%;
  top: 50%;
  height: 100%;
  width: 100%;
  object-fit: contain;
  transform: translate(-50%, -50%) translateZ(0);
  filter: ${props => (props.$isImage ? "drop-shadow(0 10px 24px rgba(0,0,0,0.35))" : `grayscale(1) saturate(100%) invert(27%) sepia(7%) saturate(1067%)
    hue-rotate(80deg) brightness(102%) contrast(83%)`)};

  ${media.fullWidth} {
    max-width: ${props => (props.$isImage ? "470px" : "320px")};
    max-height: ${props => (props.$isImage ? "168px" : "100px")};
  }

  ${media.desktop} {
    max-width: ${props => (props.$isImage ? "32.64vw" : "22.22vw")};
    max-height: ${props => (props.$isImage ? "11.67vw" : "6.94vw")};
  }

  ${media.tablet} {
    max-width: ${props => (props.$isImage ? "62vw" : "31.25vw")};
    max-height: ${props => (props.$isImage ? "16vw" : "9.77vw")};
  }

  ${media.mobile} {
    left: 4vw;
    transform: translate(0%, -50%) translateZ(0);
    max-width: ${props => (props.$isImage ? "82vw" : "46.67vw")};
    max-height: ${props => (props.$isImage ? "20vw" : "13.33vw")};
  }
`

/**
 * Minimalist "+" affordance in the top-right of the collapsed card, signalling
 * it expands. Fades out as the close "×" fades in on activation; brightens to
 * accent + grows on hover to reinforce that the whole card is clickable.
 */
const Plus = styled.div`
  position: absolute;
  z-index: 4;
  pointer-events: none;
  color: rgba(255, 255, 255, 0.5);
  transition: color 0.3s, transform 0.3s, opacity 0.3s;

  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    background: currentColor;
  }
  &::before {
    width: 100%;
    height: 2px;
    transform: translate(-50%, -50%);
  }
  &::after {
    width: 2px;
    height: 100%;
    transform: translate(-50%, -50%);
  }

  ${media.fullWidth} {
    top: 22px;
    right: 22px;
    width: 16px;
    height: 16px;
  }
  ${media.desktop} {
    top: 1.53vw;
    right: 1.53vw;
    width: 1.11vw;
    height: 1.11vw;
  }
  ${media.tablet} {
    top: 2.44vw;
    right: 2.44vw;
    width: 1.76vw;
    height: 1.76vw;
  }
  ${media.mobile} {
    display: none;
  }
`

const Wrapper = styled.button<{ active: boolean }>`
  cursor: ${props => (props.active ? "default" : "pointer")};
  width: 100%;
  position: relative;
  transform: translateZ(0);

  ${Num} {
    color: ${props => props.active && colors.black400};
  }

  ${Logo} {
    filter: ${props => props.active && "none"};
  }

  ${Plus} {
    opacity: ${props => (props.active ? 0 : 1)};
  }

  &:hover ${Plus} {
    color: ${colors.accent500};
    transform: scale(1.2);
  }

  ${BlobHolder} {
    pointer-events: none;
  }

  ${media.fullWidth} {
    border-radius: 10px;
    height: 200px;
  }

  ${media.desktop} {
    border-radius: 0.69vw;
    height: 13.89vw;
  }

  ${media.tablet} {
    border-radius: 0.98vw;
    height: 19.53vw;
  }

  ${media.mobile} {
    border-radius: 2.67vw;
    height: 24vw;
  }
`

const InnerWrapper = styled.div<{ active: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  z-index: 1;
  overflow: hidden;
`

const Close = styled(CloseSVG)`
  height: auto;
  position: absolute;
  cursor: pointer;
  z-index: 5;

  ${media.fullWidth} {
    width: 18px;
    top: 20px;
    right: 20px;
  }

  ${media.desktop} {
    width: 1.25vw;
    top: 1.39vw;
    right: 1.39vw;
  }

  ${media.tablet} {
    width: 1.76vw;
    top: 2.44vw;
    right: 2.44vw;
  }

  ${media.mobile} {
    width: 4.8vw;
    top: 5.33vw;
    right: 5.33vw;
  }
`

const VisitWrapper = styled.div`
  position: absolute;
  z-index: 5;
  top: 50%;
  transform: translate3d(0, -50%, 0);

  a {
    color: ${colors.mainWhite};
  }

  a:nth-of-type(1) {
    position: absolute;
    top: 50%;
    transform: translate(0%, -50%) translateZ(0);
    transition: opacity 0.25s;
  }

  ${media.fullWidth} {
    right: 30px;
    width: 130px;
    height: 16px;
  }

  ${media.desktop} {
    right: 2.08vw;
    width: 9vw;
    height: 1.11vw;
  }

  ${media.tablet} {
    right: 1.46vw;
    width: 13vw;
    height: 2.93vw;
  }

  ${media.mobile} {
    right: 4vw;
    width: 22vw;
    height: 8vw;
  }
`
