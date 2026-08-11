import React, { useState } from "react"

import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import styled from "styled-components"

import { useIsSmooth } from "components/Scroll"
import ScrollInvite from "components/ScrollInvite"
import ExperienceDeck from "components/about/ExperienceDeck"
import colors from "styles/colors"
import media from "styles/media"
import text from "styles/text"
import { useT } from "utils/i18n/useT"
import useAnimation from "utils/useAnimation"

type Props = {
  team: Contentful.TeamMemberNodes
}

/**
 * Trajectory shown with the exact same pinned deck/carousel animation the office
 * (Porto Alegre) section had: static heading on the left, experience cards
 * sliding up through the center on the right as you scroll. Mirrors 03-Gallery;
 * the office photos are swapped for the ExperienceDeck of cards. Mobile degrades
 * to a simple stacked list.
 */
export default function Experiences({ team }: Props) {
  const [wrapperEl, setWrapperEl] = useState<HTMLElement | null>(null)
  const [tl, setTl] = useState<GSAPTimeline | null>(null)
  const isSmooth = useIsSmooth()
  const t = useT()

  useAnimation(() => {
    if (wrapperEl) {
      ScrollTrigger.create({
        pin: wrapperEl.children,
        trigger: wrapperEl,
        start: "top top",
        end: "bottom bottom",
        pinType: isSmooth ? "transform" : "fixed",
      })

      const newTl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperEl,
          start: "top top",
          end: "bottom bottom",
          scrub: 1,
        },
      })

      setTl(newTl)
    }
  }, [isSmooth, wrapperEl])

  return (
    <Wrapper id="about-experience" ref={ref => setWrapperEl(ref)} count={team.length}>
      <Inner>
        <Content>
          <Title>{t.aboutPage.experienceTitle}</Title>
          <Line />
          <Text>{t.aboutPage.experienceIntro}</Text>
        </Content>

        <InviteWrapper>
          <ScrollInvite />
        </InviteWrapper>

        <DeckWrapper>
          <ExperienceDeck team={team} timeline={tl} />
        </DeckWrapper>
      </Inner>
    </Wrapper>
  )
}

/* ---- desktop / tablet: mirrors 03-Gallery ---- */

const Wrapper = styled.section<{ count: number }>`
  position: relative;
  height: ${({ count }) => count * 100}vh;
  display: flex;
  align-items: start;
  justify-content: center;
  color: ${colors.mainBlack};
  z-index: 2;
`

const Inner = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  max-width: 1440px;
`

const Content = styled.div`
  position: absolute;
  z-index: 3;
  display: flex;
  flex-direction: column;
  top: 50%;
  transform: translateY(-50%);

  ${media.fullWidth} {
    width: 403px;
    left: 190px;
  }
  ${media.desktop} {
    width: 27.99vw;
    left: 13.19vw;
  }
  ${media.tablet} {
    width: 32vw;
    left: 5.371vw;
  }
  /* mobile: heading pinned at the top-center, the card deck plays below it
     (the desktop layout puts the heading on the left of the deck instead) */
  ${media.mobile} {
    top: 0;
    left: 0;
    transform: none;
    width: 100%;
    height: auto;
    align-items: center;
    text-align: center;
    padding-top: 16vw;
  }
`

const Title = styled.h2`
  ${text.h4}
  color: ${colors.mainBlack};

  ${media.fullWidth} {
    margin-bottom: 24px;
  }
  ${media.desktop} {
    margin-bottom: 1.667vw;
  }
  ${media.tablet} {
    ${text.h5}
    margin-bottom: 2.4vw;
  }
  ${media.mobile} {
    ${text.h6}
    text-align: center;
  }
`

const Line = styled.div`
  background-color: ${colors.mainAccent};

  ${media.fullWidth} {
    height: 4px;
    width: 64px;
    margin-bottom: 30px;
  }
  ${media.desktop} {
    height: 0.278vw;
    width: 4.444vw;
    margin-bottom: 2.08vw;
  }
  ${media.tablet} {
    height: 0.29vw;
    width: 4.88vw;
    margin-bottom: 2.4vw;
  }
  ${media.mobile} {
    height: 0.8vw;
    width: 13.33vw;
    margin-bottom: 4vw;
  }
`

const Text = styled.p`
  ${text.bodyS}
  color: ${colors.black300};

  ${media.fullWidth} {
    width: 340px;
  }
  ${media.desktop} {
    width: 24vw;
  }
  ${media.tablet} {
    ${text.bodyM}
    width: 30vw;
  }
  /* the intro paragraph is dropped on mobile so the deck has room; the heading
     alone carries the section, matching how tight mobile viewports handle it */
  ${media.mobile} {
    display: none;
  }
`

const InviteWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  ${media.fullWidth} {
    right: 725px;
  }
  ${media.desktop} {
    right: 50.35vw;
  }
  ${media.tablet} {
    left: 23.34vw;
  }
  ${media.mobile} {
    display: none;
  }
`

const DeckWrapper = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  ${media.fullWidth} {
    right: 325px;
  }
  ${media.desktop} {
    right: 22.57vw;
  }
  ${media.tablet} {
    left: 50%;
    transform: translate(-50%, -50%);
  }
  /* mobile: a CLIPPED viewport that starts below the pinned title and runs to
     the bottom. Cards are flex-centered inside it, and because it clips, a card
     rising/exiting upward simply disappears at this viewport's top edge instead
     of sliding behind (and peeking through the letters of) the section title. */
  ${media.mobile} {
    top: 24vh;
    height: 74vh;
    /* svh, not vh: on iOS Safari 100vh is the LARGE viewport (toolbars hidden),
       so a vh-based band runs underneath the browser UI and the bottom of the
       card (the end of the description) is cut off on a real phone. svh is the
       small viewport, i.e. what is actually visible with the toolbar showing.
       The vh pair above stays as the fallback for browsers without svh. */
    top: 24svh;
    height: 74svh;
    right: 0;
    bottom: auto;
    left: 0;
    transform: none;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
