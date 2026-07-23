import React, { useEffect, useRef, useState } from "react"

import gsap from "gsap"
import styled from "styled-components"

import MainButton from "components/MainButton"
import { useIsSmooth } from "components/Scroll"
import media from "styles/media"
import text from "styles/text"
import UniversalLink from "utils/Loader/UniversalLink"
import { useLang, useT } from "utils/i18n/useT"
import useAnimation from "utils/useAnimation"

import Cards from "./Quotes/AllCards"
import Title from "./Quotes/Title"

const DURATION = "1000px"

export default function Quotes() {
  const t = useT()
  const { lang } = useLang()
  const outer = useRef<HTMLDivElement>(null)
  const wrapper = useRef<HTMLDivElement>(null)
  const [tl, setTl] = useState<gsap.core.Timeline | null>(null)
  const titleContainer = useRef<HTMLDivElement>(null)
  const sub = useRef<HTMLDivElement>(null)
  const clipper = useRef<HTMLDivElement>(null)

  const calcSubOffset = () => {
    if (titleContainer.current && clipper.current) {
      // GSAP 3.13's SplitText splits the title into one <h2> per visual line, so
      // querySelector("h2") only measures a single line. Sum every line's height
      // to get the true title height (falls back to the full title when SplitText
      // hasn't run and there is a single <h2>).
      const lines = titleContainer.current.querySelectorAll("h2")
      const titleHeight = Array.from(lines).reduce(
        (total, line) => total + line.clientHeight,
        0
      )
      gsap.to(sub.current, {
        y: -((window.innerHeight - titleHeight) / 2),
      })
    }
  }

  useEffect(() => {
    const interval = setInterval(calcSubOffset, 1500)
    calcSubOffset()
    window.addEventListener("resize", calcSubOffset)
    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", calcSubOffset)
    }
  }, [titleContainer])

  const isSmooth = useIsSmooth()

  useAnimation(() => {
    if (outer.current && wrapper.current) {
      const newTl = gsap.timeline({
        scrollTrigger: {
          trigger: outer.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
          pin: wrapper.current,
          pinSpacing: false,
          pinType: isSmooth ? "transform" : "fixed",
          anticipatePin: isSmooth ? undefined : 1,
          refreshPriority: 10 - 6,
        },
      })

      setTl(newTl)
    }
  }, [isSmooth])

  return (
    <div>
      <Outer ref={outer}>
        <Wrapper ref={wrapper}>
          <div ref={titleContainer}>
            {/* key on lang so React fully remounts the SplitText title with the
                translated text (SplitText mutates the DOM outside React, so an
                in-place text update alone would leave the old-language split) */}
            <Title key={lang} timeline={tl} clipper={clipper} />
          </div>
        </Wrapper>
      </Outer>
      <Sub ref={sub}>
        <Desc>{t.quotes.sub}</Desc>
        <UniversalLink to="/about" transition="generic">
          <MainButton darkBackground>{t.quotes.cta}</MainButton>
        </UniversalLink>
      </Sub>
      <Cards />
    </div>
  )
}

const Outer = styled.div`
  height: calc(100vh + ${DURATION});
  padding-bottom: ${DURATION};
`

const Wrapper = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  pointer-events: none;
  & > div {
    pointer-events: auto;
  }
`

const Sub = styled.div`
  display: flex;
  justify-content: space-between;

  width: 791px;
  margin: 0 auto;
  padding-top: 80px;
  ${media.desktop} {
    width: 54.931vw;
    margin: 0 auto;
    padding-top: 5.556vw;
  }
  ${media.tablet} {
    width: 58.594vw;
    margin: 0 auto;
    padding-top: 6.836vw;
    flex-direction: column;
    align-items: start;
    gap: 4.883vw;
  }
  ${media.mobile} {
    flex-direction: column;
    width: 92vw;
    margin: 0 auto;
    padding-top: 21.333vw;
    gap: 5.333vw;
  }
`

const Desc = styled.p`
  ${text.bodyS}
  text-shadow: 0px 0px 3px rgb(0, 0, 0);

  width: 381px;
  ${media.desktop} {
    width: 26.458vw;
  }
  ${media.tablet} {
    width: 47.07vw;
    ${text.bodyM}
  }
  ${media.mobile} {
    width: 82.667vw;
    ${text.bodyS}
  }
`
