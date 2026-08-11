import React, {
  useEffect,
  useState,
  useContext,
  useCallback,
  useRef,
  ReactNode,
} from "react"

import gsap from "gsap/all"
import styled, { keyframes } from "styled-components"

import Marquee from "components/ConsistentMarquee"
import { ScreenContext } from "components/Providers"
import colors from "styles/colors"
import media from "styles/media"
import text from "styles/text"
import loader from "utils/Loader"
import {
  registerLoaderCallback,
  unregisterLoaderCallback,
} from "utils/Loader/LoaderUtils"
import {
  registerTransition,
  unregisterTransition,
} from "utils/Loader/TransitionUtils"
import useInnerVh from "utils/useInnerVh"
import { useT } from "utils/i18n/useT"

import Spinner from "./Spinner"

type Props = {
  children: ReactNode
}

export default function Transition({ children }: Props) {
  const { mobile } = useContext(ScreenContext)
  const t = useT()

  const [initialLoad, setInitialLoad] = useState(true)
  const percentEl = useRef<HTMLDivElement>(null)
  const [showContent, setShowContent] = useState(false)
  const percentInterval = useRef<NodeJS.Timer>()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const spinnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (initialLoad) window.scrollTo(0, 0)
  }, [initialLoad])

  useEffect(() => {
    const enter = () => {
      if (wrapperRef.current) wrapperRef.current.style.display = "grid"

      const enterTimeline = gsap.timeline({
        onComplete: () => {
          if (spinnerRef.current) spinnerRef.current.style.opacity = "1"
        },
      })

      if (!mobile) {
        enterTimeline.fromTo(wrapperRef.current, {
            duration: 1,
            xPercent: -100,
            clipPath: () =>
              // clip path when closed
              `path('` +
              `M${window.innerWidth * 0.65}, 0 ` +
              // top half of wave
              `C${window.innerWidth * 0.65}, ${window.innerHeight * 0.35} ` +
              `${window.innerWidth}, ${window.innerHeight * 0.35} ` +
              `${window.innerWidth}, ${window.innerHeight * 0.5} ` +
              // bottom half of wave
              `C${window.innerWidth}, ${window.innerHeight * 0.65} ` +
              `${window.innerWidth * 0.65}, ${window.innerHeight * 0.65} ` +
              `${window.innerWidth * 0.65}, ${window.innerHeight} ` +
              // rest of the box
              `L0, ${window.innerHeight} ` +
              `0, 0 ` +
              `Z')`,
          },
          {
            duration: 1,
            xPercent: 0,
            ease: "power3.out",
            clipPath: () =>
              // clip path when open
              `path('` +
              `M${window.innerWidth}, 0 ` +
              // top half of wave
              `C${window.innerWidth}, ${window.innerHeight * 0.35} ` +
              `${window.innerWidth}, ${window.innerHeight * 0.35} ` +
              `${window.innerWidth}, ${window.innerHeight * 0.5} ` +
              // bottom half of wave
              `C${window.innerWidth}, ${window.innerHeight * 0.65} ` +
              `${window.innerWidth}, ${window.innerHeight * 0.65} ` +
              `${window.innerWidth}, ${window.innerHeight} ` +
              // rest of the box
              `L0, ${window.innerHeight} ` +
              `0, 0 ` +
              `Z')`,
          })
      } else {
        enterTimeline.fromTo(wrapperRef.current, {
            top: "-100%",
            clipPath: () =>
              `path('` +
              `M0, ${window.innerHeight * 0.5} ` +
              `C${window.innerWidth * 0.35}, ${window.innerHeight * 0.5} ` +
              `${window.innerWidth * 0.35}, ${window.innerHeight} ` +
              `${window.innerWidth * 0.5}, ${window.innerHeight} ` +
              `C${window.innerWidth * 0.65}, ${window.innerHeight} ` +
              `${window.innerWidth * 0.65}, ${window.innerHeight * 0.5} ` +
              `${window.innerWidth}, ${window.innerHeight * 0.5} ` +
              `L${window.innerWidth}, 0 ` +
              `0, 0 ` +
              `Z')`,
          },
          {
            duration: 1,
            ease: "power3.out",
            immediateRender: false,
            top: "0%",
            clipPath: () =>
              `path('` +
              `M0, ${window.innerHeight} ` +
              `C${window.innerWidth * 0.35}, ${window.innerHeight} ` +
              `${window.innerWidth * 0.35}, ${window.innerHeight} ` +
              `${window.innerWidth * 0.5}, ${window.innerHeight} ` +
              `C${window.innerWidth * 0.65}, ${window.innerHeight} ` +
              `${window.innerWidth * 0.65}, ${window.innerHeight} ` +
              `${window.innerWidth}, ${window.innerHeight} ` +
              `L${window.innerWidth}, 0 ` +
              `0, 0 ` +
              `Z')`,
          })
      }
    }

    const exit = () => {
      setShowContent(true)
      const exitTimeline = gsap.timeline({
        onStart: () => {
          if (spinnerRef.current) spinnerRef.current.style.opacity = "0"
        },
        onComplete: () => {
          setInitialLoad(false)
          if (wrapperRef.current) wrapperRef.current.style.display = "none"
        },
      })

      if (!mobile) {
        exitTimeline.fromTo(wrapperRef.current, {
            xPercent: 0,
            clipPath: () =>
              // clip path when open (but mirrored from enter)
              `path('` +
              `M0, 0 ` +
              // top half of wave
              `C0, ${window.innerHeight * 0.35} ` +
              `0, ${window.innerHeight * 0.35} ` +
              `0, ${window.innerHeight * 0.5} ` +
              // bottom half of wave
              `C0, ${window.innerHeight * 0.65} ` +
              `0, ${window.innerHeight * 0.65} ` +
              `0, ${window.innerHeight} ` +
              // rest of the box
              `L${window.innerWidth}, ${window.innerHeight} ` +
              `${window.innerWidth}, 0 ` +
              `Z')`,
          },
          {
            xPercent: 100,
            duration: 1,
            top: "0%",
            ease: "power3.in",
            clipPath: () =>
              // clip path when closed (mirrored from enter)
              `path('` +
              `M${window.innerWidth * 0.35}, 0 ` +
              // top half of wave
              `C${window.innerWidth * 0.35}, ${window.innerHeight * 0.35} ` +
              `0, ${window.innerHeight * 0.35} ` +
              `0, ${window.innerHeight * 0.5} ` +
              // bottom half of wave
              `C0, ${window.innerHeight * 0.65} ` +
              `${window.innerWidth * 0.35}, ${window.innerHeight * 0.65} ` +
              `${window.innerWidth * 0.35}, ${window.innerHeight} ` +
              // rest of the box
              `L${window.innerWidth}, ${window.innerHeight} ` +
              `${window.innerWidth}, 0 ` +
              `Z')`,
          })
      } else {
        exitTimeline.fromTo(wrapperRef.current, {
            top: "0%",
            clipPath: () =>
              // clip path when open (mirrored from enter)
              `path('` +
              `M0, 0 ` +
              `C${window.innerWidth * 0.35}, 0 ` +
              `${window.innerWidth * 0.35}, 0 ` +
              `${window.innerWidth * 0.5}, 0 ` +
              `C${window.innerWidth * 0.65}, 0 ` +
              `${window.innerWidth * 0.65}, 0 ` +
              `${window.innerWidth}, 0 ` +
              `L${window.innerWidth}, ${window.innerHeight} ` +
              `0, ${window.innerHeight} ` +
              `Z')`,
          },
          {
            ease: "power3.in",
            top: "100%",
            duration: 1,
            xPercent: 0,
            clipPath: () =>
              // clip path when closed (mirrored from enter)
              `path('` +
              `M0, ${window.innerHeight * 0.5} ` +
              `C${window.innerWidth * 0.35}, ${window.innerHeight * 0.5} ` +
              `${window.innerWidth * 0.35}, 0 ` +
              `${window.innerWidth * 0.5}, 0 ` +
              `C${window.innerWidth * 0.65}, 0 ` +
              `${window.innerWidth * 0.65}, ${window.innerHeight * 0.5} ` +
              `${window.innerWidth}, ${window.innerHeight * 0.5} ` +
              `L${window.innerWidth}, ${window.innerHeight} ` +
              `0, ${window.innerHeight} ` +
              `Z')`,
          })
      }
    }

    const exitWithDelay = () => {
      gsap.delayedCall(0.5, exit)
    }

    registerLoaderCallback({
      callback: exit,
      duration: 1,
    })
    registerTransition("generic", {
      in: enter,
      out: exitWithDelay,
      inDuration: 1,
      outDuration: 2,
    })

    return () => {
      unregisterLoaderCallback(exit)
      unregisterTransition("generic", [enter, exit])
    }
  }, [mobile])

  const animatePercent = useCallback((percent: number) => {
    if (percent === 100) clearInterval(percentInterval.current)

    const tl = gsap.timeline()

    if (percentEl.current) {
      tl.to(percentEl.current, {
        text: {
          value: "",
        },
        duration: 0.25,
      })

      tl.to(percentEl.current, {
        text: {
          value: `${percent}%`,
        },
        duration: 0.25,
      })
    }
  }, [])

  useEffect(() => {
    let canSendProgress = true
    let timeout: NodeJS.Timeout | undefined
    let largestPercent = 0

    const updateProgress = (e: CustomEvent<number>) => {
      largestPercent = Math.max(largestPercent, Math.round(e.detail))
      if (canSendProgress) {
        animatePercent(largestPercent)
        canSendProgress = false
        setTimeout(() => {
          canSendProgress = true
        }, 500)
      } else {
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
          updateProgress(e)
        }, 500)
      }
    }

    loader.addEventListener("progressUpdated", updateProgress)

    return () => {
      loader.removeEventListener("progressUpdated", updateProgress)
    }
  }, [animatePercent])

  const marqueeHeight = useInnerVh(6.15)

  return (
    <>
      <Wrapper ref={wrapperRef}>
        {initialLoad ? (
          <>
            <Percent>
              <P ref={percentEl}>0%</P>
              <Line />
            </Percent>
            <MarqueeWrapper size={marqueeHeight}>
              <Marquee>
                <Row>
                  <p>{t.common.loading}</p>
                  <p>{t.common.loading}</p>
                </Row>
              </Marquee>
            </MarqueeWrapper>
          </>
        ) : (
          <SpinWrap ref={spinnerRef}>
            <Spinner />
          </SpinWrap>
        )}
      </Wrapper>
      <Content show={showContent}>{children}</Content>
    </>
  )
}

const Wrapper = styled.div`
  position: fixed;
  z-index: 11;
  top: 0;
  left: 0;
  ${colors.backgroundBlack};
  width: 100vw;
  height: 100vh;
  display: grid;
  place-items: center;
`

const Percent = styled.div`
  display: flex;
  align-items: flex-end;

  ${media.fullWidth} {
    height: 155px;
  }

  ${media.desktop} {
    height: 10.76vw;
  }

  ${media.tablet} {
    height: 15.82vw;
  }

  ${media.mobile} {
    height: 25.6vw;
  }
`

const P = styled.div`
  ${text.h3}
  color: ${colors.mainWhite};
  text-align: right;

  ${media.mobile} {
    ${text.h4}
  }
`

const blinks = keyframes`
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`

const Line = styled.div`
  background-color: ${colors.mainAccent};
  animation: ${blinks} 0.5s steps(1) infinite;

  ${media.fullWidth} {
    height: 12px;
    width: 75px;
  }

  ${media.desktop} {
    height: 0.83vw;
    width: 5.21vw;
  }

  ${media.tablet} {
    width: 7.32vw;
    height: 1.17vw;
  }

  ${media.mobile} {
    width: 16.8vw;
    height: 2.67vw;
  }
`

const MarqueeWrapper = styled.div<{ size: string }>`
  position: absolute;
  overflow: hidden;
  color: ${colors.black700};
  display: flex;
  align-items: center;

  ${media.fullWidth} {
    height: 80px;
    width: 410px;
    right: 30px;
    bottom: 30px;
  }

  ${media.desktop} {
    height: 5.56vw;
    width: 28.47vw;
    right: 2.08vw;
    bottom: 2.08vw;
  }

  ${media.tablet} {
    height: 7.81vw;
    bottom: 5.859vw;
    width: calc(100% - 7.81vw);
    right: 3.91vw;
  }

  ${media.mobile} {
    bottom: ${({ size }) => size};
    width: calc(100% - 10.67vw);
    right: 5.33vw;
    height: 21vw;
  }
`

const Row = styled.div`
  display: flex;
  align-items: center;

  p:nth-of-type(1) {
    ${text.d4Serif}
  }

  p:nth-of-type(2) {
    ${text.d4Pixel}
  }

  p {
    ${media.fullWidth} {
      margin-right: 30px;
    }

    ${media.desktop} {
      margin-right: 2.08vw;
    }

    ${media.tablet} {
      margin-right: 2.93vw;
    }

    ${media.mobile} {
      margin-right: 8vw;
    }
  }
`

const SpinWrap = styled.div`
  opacity: 0;
  transition: opacity 0.5s ease-in-out;
`

const Content = styled.div<{ show: boolean }>`
  opacity: ${props => (props.show ? 1 : 0)};
`
