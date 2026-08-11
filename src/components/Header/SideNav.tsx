import React, { useEffect, useRef, useState, useContext } from "react"

import gsap from "gsap"
import styled from "styled-components"

import GetInTouch from "components/GetInTouch"
import { ScreenContext } from "components/Providers"
import Socials from "components/Socials"
import Spinner from "components/Spinner"
import colors from "styles/colors"
import easing from "styles/easing"
import media from "styles/media"
import {
  registerTransition,
  unregisterTransition,
} from "utils/Loader/TransitionUtils"
import useAnimation from "utils/useAnimation"

import NavigationItems from "./NavigationItems"
import Noise from "./Noise"

type SideNavProps = {
  navOnScreen: boolean
  setNavIsOpen: (value: boolean) => void
}

export default function SideNav({ navOnScreen, setNavIsOpen }: SideNavProps) {
  const sidebar = useRef<HTMLDivElement>(null)
  const wrapper = useRef<HTMLDivElement>(null)
  const background = useRef<HTMLButtonElement>(null)
  const links = useRef<HTMLDivElement>(null)

  const [openTimeline, setOpenTimeline] = useState<GSAPTimeline | null>(null)
  const [displaySpinner, setDisplaySpinner] = useState(false)
  const [doingPageTransition, setDoingPageTransition] = useState(false)

  const { mobile } = useContext(ScreenContext)
  const [refreshSignal, setRefreshSignal] = useState(1)
  const navOpenProgress = useRef(0)
  const navOpenIsPaused = useRef(true)
  const navOpenDirection = useRef(1)

  // setting up the timeline that's used to open and close the side nav from the menu button
  useAnimation(() => {
    if (!refreshSignal) return
    const navOpenTimeline = gsap.timeline({
      ease: easing.gsapTransition,
      paused: true,
      onStart: () => {
        if (wrapper.current) {
          wrapper.current.style.pointerEvents = "auto"
          wrapper.current.style.opacity = "1"
        }
      },
      onReverseComplete: () => {
        if (wrapper.current) {
          wrapper.current.style.pointerEvents = "none"
          wrapper.current.style.opacity = "0"
        }
      },
      onComplete: () => {
        if (sidebar.current) sidebar.current.style.removeProperty("width")
      },
    })

    const sidebarWidth = sidebar.current?.getBoundingClientRect().width
    if (!sidebarWidth) return
    const sidebarHeight = window.innerHeight

    navOpenTimeline.set(
      wrapper.current,
      {
        display: "flex",
      },
      0
    )

    if (!mobile) {
      navOpenTimeline.fromTo(sidebar.current, {
          duration: 1,
          left: "-100%",
          clipPath: () =>
            // clip path when closed
            `path('` +
            `M${sidebarWidth}, 0 ` +
            // top half of wave
            `C${sidebarWidth}, ${sidebarHeight * 0.35} ` +
            `${window.innerWidth}, ${sidebarHeight * 0.35} ` +
            `${window.innerWidth}, ${sidebarHeight * 0.5} ` +
            // bottom half of wave
            `C${window.innerWidth}, ${sidebarHeight * 0.65} ` +
            `${sidebarWidth}, ${sidebarHeight * 0.65} ` +
            `${sidebarWidth}, ${sidebarHeight} ` +
            // rest of the box
            `L0, ${sidebarHeight} ` +
            `0, 0 ` +
            `Z')`,
        },
        {
          duration: 1,
          left: 0,
          ease: "power3.out",
          immediateRender: false,
          clipPath: () =>
            // clip path when open
            `path('` +
            `M${sidebarWidth}, 0 ` +
            // top half of wave
            `C${sidebarWidth}, ${sidebarHeight * 0.35} ` +
            `${sidebarWidth}, ${sidebarHeight * 0.35} ` +
            `${sidebarWidth}, ${sidebarHeight * 0.5} ` +
            // bottom half of wave
            `C${sidebarWidth}, ${sidebarHeight * 0.65} ` +
            `${sidebarWidth}, ${sidebarHeight * 0.65} ` +
            `${sidebarWidth}, ${sidebarHeight} ` +
            // rest of the box
            `L0, ${sidebarHeight} ` +
            `0, 0 ` +
            `Z')`,
        })
    } else {
      navOpenTimeline.fromTo(sidebar.current, {
          top: "-100%",
          clipPath: () =>
            // path when closed
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
          top: 0,
          // path when open
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

    setOpenTimeline(navOpenTimeline)

    // restore saved state
    navOpenTimeline.progress(navOpenProgress.current)
    if (!navOpenIsPaused.current) navOpenTimeline.play()
    if (navOpenDirection.current === -1) navOpenTimeline.reverse()

    return () => {
      // save timeline state
      navOpenProgress.current = navOpenTimeline.progress()
      navOpenIsPaused.current = navOpenTimeline.paused()
      navOpenDirection.current = navOpenTimeline.reversed() ? -1 : 1
    }
  }, [mobile, refreshSignal])

  // triggering the open and close timeline set up above
  useEffect(() => {
    if (openTimeline && !doingPageTransition) {
      if (navOnScreen) {
        openTimeline.play()
        gsap.set(background.current, {
          clearProps: "opacity",
        })
      } else {
        openTimeline.reverse()
      }
    }
  }, [doingPageTransition, navOnScreen, openTimeline])

  // animating in the social links
  useEffect(() => {
    if (navOnScreen && links.current) {
      gsap.fromTo(links.current.children, {
          x: "-100%",
          opacity: 0,
        },
        {
          duration: 0.4,
          delay: 1,
          x: 0,
          opacity: 1,
          stagger: 0.05,
        })
    }
  }, [navOnScreen])

  useEffect(() => {
    if (!refreshSignal) return
    const transitionAnimateIn = () => {
      setDoingPageTransition(true)
      setNavIsOpen(false)

      const beforeTimeline = gsap.timeline({
        onComplete: () => {
          setDisplaySpinner(true)
          gsap.set(background.current, {
            opacity: 0,
          })
        },
      })

      const sidebarWidth = sidebar.current?.getBoundingClientRect().width
      const sidebarHeight = window.innerHeight
      if (!sidebarWidth) return

      beforeTimeline.clear()

      beforeTimeline.fromTo(sidebar.current, {
          paused: true,
          duration: 1,
          ease: "power3.inOut",
          clipPath: () =>
            // clip path when open
            `path('` +
            `M${sidebarWidth}, 0 ` +
            // top half of wave
            `C${sidebarWidth}, ${sidebarHeight * 0.35} ` +
            `${sidebarWidth}, ${sidebarHeight * 0.35} ` +
            `${sidebarWidth}, ${sidebarHeight * 0.5} ` +
            // bottom half of wave
            `C${sidebarWidth}, ${sidebarHeight * 0.65} ` +
            `${sidebarWidth}, ${sidebarHeight * 0.65} ` +
            `${sidebarWidth}, ${sidebarHeight} ` +
            // rest of the box
            `L0, ${sidebarHeight} ` +
            `0, 0 ` +
            `Z')`,
        },
        {
          duration: 1,
          ease: "power3.inOut",
          immediateRender: false,
          clipPath: () =>
            // clip path when closed
            `path('` +
            `M${window.innerWidth}, 0 ` +
            // top half of wave
            `C${window.innerWidth}, ${sidebarHeight * 0.35} ` +
            `${window.innerWidth * 1.5}, ${sidebarHeight * 0.35} ` +
            `${window.innerWidth * 1.5}, ${sidebarHeight * 0.5} ` +
            // bottom half of wave
            `C${window.innerWidth * 1.5}, ${sidebarHeight * 0.65} ` +
            `${window.innerWidth}, ${sidebarHeight * 0.65} ` +
            `${window.innerWidth}, ${sidebarHeight} ` +
            // rest of the box
            `L0, ${sidebarHeight} ` +
            `0, 0 ` +
            `Z')`,
        })
    }

    const transitionAnimateOut = () => {
      const afterTimeline = gsap.timeline({
        onComplete: () => {
          setDisplaySpinner(false)
          setDoingPageTransition(false)

          // reset the sidebar to its original position
          openTimeline?.pause(0)
          if (wrapper.current) {
            wrapper.current.style.pointerEvents = "none"
            wrapper.current.style.opacity = "0"
          }
        },
        delay: 0.5,
      })

      if (!mobile) {
        afterTimeline.fromTo(sidebar.current, {
            left: 0,
            clipPath: () =>
              `path('` +
              `M0, 0 ` +
              `C${window.innerWidth * 0}, ${window.innerHeight * 0.4} ` +
              `${window.innerWidth * 0}, ${window.innerHeight * 0.4} ` +
              `0, ${window.innerHeight * 0.5} ` +
              `C${window.innerWidth * 0}, ${window.innerHeight * 0.6} ` +
              `${window.innerWidth * 0}, ${window.innerHeight * 0.6} ` +
              `${window.innerWidth * 0}, ${window.innerHeight} ` +
              `L${window.innerWidth}, ${window.innerHeight} ` +
              `${window.innerWidth}, 0 ` +
              `Z')`,
          },
          {
            ease: "power3.in",
            immediateRender: false,
            duration: 1,
            left: "100%",
            clipPath: () =>
              `path('` +
              `M${window.innerWidth * 0.1}, 0 ` +
              `C${window.innerWidth * 0.1}, ${window.innerHeight * 0.4} ` +
              `${window.innerWidth * 0}, ${window.innerHeight * 0.4} ` +
              `0, ${window.innerHeight * 0.5} ` +
              `C${window.innerWidth * 0}, ${window.innerHeight * 0.6} ` +
              `${window.innerWidth * 0.1}, ${window.innerHeight * 0.6} ` +
              `${window.innerWidth * 0.1}, ${window.innerHeight} ` +
              `L${window.innerWidth}, ${window.innerHeight} ` +
              `${window.innerWidth}, 0 ` +
              `Z')`,
          }, 0)
      } else {
        afterTimeline.fromTo(sidebar.current, {
            top: 0,
            clipPath: () =>
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
            immediateRender: false,
            duration: 1,
            top: "100%",
            clipPath: () =>
              `path('` +
              `M0, ${window.innerHeight * 0.1} ` +
              `C${window.innerWidth * 0.35}, ${window.innerHeight * 0.1} ` +
              `${window.innerWidth * 0.35}, 0 ` +
              `${window.innerWidth * 0.5}, 0 ` +
              `C${window.innerWidth * 0.65}, 0 ` +
              `${window.innerWidth * 0.65}, ${window.innerHeight * 0.1} ` +
              `${window.innerWidth}, ${window.innerHeight * 0.1} ` +
              `L${window.innerWidth}, ${window.innerHeight} ` +
              `0, ${window.innerHeight} ` +
              `Z')`,
          }, 0)
      }
    }

    registerTransition("sideNav", {
      in: transitionAnimateIn,
      out: transitionAnimateOut,
      inDuration: 1,
      outDuration: 1.5,
      revert: false,
    })

    return () => {
      unregisterTransition("sideNav", [
        transitionAnimateIn,
        transitionAnimateOut,
      ])
    }
  }, [mobile, openTimeline, refreshSignal, setNavIsOpen])

  // refresh the timelines when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setRefreshSignal(p => p + 1)
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return (
    <Wrapper ref={wrapper} navOnScreen={navOnScreen}>
      {!mobile && (
        <BG
          ref={background}
          navOnScreen={navOnScreen}
          onClick={() => {
            setNavIsOpen(false)
          }}
        >
          <Noise />
        </BG>
      )}
      <Sidebar ref={sidebar}>
        <InnerWrapper>
          <InnerBG />
          <NavigationItems navOnScreen={navOnScreen} />
          <HR />
          <Socials forwardRef={links} darkText={false} hideLegal />
          <Touch>
            <GetInTouch darkText transition="sideNav" />
          </Touch>
          <ExtraLine />
        </InnerWrapper>
        <FakeLoader show={displaySpinner}>
          <Spinner />
        </FakeLoader>
      </Sidebar>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ navOnScreen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9;
  pointer-events: none;
`

const BG = styled.button<{ navOnScreen: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: ${({ navOnScreen }) => (navOnScreen ? 1 : 0)};
  z-index: -1;
  transition: opacity 1s;
  cursor: pointer;
  background-color: rgba(46, 56, 48, 0.8);
`

const Sidebar = styled.div`
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
  position: fixed;
  left: -100%;
  width: 75%;
  height: 100%;
  display: grid;
  place-items: center;

  ${media.fullWidth} {
    padding: 126px 70px 88px 188px;
  }

  ${media.desktop} {
    padding: 8.75vw 4.861vw 6.111vw 13.056vw;
  }

  ${media.tablet} {
    padding: 12.305vw 7.813vw 8.594vw 4.883vw;
  }

  ${media.mobile} {
    width: 100%;
    top: -100%;
    left: 0;
    padding: calc(14.36 * var(--vh)) 4vw calc(1.84 * var(--vh));
    place-items: start;
  }
`

const InnerWrapper = styled.div`
  display: grid;
  align-items: end;
  max-width: 100%;
  overflow: hidden;

  ${media.fullWidth} {
    grid-template-columns: auto auto;
    grid-template-areas:
      "navs ."
      "line line"
      "social touch";
    gap: 40px 0;
  }

  ${media.desktop} {
    grid-template-columns: auto auto;
    grid-template-areas:
      "navs ."
      "line line"
      "social touch";
    gap: 2.78vw 0;
  }

  ${media.tablet} {
    grid-template-columns: min-content max-content;
    grid-template-areas:
      "navs navs"
      "line line"
      "social touch";
    gap: 4.883vw 11.719vw;
  }
  ${media.mobile} {
    grid-template-columns: 1fr;
    grid-template-areas:
      "navs"
      "line"
      "touch"
      "secondLine"
      "social";
    gap: calc(3.07 * var(--vh));
  }
`

const InnerBG = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  opacity: 1;
  ${colors.backgroundBlack};
`

const HR = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${colors.black700};
  grid-area: line;
  z-index: 1;
`

const Touch = styled.div`
  grid-row: 1 / 3;
  grid-column: 2 / 3;
  overflow: hidden;
  transition: all 10s;
  grid-area: touch;

  ${media.mobile} {
    overflow: visible;
    @media (max-height: 600px) {
      display: none;
    }
  }
`

const ExtraLine = styled(HR)`
  display: none;
  ${media.mobile} {
    display: block;
    grid-area: secondLine;
  }
`

const FakeLoader = styled.div<{ show: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  display: grid;
  place-items: center;
  ${colors.backgroundBlack};
  z-index: 1;
  opacity: ${({ show }) => (show ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;
`
