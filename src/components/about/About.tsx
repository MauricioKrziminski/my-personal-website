"use client"

import React, { useContext, useEffect } from "react"

import { ScrollTrigger } from "gsap/ScrollTrigger"

import Footer from "components/Footer"
import { NavContext } from "components/Providers"
import Section from "components/Section"
import Hero from "components/about/01-Hero"
import Experiences from "components/about/02-Experiences"
import { getExperiences } from "utils/data"
import { useLang } from "utils/i18n/useT"
import useAnimation from "utils/useAnimation"
import usePageLoad from "utils/usePageLoad"

export default function About() {
  const { lang } = useLang()
  const team = getExperiences(lang)
  const { setMenuLight } = useContext(NavContext)
  usePageLoad()

  // header starts light (white) for the dark hero
  useEffect(() => {
    setMenuLight(true)
    return () => {
      setMenuLight(false)
    }
  }, [setMenuLight])

  // ...and flips to dark while the light experiences section is under the header
  useAnimation(() => {
    const exp = document.querySelector("#about-experience")
    if (!exp) return undefined
    const st = ScrollTrigger.create({
      trigger: exp,
      start: "top 90px",
      end: "bottom 90px",
      onToggle: self => setMenuLight(!self.isActive),
    })
    return () => st.kill()
  }, [setMenuLight])

  return (
    <div>
      <Section isDark noTopWave>
        <Hero />
      </Section>
      <Section noBottomWave>
        <Experiences team={team} />
      </Section>
      <Footer isDark />
    </div>
  )
}
