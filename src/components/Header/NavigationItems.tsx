import React, { useRef, useEffect } from "react"

import { useLocation } from "utils/useLocation"
import gsap from "gsap"
import styled from "styled-components"

import NavItem from "components/NavItem"
import colors from "styles/colors"
import media from "styles/media"
import text from "styles/text"
import { loadPage } from "utils/Loader/TransitionUtils"
import { useT } from "utils/i18n/useT"
import useInnerVh from "utils/useInnerVh"

type NavItemsProps = {
  navOnScreen: boolean
}

const navList = [
  { key: "home", to: "/" },
  { key: "projects", to: "/projects" },
  { key: "about", to: "/about" },
  { key: "contact", to: "/contact" },
] as const

function Items({
  active,
  navOnScreen,
  handleClick,
}: {
  active: boolean
  navOnScreen: boolean
  handleClick: (arg0: number) => void
}) {
  const gridGap = useInnerVh(3.69)
  const t = useT()

  return (
    <ItemsWrapper gridGap={gridGap}>
      {navList.map((item, index) => (
        <button
          type="button"
          key={item.key}
          onClick={() => handleClick(index)}
          style={{ width: "100%" }}
        >
          <NavItem
            isActive={active}
            navOnScreen={navOnScreen}
            color={colors.mainWhite}
          >
            {t.nav[item.key]}
          </NavItem>
        </button>
      ))}
    </ItemsWrapper>
  )
}

export default function NavigationItems({ navOnScreen }: NavItemsProps) {
  const clipper = useRef<HTMLDivElement>(null)
  const location = useLocation()

  const handleClick = (index: number) => {
    if (clipper.current) {
      gsap.to(clipper.current, {
        top: `${(index / navList.length) * 100}%`,
        ease: "power3.inOut",
      })
      gsap.to(clipper.current.children, {
        y: `${-(index / navList.length) * 100}%`,
        ease: "power3.inOut",
      })
      loadPage(navList[index].to, "sideNav").catch(console.error)
    }
  }

  useEffect(() => {
    if (clipper.current) {
      let currentActiveIndex = 0
      navList.forEach((item, index) => {
        if (
          item.to === location.pathname ||
          item.to === `${location.pathname}/` ||
          `${item.to}/` === location.pathname
        ) {
          currentActiveIndex = index
        }
      })

      gsap.to(clipper.current, {
        top: `${(currentActiveIndex / navList.length) * 100}%`,
        ease: "power3.inOut",
      })
      gsap.to(clipper.current.children, {
        y: `${-(currentActiveIndex / navList.length) * 100}%`,
        ease: "power3.inOut",
      })
    }
  }, [location])

  return (
    <Wrapper>
      <Items
        handleClick={handleClick}
        active={false}
        navOnScreen={navOnScreen}
      />
      <Clipper ref={clipper}>
        <Items handleClick={handleClick} active navOnScreen={navOnScreen} />
      </Clipper>
    </Wrapper>
  )
}

const ItemsWrapper = styled.div<{ gridGap: string }>`
  display: grid;

  ${media.fullWidth} {
    grid-gap: 40px;
  }

  ${media.desktop} {
    grid-gap: 2.78vw;
  }

  ${media.tablet} {
    grid-gap: 0px;
  }

  ${media.mobile} {
    grid-gap: ${props => props.gridGap};
  }
`

const Wrapper = styled.div`
  ${text.h4};
  display: grid;
  grid-auto-flow: row;
  grid-area: navs;
  position: relative;
  cursor: pointer;
  padding-right: 60px;
  margin-right: -60px;

  grid-gap: 40px;
  ${media.desktop} {
    grid-gap: 2.778vw;
  }
  ${media.tablet} {
    ${text.h3}
    grid-gap: 4.883vw;
  }
  ${media.mobile} {
    grid-gap: 0;
    /* needed space created by blinky i think */
    ${text.h5}
  }
`

const Clipper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  /* a fracao acompanha navList.length: 1/3 com 3 itens, 1/4 com 4. O top e
     o y ja sao calculados a partir de navList.length, so esta altura era
     um numero cravado. */
  height: 25%;
  overflow: hidden;
  ${colors.backgroundBlack};
`
