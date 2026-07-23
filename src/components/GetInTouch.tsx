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
  margin-bottom: -25px;
  ${media.desktop} {
    padding-left: 3.472vw;
    margin-bottom: -1.736vw;
  }
  ${media.tablet} {
    padding-left: 4.883vw;
    margin-bottom: -2.441vw;
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
