import React from "react"

import styled from "styled-components"

import Marquee from "components/Marquee"
import colors from "styles/colors"
import media from "styles/media"
import text from "styles/text"
import { useT } from "utils/i18n/useT"

type Props = {
  darkText: boolean
}

export default function GetInTouch({ darkText }: Props) {
  const t = useT()
  return (
    <Marquee>
      <TouchInternal darkText={darkText}>
        {t.common.getInTouchTop}
        {/* explicit space: JSX trims the newline between the two words, which
            joined them ("FaleComigo") */}
        {" "}
        <span>{t.common.getInTouchBottom}</span>
      </TouchInternal>
    </Marquee>
  )
}

const TouchInternal = styled.div<{ darkText: boolean }>`
  ${text.d3Editorial}
  span {
    ${text.d3Mondwest}
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
     tinha o seu). */
  margin-bottom: -0.04em;
  ${media.desktop} {
    padding-left: 3.472vw;
  }
  ${media.tablet} {
    padding-left: 4.883vw;
  }
  ${media.mobile} {
    @media (max-height: 800px) {
      ${text.d4Editorial}
      span {
        ${text.d4Mondwest}
      }
    }
  }
`
