import React, { useMemo } from "react"

import styled from "styled-components"

import Card from "components/about/Card"
import Blob from "components/VerticalBlob"
import colors from "styles/colors"
import media from "styles/media"

type Props = {
  team: Contentful.TeamMemberNodes
}

export default function List({ team }: Props) {
  const cards = useMemo(
    () =>
      team.map(member => {
        return <Card key={member.name} member={member} />
      }),
    [team]
  )

  return (
    <Wrapper id="about-list">
      <Blob
        background={colors.backgroundWhite}
        trigger="#about-list"
        textColor={colors.mainBlack}
      />
      <Content>{cards}</Content>
    </Wrapper>
  )
}

const Wrapper = styled.section`
  /* ${colors.backgroundWhite} */
  min-height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.fullWidth} {
    padding: 210px 0px;
  }

  ${media.desktop} {
    padding: 14.58vw 0vw;
  }

  ${media.tablet} {
    padding: 26.86vw 0vw;
  }

  ${media.mobile} {
    padding: 40vw 0vw;
  }
`

const Content = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);

  ${media.fullWidth} {
    width: 1195px;
    gap: 20px;
  }

  ${media.desktop} {
    width: 82.99vw;
    gap: 1.39vw;
  }

  ${media.tablet} {
    grid-template-columns: repeat(2, 1fr);
    width: 77.15vw;
    gap: 1.95vw;
  }

  ${media.mobile} {
    grid-template-columns: repeat(1, 1fr);
    width: 92vw;
    gap: 5.33vw;
  }
`
