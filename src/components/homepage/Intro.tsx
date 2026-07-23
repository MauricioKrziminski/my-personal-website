import React, { useContext, useRef } from "react"

import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import SplitText from "gsap/SplitText"
import styled from "styled-components"

import ArrowLink from "components/ArrowLink"
import MainButton from "components/MainButton"
import { ScreenContext } from "components/Providers"
import { useIsSmooth } from "components/Scroll"
import Photo from "images/homepage/intro/mauricio.webp"
import colors from "styles/colors"
import media from "styles/media"
import text from "styles/text"
import links from "utils/links"
import UniversalLink from "utils/Loader/UniversalLink"
import { useT } from "utils/i18n/useT"
import useAnimation from "utils/useAnimation"

/**
 * Personal introduction band on the homepage: a real photo plus a first-person
 * pitch, so the site presents the person, not only the tech. Sits right after
 * the Hero. Reveal on scroll matches the rest of the site (photo wipes up, text
 * staggers in).
 */
export default function Intro() {
  const wrapper = useRef<HTMLDivElement>(null)
  const t = useT()
  const isSmooth = useIsSmooth()
  const { mobile } = useContext(ScreenContext)

  useAnimation(() => {
    if (!wrapper.current) return
    const pinned = wrapper.current.querySelector(".intro-pinned")
    const photo = wrapper.current.querySelector(".intro-photo")
    const img = wrapper.current.querySelector(".intro-photo-img")
    const bar = wrapper.current.querySelector(".intro-bar")
    const fillEls = gsap.utils.toArray<HTMLElement>(
      ".intro-fill",
      wrapper.current
    )
    const cta = wrapper.current.querySelector(".intro-cta")

    // the section LOCKS (pins) when you reach it; the animation then plays as
    // you keep scrolling through the pinned distance
    if (pinned && !mobile)
      ScrollTrigger.create({
        trigger: wrapper.current,
        start: "top top",
        end: "bottom bottom",
        pin: pinned,
        pinType: isSmooth ? "transform" : "fixed",
        anticipatePin: isSmooth ? undefined : 1,
      })

    // entrance (as the section approaches / locks): photo wipe + green bar
    if (photo)
      gsap.from(photo, {
        scrollTrigger: { trigger: wrapper.current, start: "top 60%" },
        clipPath: "inset(100% 0% 0% 0%)",
        duration: 1,
        ease: "power3.out",
      })
    if (bar)
      gsap.from(bar, {
        scrollTrigger: { trigger: wrapper.current, start: "top 45%" },
        scaleX: 0,
        transformOrigin: "left center",
        duration: 0.9,
        ease: "power3.out",
      })

    // ALL the intro texts (role, greeting, body) fill in word by word across the
    // pinned scroll: every word goes from dim to full as you scroll, then the
    // buttons fade in at the end.
    const allWords: HTMLElement[] = []
    fillEls.forEach(el => {
      const split = new SplitText(el, { type: "words" })
      allWords.push(...(split.words as HTMLElement[]))
    })

    if (mobile) {
      gsap.set(allWords, { opacity: 1 })
      if (cta) gsap.set(cta, { opacity: 1 })
    } else {
      gsap.set(allWords, { opacity: 0.15 })
      if (cta) gsap.set(cta, { opacity: 0, y: 20 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      })
      tl.to(allWords, { opacity: 1, ease: "none", stagger: 1 }, 0)
      if (cta) tl.to(cta, { opacity: 1, y: 0, ease: "none", duration: 6 }, "-=6")
    }

    // subtle photo parallax across the whole section
    if (img)
      gsap.fromTo(
        img,
        { yPercent: 6 },
        {
          yPercent: -6,
          ease: "none",
          scrollTrigger: {
            trigger: wrapper.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      )
  }, [isSmooth, mobile])

  return (
    <Outer ref={wrapper}>
      <Pinned className="intro-pinned">
        <Inner>
        <PhotoCard className="intro-photo">
          <img className="intro-photo-img" src={Photo.src} alt={t.intro.alt} />
          <span className="intro-bar" />
        </PhotoCard>

        <Content>
          <Role className="intro-fill">{t.intro.role}</Role>
          <Greeting className="intro-fill">{t.intro.greeting}</Greeting>
          <Body className="intro-fill">{t.intro.body}</Body>

          <Actions className="intro-cta">
            <UniversalLink to="/about" transition="generic">
              <MainButton darkBackground>{t.intro.aboutCta}</MainButton>
            </UniversalLink>
            <Links>
              <a href="/Mauricio-Krziminski-CV.pdf" download>
                <ArrowLink>{t.intro.cvCta}</ArrowLink>
              </a>
              <a href={links.email}>
                <ArrowLink>{t.intro.contactCta}</ArrowLink>
              </a>
            </Links>
          </Actions>
        </Content>
        </Inner>
      </Pinned>
    </Outer>
  )
}

const Outer = styled.div`
  position: relative;
  width: 100%;
  /* extra height gives the pinned content room to play the animation on scroll;
     taller = the word-fill spreads over more scroll = slower */
  height: 320vh;

  ${media.mobile} {
    height: auto;
  }
`

const Pinned = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  padding: 0 55px;
  ${media.desktop} {
    padding: 0 3.819vw;
  }
  ${media.tablet} {
    padding: 0 5.371vw;
  }
  ${media.mobile} {
    height: auto;
    overflow: visible;
    padding: 21.333vw 6.667vw;
  }
`

const Inner = styled.div`
  display: grid;
  align-items: center;
  width: 100%;
  max-width: 1330px;

  grid-template-columns: 0.9fr 1.1fr;
  gap: 70px;
  ${media.desktop} {
    gap: 4.861vw;
  }
  ${media.tablet} {
    gap: 4.395vw;
  }
  ${media.mobile} {
    grid-template-columns: 1fr;
    gap: 10.667vw;
  }
`

const PhotoCard = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 5;
  overflow: hidden;
  will-change: clip-path;

  /* img is taller than the card so it can parallax within the frame on scroll */
  .intro-photo-img {
    position: absolute;
    left: 0;
    top: -9%;
    width: 100%;
    height: 118%;
    object-fit: cover;
    object-position: center 20%;
    display: block;
    will-change: transform;
  }

  /* brand accent: a thin green bar along the bottom edge (grows in on reveal) */
  .intro-bar {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 6px;
    background-color: ${colors.mainGreen};
    transform-origin: left center;
    z-index: 1;
  }

  border-radius: 12px;
  ${media.desktop} {
    border-radius: 0.833vw;
    .intro-bar {
      height: 0.417vw;
    }
  }
  ${media.tablet} {
    border-radius: 1.172vw;
  }
  ${media.mobile} {
    border-radius: 3.2vw;
    max-width: 80vw;
    margin: 0 auto;
    .intro-bar {
      height: 1.067vw;
    }
  }
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Role = styled.p`
  ${text.bodyXS}
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: ${colors.mainGreen};

  margin-bottom: 18px;
  ${media.desktop} {
    margin-bottom: 1.25vw;
  }
  ${media.mobile} {
    margin-bottom: 4vw;
  }
`

const Greeting = styled.h2`
  ${text.h4}

  margin-bottom: 24px;
  ${media.desktop} {
    margin-bottom: 1.667vw;
  }
  ${media.mobile} {
    ${text.h5}
    margin-bottom: 5.333vw;
  }
`

const Body = styled.p`
  ${text.bodyM}
  color: ${colors.white500};
  max-width: 34em;

  margin-bottom: 40px;
  ${media.desktop} {
    margin-bottom: 2.778vw;
  }
  ${media.mobile} {
    ${text.bodyS}
    margin-bottom: 8vw;
  }
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;

  gap: 40px;
  ${media.desktop} {
    gap: 2.778vw;
  }
  ${media.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: 6.667vw;
    width: 100%;
  }
`

const Links = styled.div`
  display: flex;
  align-items: center;

  gap: 32px;
  ${media.desktop} {
    gap: 2.222vw;
  }
  ${media.mobile} {
    gap: 6.667vw;
  }
`
