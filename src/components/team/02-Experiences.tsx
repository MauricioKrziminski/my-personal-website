import React, { useContext, useState } from "react"

import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import styled from "styled-components"

import { ScreenContext } from "components/Providers"
import { useIsSmooth } from "components/Scroll"
import ScrollInvite from "components/ScrollInvite"
import ExperienceDeck from "components/team/ExperienceDeck"
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
 * sliding up through the center on the right as you scroll. Mirrors 03-Office;
 * the office photos are swapped for the ExperienceDeck of cards. Mobile degrades
 * to a simple stacked list.
 */
export default function Experiences({ team }: Props) {
  const [wrapperEl, setWrapperEl] = useState<HTMLElement | null>(null)
  const [tl, setTl] = useState<GSAPTimeline | null>(null)
  const isSmooth = useIsSmooth()
  const { mobile } = useContext(ScreenContext)
  const t = useT()

  useAnimation(() => {
    if (wrapperEl && !mobile) {
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
  }, [isSmooth, wrapperEl, mobile])

  if (mobile) {
    return (
      <MobileOuter>
        <Header>
          <Title>{t.aboutPage.experienceTitle}</Title>
          <MobileBar />
        </Header>
        {team.map((entry, i) => (
          <MobileCard key={entry.name}>
            <Index>{String(i + 1).padStart(2, "0")}</Index>
            <MobileName>{entry.name}</MobileName>
            <MobilePeriod>{entry.title}</MobilePeriod>
            {!!entry.description?.description && (
              <MobileDesc>{entry.description.description}</MobileDesc>
            )}
          </MobileCard>
        ))}
      </MobileOuter>
    )
  }

  return (
    <Wrapper id="team-experience" ref={ref => setWrapperEl(ref)} count={team.length}>
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

/* ---- desktop / tablet: mirrors 03-Office ---- */

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
    ${text.h5}
  }
`

const Line = styled.div`
  background-color: ${colors.mainGreen};

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
`

/* ---- mobile: simple stacked list ---- */

const MobileOuter = styled.div`
  padding: 24vw 6.667vw 26.667vw;
`

const Header = styled.div`
  margin-bottom: 13.333vw;
`

const MobileBar = styled.span`
  display: block;
  background-color: ${colors.mainGreen};
  height: 1.067vw;
  width: 14vw;
  margin-top: 4vw;
`

const MobileCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 8vw;
  padding-bottom: 10.667vw;
  border-left: 2px solid rgba(0, 0, 0, 0.14);
`

const Index = styled.span`
  ${text.bodyXS}
  color: ${colors.green700};
  letter-spacing: 0.12em;
  margin-bottom: 3.2vw;
`

const MobileName = styled.h3`
  ${text.h6}
  color: ${colors.mainBlack};
  margin-bottom: 2.667vw;
`

const MobilePeriod = styled.span`
  ${text.bodyXS}
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${colors.green700};
  margin-bottom: 4vw;
`

const MobileDesc = styled.p`
  ${text.bodyS}
  color: ${colors.black300};
`
