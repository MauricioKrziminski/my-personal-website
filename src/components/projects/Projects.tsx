"use client"

import React, { useEffect, useContext } from "react"

import ScrollSmoother from "gsap/ScrollSmoother"
import styled from "styled-components"

import Footer from "components/Footer"
import Hero from "components/projects/01-Hero"
import Cards from "components/projects/02-Cards"
import { ScreenContext } from "components/Providers"
import { useIsSmooth } from "components/Scroll"
import Section from "components/Section"
import ClientOnly from "utils/ClientOnly"
import { getProjects } from "utils/data"
import { isBrowser } from "utils/functions"
import { useLang } from "utils/i18n/useT"
import usePageLoad from "utils/usePageLoad"

export default function Projects() {
  const screen = useContext(ScreenContext)
  const { lang } = useLang()
  const companies = getProjects(lang)

  usePageLoad()
  const isSmooth = useIsSmooth()

  // turn horizontal scroll into vertical scroll
  // on this page especially the average person might want to scroll sideways
  useEffect(() => {
    if (!isSmooth) return
    if (!screen.mobile) {
      const updateScroll = (e: WheelEvent) => {
        const delta = e.deltaX
        window.scrollBy(0, delta)
      }

      let previousTouch: Touch | null = null
      const updateTouchMove = (e: TouchEvent) => {
        e.preventDefault()
        const touch = e.touches[0]

        if (touch) {
          if (previousTouch) {
            const delta = previousTouch.clientX - touch.clientX
            ScrollSmoother.get().scrollTo(window.scrollY + delta)
          }

          previousTouch = touch
        }
      }
      const resetTouchMove = () => {
        previousTouch = null
      }

      if (isBrowser()) {
        window.addEventListener("wheel", updateScroll)
        window.addEventListener("touchmove", updateTouchMove)
        window.addEventListener("touchend", resetTouchMove)

        return () => {
          window.removeEventListener("wheel", updateScroll)
          window.removeEventListener("touchmove", updateTouchMove)
          window.removeEventListener("touchend", resetTouchMove)
        }
      }
    }
  }, [isSmooth, screen.mobile])

  return (
    <Wrapper>
      <ClientOnly>
        {!screen.mobile && (
          <div>
            <Hero />
            <Cards companies={companies} />
          </div>
        )}
        {screen.mobile && (
          <div>
            <Section noTopWave>
              <Hero />
            </Section>
            <Section noBottomWave isDark>
              <Cards companies={companies} />
            </Section>
          </div>
        )}
        <Footer isDark={false} />
      </ClientOnly>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  section {
    z-index: 1;
  }
  .pin-spacer {
    z-index: auto !important;
  }
`
