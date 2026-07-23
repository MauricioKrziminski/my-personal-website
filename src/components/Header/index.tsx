import React, { useEffect, useRef, useState, useContext } from "react"

import gsap from "gsap"
import styled from "styled-components"

import { NavContext, ScreenContext } from "components/Providers"
import colors from "styles/colors"
import easing from "styles/easing"
import media from "styles/media"
import text from "styles/text"
import LanguageToggle from "utils/i18n/LanguageToggle"
import { useT } from "utils/i18n/useT"

import Candlestick from "./Candlestick"
import Logo from "./Logo"
import SideNav from "./SideNav"

export default function Header() {
  const menuText = useRef<HTMLDivElement>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const { navIsOpen, setNavIsOpen, menuLight } = useContext(NavContext)
  const { mobile } = useContext(ScreenContext)
  const t = useT()

  const handleScroll = () => {
    if (window.scrollY > 100) {
      setIsScrolled(true)
    } else {
      setIsScrolled(false)
    }
  }

  useEffect(() => {
    if (menuText.current) {
      if (isScrolled) {
        gsap.to(menuText.current, {
          x: "-100%",
          opacity: 0,
          ease: "power1.out",
        })
      } else {
        gsap.to(menuText.current, {
          x: 0,
          opacity: 1,
          ease: "power1.out",
        })
      }
    }
  }, [isScrolled])

  useEffect(() => {
    window.addEventListener("smoothScroll", handleScroll)
    return () => {
      window.removeEventListener("smoothScroll", handleScroll)
    }
  }, [])

  return (
    <>
      <SideNav setNavIsOpen={setNavIsOpen} navOnScreen={navIsOpen} />
      <Wrapper>
        <Logo isScrolled={isScrolled} />
        <RightGroup light={menuLight || navIsOpen}>
          <ToggleWrap>
            <LanguageToggle />
          </ToggleWrap>
          <Right
            onClick={() => {
              setNavIsOpen(!navIsOpen)
            }}
            navIsOpen={navIsOpen}
          >
            <MenuContainer>
              <Menu ref={menuText} transparent={!navIsOpen} light>
                {t.header.close}
              </Menu>
              <Menu
                ref={menuText}
                transparent={navIsOpen || mobile}
                light={menuLight}
              >
                {t.header.menu}
              </Menu>
            </MenuContainer>
            <Candlestick isCloseButton={navIsOpen} />
          </Right>
        </RightGroup>
      </Wrapper>
    </>
  )
}

const Wrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;

  padding: 40px 55px;
  height: 108px;
  ${media.desktop} {
    padding: 2.778vw 3.819vw;
    height: 7.5vw;
  }
  ${media.tablet} {
    padding: 3.906vw 5.371vw;
    height: 10.547vw;
  }
  ${media.mobile} {
    padding: 6.667vw 4vw;
    height: 20.533vw;
  }

  pointer-events: none;
  & > * {
    pointer-events: all;
  }
`

const RightGroup = styled.div<{ light?: boolean }>`
  display: flex;
  align-items: center;
  gap: 24px;
  color: ${({ light }) => (light ? colors.mainWhite : colors.mainBlack)};

  ${media.desktop} {
    gap: 1.667vw;
  }
  ${media.mobile} {
    gap: 4vw;
  }
`

const ToggleWrap = styled.div`
  display: flex;
  align-items: center;
`

const Menu = styled.div<{ transparent: boolean; light?: boolean }>`
  ${text.bodyL};
  position: relative;
  margin-right: 20px;
  transition: opacity 0.3s;
  //don't let gsap override an opacity of 0
  opacity: ${({ transparent }) => (transparent ? "0 !important" : "1")};
  color: ${({ light }) => (light ? colors.mainWhite : colors.mainBlack)};

  ${media.desktop} {
    margin-right: 1.389vw;
  }
  ${media.tablet} {
    margin-right: 1.953vw;
  }
  ${media.mobile} {
    margin-right: 5.333vw;
  }

  // styles specific to the word close
  &:first-child {
    position: absolute;
    transform: translateX(0);
  }

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    transition: width 0.3s ${easing.main};
    height: 100%;
    border-bottom: 1px solid
      ${({ light }) => (light ? colors.mainWhite : colors.mainBlack)};
  }
`

const Right = styled.button<{ navIsOpen: boolean; disableCursor?: boolean }>`
  display: flex;
  cursor: pointer;
  & > div:nth-child(2) {
    transition: transform 0.3s ${easing.main};
  }
  pointer-events: ${({ disableCursor }) => (disableCursor ? "none" : "all")};
  opacity: ${({ disableCursor }) => (disableCursor ? "0" : "1")};
  transition: opacity 0.3s ease-in-out;
  background: none;
  border: none;

  /* style the candlesticks */
  &:hover {
    ${({ navIsOpen }) => {
      return navIsOpen
        ? `& > div:nth-child(2) {
          transform: rotate(-90deg);
        }`
        : `div {
          transform: translateY(0);
        }`
    }}

    ${Menu} {
      &:after {
        width: 100%;
      }
    }
  }
`

const MenuContainer = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  position: relative;
`
