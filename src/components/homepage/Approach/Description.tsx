import React from "react"

import styled from "styled-components"

import MainButton from "components/MainButton"
import media from "styles/media"
import text from "styles/text"
import { loadPage } from "utils/Loader/TransitionUtils"
import { useT } from "utils/i18n/useT"

export default function Description() {
  const t = useT()
  /* navega em vez de abrir o cliente de email: o mailto sumia sem aviso
     para quem usa webmail sem cliente configurado. loadPage (e nao um
     UniversalLink por fora) porque o MainButton ja e um <button>, e um
     <button> dentro de <a> e HTML invalido. */
  const handleClick = () => {
    loadPage("/contact", "generic").catch(console.error)
  }

  return (
    <Wrapper>
      <Subtext>{t.skills.description}</Subtext>

      <MainButton darkBackground={false} onClick={handleClick}>
        {t.skills.cta}
      </MainButton>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;
  z-index: 1; //below venn
  grid-area: desc;

  gap: 35px;
  ${media.desktop} {
    gap: 2.431vw;
  }
  ${media.tablet} {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    top: -8vw;
  }
  ${media.mobile} {
    gap: 5.333vw;
  }
`

const Subtext = styled.p`
  ${text.bodyS}
  width: 65%;

  ${media.tablet} {
    ${text.bodyM}
    width: 28vw;
  }

  ${media.mobile} {
    width: 98%;
  }
`
