import React, { useContext, useRef } from "react"

import gsap from "gsap"
import styled from "styled-components"

import Marquee from "components/ConsistentMarquee"
import { ScreenContext } from "components/Providers"
import media from "styles/media"
import { getStats } from "utils/data"
import { useLang } from "utils/i18n/useT"
import useAnimation from "utils/useAnimation"

import SingleCard from "./SingleCard"

export default function Cards() {
  const wrapper = useRef<HTMLDivElement>(null)
  const { mobile } = useContext(ScreenContext)
  const { lang } = useLang()

  const cards = getStats(lang).map(node => ({
    stat: node.stat ?? "",
    subtext: node.statisticDescription ?? "",
  }))

  useAnimation(() => {
    if (wrapper.current) {
      gsap.to(wrapper.current.children, {
        x: -500,
        scrollTrigger: {
          trigger: wrapper.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
          refreshPriority: 10 - 6.5,
        },
      })
    }
  }, [])

  return (
    <Wrapper ref={wrapper}>
      <Marquee timing={20}>
        <CardsHolder>
          {cards.map(card => {
            return <SingleCard card={card} key={card.stat + card.subtext} />
          })}
        </CardsHolder>
        {mobile && (
          <OddHolder>
            {cards.map(card => {
              return <SingleCard card={card} key={card.stat + card.subtext} />
            })}
          </OddHolder>
        )}
      </Marquee>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding-bottom: 175px;
  ${media.desktop} {
    padding-bottom: 12.153vw;
  }
  ${media.tablet} {
    padding-bottom: 17.09vw;
  }
  ${media.mobile} {
    padding-bottom: 26.667vw;
  }
`

const CardsHolder = styled.div`
  display: flex;
`

const OddHolder = styled.div`
  display: flex;
  margin-top: 15px;
  & > div {
    transform: translateX(-50%);
  }
`
