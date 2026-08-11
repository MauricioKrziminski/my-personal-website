import React from "react"

import styled from "styled-components"

import MainButton from "components/MainButton"
import media from "styles/media"
import text from "styles/text"
import UniversalLink from "utils/Loader/UniversalLink"
import { useT } from "utils/i18n/useT"

export default function ProjectsInvite() {
  const t = useT()
  return (
    <Wrapper>
      <Title>{t.storiesInvite.title}</Title>
      <Body>{t.storiesInvite.body}</Body>
      <UniversalLink to="/projects" transition="generic">
        <MainButton darkBackground>{t.common.viewProjects}</MainButton>
      </UniversalLink>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: absolute;
  display: grid;

  a {
    display: flex; //don't take up the whole width
  }

  left: 55px;
  bottom: 55px;
  width: 250px;
  grid-gap: 20px;
  ${media.desktop} {
    left: 3.819vw;
    bottom: 3.819vw;
    width: 17.361vw;
    grid-gap: 1.389vw;
  }
  ${media.tablet} {
    left: 4.883vw;
    bottom: 7.324vw;
    width: 25.391vw;
    grid-gap: 2.441vw;
  }
  ${media.mobile} {
    position: static;
    width: 92vw;
    margin-top: 10.667vw;
    /* no desktop e no tablet o respiro embaixo vem do position: absolute
       com bottom; aqui o bloco vira estatico e ficava colado no fim da
       secao, com o botao encostando na faixa seguinte */
    margin-bottom: 8vw;
  }
`

const Title = styled.h2`
  ${text.sub2}

  ${media.tablet} {
    ${text.sub1}
  }
`

const Body = styled.div`
  ${text.bodyXS}

  ${media.tablet} {
    ${text.bodyM}
  }
`
