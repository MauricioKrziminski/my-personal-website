"use client"

import React, { useContext, useEffect } from "react"

import { ScrollTrigger } from "gsap/ScrollTrigger"

import Footer from "components/Footer"
import { NavContext } from "components/Providers"
import Section from "components/Section"
import Hero from "components/contact/01-Hero"
import Form from "components/contact/02-Form"
import useAnimation from "utils/useAnimation"
import usePageLoad from "utils/usePageLoad"

export default function Contact() {
  const { setMenuLight } = useContext(NavContext)
  usePageLoad()

  // header começa claro (branco) por causa do hero escuro
  useEffect(() => {
    setMenuLight(true)
    return () => {
      setMenuLight(false)
    }
  }, [setMenuLight])

  // ...e vira escuro quando a seção clara do formulário passa sob o header
  useAnimation(() => {
    const form = document.querySelector("#contact-form")
    if (!form) return undefined
    const st = ScrollTrigger.create({
      trigger: form,
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
        <Form />
      </Section>
      <Footer isDark />
    </div>
  )
}
