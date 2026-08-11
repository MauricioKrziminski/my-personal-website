"use client"

import React from "react"

import Footer from "components/Footer"
import Hero from "components/homepage/01-Hero"
import Stories from "components/homepage/02-Stories"
import Intro from "components/homepage/Intro"
import HomepageMarquee from "components/homepage/03-07-Marquee"
import HomepageProjects from "components/homepage/04-Projects"
import Approach from "components/homepage/05-Approach"
import Tagline from "components/homepage/06-Tagline"
import Section from "components/Section"
import marqueeOne from "images/homepage/marquees/band-01.webp"
import marqueeTwo from "images/homepage/marquees/band-02.webp"
import marqueeThree from "images/homepage/marquees/band-03.webp"
import marqueeFour from "images/homepage/marquees/band-04.webp"
import { getProjects } from "utils/data"
import { useLang, useT } from "utils/i18n/useT"
import usePageLoad from "utils/usePageLoad"

const upper = [marqueeOne, marqueeTwo]
const lower = [marqueeThree, marqueeFour]

export default function Home() {
  const { lang } = useLang()
  const t = useT()
  const [featuredOne, featuredTwo, featuredThree] = getProjects(lang)

  const upperAlt = [t.marqueeTop.altOne, t.marqueeTop.altTwo]
  const lowerAlt = [t.marqueeBottom.altOne, t.marqueeBottom.altTwo]

  usePageLoad()

  return (
    <>
      <Section noTopWave>
        <Hero />
      </Section>
      <Section isDark>
        <Intro key={lang} />
      </Section>
      <Section isDark>
        <Stories />
      </Section>
      <Section>
        <HomepageMarquee images={upper} alts={upperAlt}>
          <div>{t.marqueeTop.lineOne}</div>
          <div>{t.marqueeTop.lineTwo}</div>
        </HomepageMarquee>
      </Section>
      <Section isDark>
        <HomepageProjects
          featuredOne={featuredOne}
          featuredTwo={featuredTwo}
          featuredThree={featuredThree}
        />
      </Section>
      <div
        style={{
          zIndex: 2,
          position: "relative",
        }}
      >
        <Section>
          <Approach />
        </Section>
      </div>
      <Section isDark>
        <Tagline />
      </Section>
      <Section noBottomWave>
        <HomepageMarquee images={lower} atBottom alts={lowerAlt}>
          <div>{t.marqueeBottom.lineOne}</div>
          <div>{t.marqueeBottom.lineTwo}</div>
        </HomepageMarquee>
      </Section>
      <Footer isDark />
    </>
  )
}
