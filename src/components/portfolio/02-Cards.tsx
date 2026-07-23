import React, {
  useMemo,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react"

import gsap, { ScrollTrigger, ScrollSmoother } from "gsap/all"
import styled from "styled-components"

import HorizontalBlob from "components/HorizontalBlob"
import Card from "components/portfolio/Card"
import SideNav from "components/portfolio/SideNav"
import { ScreenContext } from "components/Providers"
import { useIsSmooth, usePinType } from "components/Scroll"
import VerticalBlob from "components/VerticalBlob"
import colors from "styles/colors"
import media from "styles/media"
import { vwToPx, isBrowser } from "utils/functions"
import useAnimation from "utils/useAnimation"
import useMedia from "utils/useMedia"

type Props = {
  companies: Contentful.CompanyNodes
}

export default function Cards({ companies }: Props) {
  const { tablet, mobile, desktop, fullWidth } = useContext(ScreenContext)

  const [active, setActive] = useState<number | null>(null)
  const [oldActive, setOldActive] = useState<number | null>(null)
  const [center, setCenter] = useState<number>(0)
  const [scrollTrigger, setScrollTrigger] = useState<ScrollTrigger | null>(null)

  const [wrapperRef, setWrapperRer] = useState<HTMLElement | null>(null)
  const [navRef, setNavRef] = useState<HTMLDivElement | null>(null)

  const startPadding = useMedia(
    160,
    vwToPx(11.11),
    vwToPx(23.93),
    vwToPx(26.67)
  )
  const cardHeight = useMedia(
    200 + 20,
    vwToPx(13.89 + 1.39),
    vwToPx(19.53 + 1.46),
    vwToPx(24 + 2.67)
  )
  const cardHeightDiff = useMedia(
    300,
    vwToPx(20.83),
    vwToPx(15.63),
    vwToPx(62.67)
  )

  const isSmooth = useIsSmooth()

  useAnimation(() => {
    if (navRef && wrapperRef && (desktop || fullWidth) && isBrowser()) {
      const navHeight =
        navRef.children[0].children[0].getBoundingClientRect().height

      const start = () =>
        `top+=${window.innerHeight / 2 + startPadding - navHeight / 2} 50%`
      const end = () => `bottom-=${startPadding + navHeight / 2} 50%`

      ScrollTrigger.create({
        trigger: wrapperRef,
        pin: navRef,
        pinnedContainer: wrapperRef,
        scrub: true,
        start,
        end,
        pinType: isSmooth ? "transform" : "fixed",
        anticipatePin: isSmooth ? undefined : 1,
      })
    }
  }, [isSmooth, navRef, desktop, fullWidth, startPadding, wrapperRef])

  const createScrollTrigger = useCallback(() => {
    const newTrigger = ScrollTrigger.create({
      trigger: wrapperRef,
      start: "top top",
      end: "bottom bottom",
      onUpdate: self => {
        const threshold = 1 / (companies.length - 1)
        const card = Math.floor(self.progress / threshold)

        setCenter(card)
      },
    })

    setScrollTrigger(newTrigger)
  }, [companies.length, wrapperRef])

  useEffect(() => {
    if (typeof active === "number" && active !== oldActive && scrollTrigger) {
      scrollTrigger?.kill()
      const scroller = ScrollSmoother.get()
      setOldActive(active)

      gsap.to(scroller, {
        scrollTop:
          active === 0
            ? window.innerHeight
            : startPadding + window.innerHeight / 2 + (active + 1) * cardHeight,
        onComplete: () => {
          createScrollTrigger()
          setCenter(active)
        },
      })
    }
  }, [
    active,
    cardHeight,
    createScrollTrigger,
    oldActive,
    scrollTrigger,
    startPadding,
  ])

  const updateActive = useCallback(
    (index: number | null) => {
      setOldActive(active)
      setActive(index)
    },
    [active]
  )

  useAnimation(() => {
    if (wrapperRef && !mobile) {
      createScrollTrigger()
    }
  }, [wrapperRef, mobile, createScrollTrigger])

  const cards = useMemo(
    () =>
      companies.map((item, index) => {
        return (
          <Card
            key={`${item.name ?? ""}${item.logo?.file?.url ?? ""}`}
            company={item}
            active={active === index}
            setActive={updateActive}
            setCenter={setCenter}
            index={index}
          />
        )
      }),
    [active, updateActive, setCenter, companies]
  )

  const pinType = usePinType()
  useAnimation(() => {
    if (!tablet && !mobile && wrapperRef) {
      ScrollTrigger.create({
        trigger: wrapperRef.parentElement,
        start: "top top",
        end: () => {
          return `top+=${window.innerHeight} top`
        },
        pin: wrapperRef,
        pinType,
      })
      gsap.fromTo(wrapperRef, {
          x: "100vw",
        },
        {
          x: "0vw",
          scrollTrigger: {
            start: 0,
            end: () => window.innerHeight,
            scrub: true,
          },
        })
    }
  }, [mobile, pinType, tablet, wrapperRef])

  return (
    <Wrapper
      id="portfolio-cards"
      ref={(ref: HTMLElement) => setWrapperRer(ref)}
    >
      {(fullWidth || desktop) && (
        <HorizontalBlob
          background={colors.backgroundBlack}
          trigger="#portfolio-cards"
          textColor={colors.mainWhite}
        />
      )}
      {tablet && (
        <VerticalBlob
          background={colors.backgroundBlack}
          trigger="#portfolio-cards"
          textColor={colors.mainWhite}
        />
      )}

      <Content
        cardHeight={cardHeight}
        cardHeightDiff={cardHeightDiff}
        length={companies.length}
      >
        {cards}
      </Content>
      {(desktop || fullWidth) && (
        <div>
          <NavWrapper ref={(ref: HTMLDivElement) => setNavRef(ref)}>
            <SideNav
              companies={companies}
              active={active}
              setActive={setActive}
              center={center}
            />
          </NavWrapper>
        </div>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.section`
  ${colors.backgroundBlack};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  top: 0;
  width: 100%;
  height: auto;
  pointer-events: all;

  ${media.fullWidth} {
    padding: 160px 0px;
    transform: translateX(100vw);
  }

  ${media.desktop} {
    padding: 11.11vw 0vw;
    transform: translateX(100vw);
  }

  ${media.tablet} {
    padding: 23.93vw 12.89vw;
  }

  ${media.mobile} {
    background: unset;
    position: relative;
    transform: unset;
    padding: 26.67vw 4vw;
  }
`

const Content = styled.div<{
  cardHeight: number
  cardHeightDiff: number
  length: number
}>`
  display: grid;
  // height: number of cards * (card height + grid gap) + extra height from 1 open card
  height: ${props => props.length * props.cardHeight + props.cardHeightDiff}px;

  ${media.fullWidth} {
    width: 1060px;
    gap: 20px;
  }

  ${media.desktop} {
    width: 73.61vw;
    gap: 1.39vw;
  }

  ${media.tablet} {
    width: 74.22vw;
    gap: 1.46vw;
  }

  ${media.mobile} {
    width: 92vw;
    gap: 2.67vw;
  }
`

const NavWrapper = styled.div`
  position: absolute;
  z-index: 4;
  top: calc(50 * var(--vh));
  transform: translateY(-50%) translateZ(0);
  width: 300px;

  ${media.fullWidth} {
    right: 55px;
    height: 163px;
  }

  ${media.desktop} {
    right: 3.82vw;
    height: 11.32vw;
  }

  ${media.tablet} {
    display: none;
  }

  ${media.mobile} {
    display: none;
  }
`
