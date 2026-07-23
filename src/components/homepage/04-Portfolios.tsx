import React from "react"

import styled from "styled-components"

import media from "styles/media"
import text from "styles/text"
import { useT } from "utils/i18n/useT"

import Description from "./Portfolios/Description"
import PortfolioCard from "./Portfolios/PortfolioCard"

type Props = {
  featuredOne: Queries.FeaturedCompanyFragment
  featuredTwo: Queries.FeaturedCompanyFragment
  featuredThree: Queries.FeaturedCompanyFragment
}

export default function HomepagePortfolios({
  featuredOne,
  featuredTwo,
  featuredThree,
}: Props) {
  const t = useT()
  return (
    <Outer>
      <Wrapper>
        <Title>
          {t.featuredProjects.titleOne}
          <br />
          {t.featuredProjects.titleTwo}
          <br />
          {t.featuredProjects.titleThree}
        </Title>
        <Description />
        <Portfolios>
          <PortfolioCard company={featuredOne} number={1} />
          <PortfolioCard company={featuredTwo} number={2} />
          <PortfolioCard company={featuredThree} number={3} />
        </Portfolios>
      </Wrapper>
    </Outer>
  )
}

const Outer = styled.div`
  display: grid;
  place-items: center;
  min-height: 100vh;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: start;

  padding: 130px 190px;
  gap: 20px 35px;
  max-width: 1440px;
  grid-template-areas: "title cards" "description cards";
  ${media.desktop} {
    padding: 9.028vw 13.194vw;
    gap: 1.389vw 2.431vw;
  }
  ${media.tablet} {
    grid-template-areas: "title" "cards" "description";
    grid-template-columns: 1fr;
    grid-gap: 12.695vw;
    padding: 12.891vw 4.883vw 5.859vw;
  }
  ${media.mobile} {
    grid-template-areas: "title" "cards" "description";
    grid-template-columns: 1fr;
    grid-gap: 13.867vw;
    padding: 20.8vw 4vw 10.667vw;
  }
`

const Title = styled.h2`
  ${text.h5}
  grid-area: title;
  align-self: end;

  ${media.tablet} {
    width: 79.004vw;
  }
  ${media.mobile} {
    ${text.h6}
  }
`

const Portfolios = styled.div`
  display: grid;
  grid-area: cards;

  gap: 15px;
  ${media.desktop} {
    gap: 1.042vw;
  }
  ${media.tablet} {
    gap: 1.465vw;
  }
  ${media.mobile} {
    gap: 2.667vw;
  }
`
