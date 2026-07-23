import React, { useEffect, useRef, useContext } from "react"

import styled from "styled-components"

import { ScreenContext } from "components/Providers"
const LogoDarkSVG = "/images/global/LogoDark.svg"
const LogoLightSVG = "/images/global/LogoLight.svg"
const LogoSmallDark = "/images/global/LogoSmallDark.svg"
const LogoSmallLight = "/images/global/LogoSmallLight.svg"
import { isBrowser, isColorLight } from "utils/functions"
import { loadPage } from "utils/Loader/TransitionUtils"

type LogoProps = {
  isScrolled: boolean
}

export default function Logo({ isScrolled }: LogoProps) {
  const logo = useRef<HTMLButtonElement>(null)
  const dark = useRef<HTMLImageElement>(null)
  const light = useRef<HTMLImageElement>(null)
  const { mobile } = useContext(ScreenContext)

  // this functions job is to choose which logo to show
  // depending on what's behind the logo
  const updateLogoColor = () => {
    if (logo.current && dark.current && light.current) {
      // get the element currently at the top left of the viewport
      const elements = document.elementsFromPoint(60, 60)
      const header = document.querySelector("header")

      if (!header) return

      // find the first element not in the header and has a background color
      const element = elements.find(el => {
        return (
          !header.contains(el) &&
          window.getComputedStyle(el).getPropertyValue("background-color") !==
            "rgba(0, 0, 0, 0)"
        )
      })

      if (element) {
        // get the background color of the element
        const color = window
          .getComputedStyle(element)
          .getPropertyValue("background-color")

        if (isColorLight(color)) {
          // if the color is light, show the dark logo
          light.current.style.opacity = "0"
          dark.current.style.opacity = "1"
        } else {
          // if the color is dark, show the light logo
          light.current.style.opacity = "1"
          dark.current.style.opacity = "0"
        }
      }
    }
  }

  useEffect(() => {
    if (isBrowser()) {
      const updater = setInterval(
        () => requestAnimationFrame(updateLogoColor),
        250
      )

      return () => {
        clearInterval(updater)
      }
    }
  }, [])

  return (
    <Wrapper
      ref={logo}
      isScrolled={isScrolled || mobile}
      onClick={() => {
        // if on homepage, scroll to top
        // otherwise load homepage
        if (window.location.pathname === "" || window.location.pathname === "/")
          window.scrollTo({ top: 0, behavior: "smooth" })
        else loadPage("/", "generic").catch(console.error)
      }}
    >
      <LogoContainer ref={dark}>
        <Jail>
          <Image src={LogoDarkSVG} alt="Mauricio Krziminski" />
        </Jail>
        <Jail>
          <Image src={LogoSmallDark} alt="Mauricio Krziminski" />
        </Jail>
      </LogoContainer>
      <LogoContainer ref={light}>
        <Jail>
          <Image src={LogoLightSVG} alt="Mauricio Krziminski" aria-hidden />
        </Jail>
        <Jail>
          <Image src={LogoSmallLight} alt="Mauricio Krziminski" aria-hidden />
        </Jail>
      </LogoContainer>
    </Wrapper>
  )
}

const Jail = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  transition: width 0.2s ease-in-out;
  overflow: hidden;
`

const Wrapper = styled.button<{ isScrolled: boolean }>`
  height: 100%;
  width: 100%;
  cursor: pointer;
  position: relative;

  /* full wordmark "Mauricio Krziminski" renders ~269px wide at the header logo
     height, so the track is widened from New Form's 200px to avoid clipping;
     the small "MK" only needs ~50px */
  ${Jail}:first-child {
    width: ${props => (props.isScrolled ? "0%" : "280px")};
  }
  ${Jail}:last-child {
    width: ${props => (props.isScrolled ? "60px" : "0%")};
  }

  &:hover {
    ${Jail}:first-child {
      width: 280px;
    }
    ${Jail}:last-child {
      width: 0%;
    }
  }
`

const LogoContainer = styled.div`
  width: 100%;
  height: 100%;
  transition: 0.2s opacity ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
`

const Image = styled.img<{ alt: string }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  max-width: none;
  width: auto;
`
