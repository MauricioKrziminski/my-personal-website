import React, { createRef } from "react"

import gsap from "gsap"
import styled from "styled-components"

import colors from "styles/colors"
import media from "styles/media"
import text from "styles/text"
import getMedia from "utils/getMedia"
import useAnimation from "utils/useAnimation"

type Props = {
  team: Contentful.TeamMemberNodes
  timeline: gsap.core.Timeline | null
}

/**
 * Experience cards in the exact same deck/carousel motion the office photos had
 * (see components/Pictures/DesktopTablet): cards slide up from the bottom
 * through the center and off the top as you scroll the pinned section. The
 * animation logic is copied verbatim; only the rendered element is a card
 * instead of an image.
 */
export default function ExperienceDeck({ team, timeline }: Props) {
  const cardRefs = team.map(() => createRef<HTMLDivElement>())

  useAnimation(() => {
    // x-offset of the "waiting" cards to the side; smaller on mobile so the
    // stacked cards stay mostly on the narrow screen instead of flying off-edge
    const left = () => getMedia("70%", "140%", "65%", "22%")
    const top = () => getMedia("100%", "90%", "100%", "100%")

    if (timeline) {
      cardRefs.forEach((card, i) => {
        if (card.current) {
          const adjusted = i - 2

          switch (i) {
            case 0:
              gsap.set(card.current, { x: "0%", y: "0%" })
              break
            case 1:
              gsap.set(card.current, {
                x: left,
                y: top,
                scale: 0.7,
                borderRadius: 14,
              })
              break
            default:
              gsap.set(card.current, {
                x: left,
                y: "200%",
                scale: 0.7,
                borderRadius: 14,
              })
              break
          }

          if (adjusted >= 0)
            timeline.to(card.current, { y: top, duration: 1 }, adjusted)

          if (adjusted + 1 >= 0)
            timeline
              .to(card.current, {
                  y: "0%",
                  ease: "power1.inOut",
                  duration: 1,
                }, 1 + adjusted)
              .to(card.current, {
                  x: "0%",
                  scale: 1,
                  borderRadius: 8,
                  ease: "power3.inOut",
                  duration: 1,
                }, 1 + adjusted)

          if (i < team.length - 1)
            timeline
              .to(card.current, {
                  y: () => `-${top()}`,
                  ease: "power1.inOut",
                  duration: 1,
                }, 2 + adjusted)
              .to(card.current, {
                  x: left,
                  scale: 0.6,
                  borderRadius: 14,
                  ease: "power3.inOut",
                  duration: 1,
                }, 2 + adjusted)

          if (i < team.length - 2)
            timeline.to(card.current, { y: "-200%", duration: 1 }, 3 + adjusted)
        }
      })
    }
  }, [cardRefs, team.length, timeline])

  return (
    <Wrapper>
      {team.map((entry, i) => (
        <CardEl key={entry.name} ref={cardRefs[i]}>
          <Index>{String(i + 1).padStart(2, "0")}</Index>

          {!!entry.logo && (
            <LogoArea>
              <LogoChip>
                <img src={entry.logo} alt={`${entry.name ?? "logo"}`} />
              </LogoChip>
            </LogoArea>
          )}

          <Bottom>
            <Name>{entry.name}</Name>
            <Period>{entry.title}</Period>
            {!!entry.description?.description && (
              <Desc>{entry.description.description}</Desc>
            )}
          </Bottom>
          <BottomBar />
        </CardEl>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  /* on mobile the DeckWrapper is a flex-centered clipping viewport; make this
     inner wrapper the positioning context so the absolutely-stacked cards
     anchor to the (centered) first card rather than the viewport's top-left */
  ${media.mobile} {
    position: relative;
  }
`

const CardEl = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.06);
  box-shadow: 0 24px 60px rgba(0, 0, 0, 0.16);
  position: relative;

  &:not(:first-child) {
    position: absolute;
    top: 0;
    left: 0;
  }

  ${media.fullWidth} {
    width: 400px;
    height: 600px;
    border-radius: 8px;
    padding: 44px 40px;
  }
  ${media.desktop} {
    width: 27.778vw;
    height: 41.667vw;
    border-radius: 0.556vw;
    padding: 3.056vw 2.778vw;
  }
  ${media.tablet} {
    width: 39.063vw;
    height: 58.594vw;
    border-radius: 0.781vw;
    padding: 4.395vw 3.906vw;
  }
  ${media.mobile} {
    width: 80vw;
    height: 62vh;
    border-radius: 2.13vw;
    padding: 8vw 7vw;
  }
`

const Index = styled.span`
  ${text.bodyXS}
  color: ${colors.green700};
  letter-spacing: 0.12em;
`

/* fills the space between the index and the bottom content, logo centered */
const LogoArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 28px 0;
  ${media.desktop} {
    padding: 1.944vw 0;
  }
`

/* every logo is a rounded chip with its own background, filled edge-to-edge */
const LogoChip = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid rgba(0, 0, 0, 0.08);

  width: 232px;
  height: 142px;
  ${media.desktop} {
    width: 16.111vw;
    height: 9.861vw;
    border-radius: 0.833vw;
  }
  ${media.tablet} {
    width: 22.656vw;
    height: 13.867vw;
    border-radius: 1.172vw;
  }
  ${media.mobile} {
    width: 52vw;
    height: 32vw;
    border-radius: 2.13vw;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
    display: block;
  }
`

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
`

const Name = styled.h3`
  ${text.h5}
  color: ${colors.mainBlack};

  margin-bottom: 14px;
  ${media.desktop} {
    margin-bottom: 0.972vw;
  }
  /* h5 (19vw on mobile) is huge inside an 80vw card, shrink it to card scale */
  ${media.mobile} {
    font-size: 6.9vw;
    margin-bottom: 2.4vw;
  }
`

const Period = styled.span`
  ${text.bodyXS}
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${colors.green700};

  margin-bottom: 24px;
  ${media.desktop} {
    margin-bottom: 1.667vw;
  }
`

const Desc = styled.p`
  ${text.bodyS}
  color: ${colors.black300};
`

const BottomBar = styled.span`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 6px;
  background-color: ${colors.mainGreen};

  ${media.desktop} {
    height: 0.417vw;
  }
`
