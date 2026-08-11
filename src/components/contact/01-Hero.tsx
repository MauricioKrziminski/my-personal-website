import React from "react"

import styled from "styled-components"

import colors from "styles/colors"
import media from "styles/media"
import text from "styles/text"
import { useT } from "utils/i18n/useT"

export default function Hero() {
  const t = useT()

  return (
    <Wrapper>
      <Inner id="contact-hero">
        <Title>{t.contactPage.title}</Title>
        <Text>{t.contactPage.description}</Text>
      </Inner>
    </Wrapper>
  )
}

/* Diferente do hero da Sobre, este não ocupa 100vh de propósito: numa página de
   contato o formulário precisa começar a aparecer sem exigir uma rolagem
   inteira. A altura vem do padding, então o bloco acompanha o tamanho do texto
   em cada idioma. */
const Wrapper = styled.section`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 220px 0 120px;
  ${media.desktop} {
    padding: 15.28vw 0 8.33vw;
  }
  ${media.tablet} {
    padding: 21.48vw 0 11.72vw;
  }
  ${media.mobile} {
    padding: 34.67vw 4vw 18.67vw;
  }
`

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  ${media.fullWidth} {
    width: 1075px;
  }
  ${media.desktop} {
    width: 74.65vw;
  }
  ${media.tablet} {
    width: 89.75vw;
  }
  ${media.mobile} {
    width: 92vw;
  }
`

const Title = styled.h1`
  ${text.h3}
  color: ${colors.mainWhite};

  /* os tokens h1..h6 usam line-height 100%, então a caixa tem exatamente a
     altura da fonte e a tinta das descidas fica abaixo dela. Sem folga aqui o
     "V" de "Vamos" passa, mas qualquer copy futura com g/j/p/q/y seria raspada
     por um overflow do pai. */
  padding-bottom: 0.06em;

  ${media.fullWidth} {
    margin-bottom: 30px;
    transform: translateX(-15px);
  }
  ${media.desktop} {
    margin-bottom: 2.08vw;
    transform: translateX(-1.04vw);
  }
  ${media.tablet} {
    margin-bottom: 2.93vw;
    transform: translateX(-1.46vw);
  }
  ${media.mobile} {
    ${text.h5}
    margin-bottom: 4vw;
    transform: translateX(-1.46vw);
  }
`

const Text = styled.p`
  ${text.bodyS}
  color: ${colors.mainWhite};

  ${media.fullWidth} {
    width: 620px;
  }
  ${media.desktop} {
    width: 43.06vw;
  }
  ${media.tablet} {
    ${text.bodyM}
    width: 60vw;
  }
  ${media.mobile} {
    width: 100%;
  }
`
