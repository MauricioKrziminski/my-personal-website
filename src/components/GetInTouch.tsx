import React from "react"

import styled from "styled-components"

import Marquee from "components/Marquee"
import colors from "styles/colors"
import media from "styles/media"
import text from "styles/text"
import { Transitions } from "utils/Loader"
import UniversalLink from "utils/Loader/UniversalLink"
import { useT } from "utils/i18n/useT"

type Props = {
  darkText: boolean
  /**
   * No menu lateral a navegação precisa da transição "sideNav" para o
   * menu fechar junto. No rodapé é a transição normal de página.
   */
  transition?: Transitions
}

export default function GetInTouch({
  darkText,
  transition = "generic",
}: Props) {
  const t = useT()
  return (
    <TouchLink to="/contact" transition={transition}>
      <Marquee>
        <TouchInternal darkText={darkText}>
          {t.common.getInTouchTop}
          {/* explicit space: JSX trims the newline between the two words, which
              joined them ("FaleComigo") */}
          {" "}
          <span>{t.common.getInTouchBottom}</span>
        </TouchInternal>
      </Marquee>
    </TouchLink>
  )
}

/* o marquee era puramente decorativo: o maior CTA do site nao levava a
   lugar nenhum. display: block para o ancora nao virar uma linha inline
   dentro do Touch (que tem overflow: hidden) e mudar o corte do texto. */
const TouchLink = styled(UniversalLink)`
  display: block;
  cursor: pointer;
`

const TouchInternal = styled.div<{ darkText: boolean }>`
  ${text.d3Serif}
  span {
    ${text.d3Pixel}
  }

  color: ${props => (props.darkText ? colors.black700 : colors.white500)};
  opacity: 0.5;
  padding-left: 50px;
  /* o pai (Touch, no rodapé e no menu) tem overflow: hidden, então esta margem
     negativa define onde o texto é cortado. Com os -25px do port o corte caía na
     linha de base: em inglês ("Get in touch") não havia descida nenhuma, mas em
     português o "g" de "Comigo" ficava raspado. Valor em em (nada de crase aqui:
     ela encerraria o template literal do styled-components) para acompanhar a fonte
     em todos os breakpoints (antes eram três valores duplicados, e o mobile nem
     tinha o seu). Depois da troca de fontes o -0.04em deixava so ~2px de folga
     sob a descida da Instrument Serif, entao passou para -0.02em. */
  margin-bottom: -0.02em;
  ${media.desktop} {
    padding-left: 3.472vw;
  }
  ${media.tablet} {
    padding-left: 4.883vw;
  }
  ${media.mobile} {
    @media (max-height: 800px) {
      ${text.d4Serif}
      span {
        ${text.d4Pixel}
      }
    }
  }
`
