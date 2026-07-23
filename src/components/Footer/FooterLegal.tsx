import React from "react"

import styled from "styled-components"

import colors from "styles/colors"
import media from "styles/media"
import text from "styles/text"
import { useT } from "utils/i18n/useT"

type Props = {
  isDark: boolean
}

export default function FooterLegal({ isDark }: Props) {
  const t = useT()
  return (
    <Wrapper isDark={isDark}>
      <Copy>{t.footer.legal}</Copy>
      <Addy>{t.footer.address}</Addy>
    </Wrapper>
  )
}

const Wrapper = styled.div<{ isDark: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${text.sub3}
  font-weight: 400;
  padding-top: 30px;
  border-top: 1px solid
    ${props => (props.isDark ? colors.black700 : colors.white500)};
  width: 100%;

  p,
  a {
    color: ${props => (props.isDark ? colors.black500 : colors.white700)};
  }

  ${media.mobile} {
    flex-direction: column;

    p,
    a {
      width: 100%;
      margin-bottom: 5.33vw;
      text-align: left;
    }
  }
`

const Copy = styled.p``

const Addy = styled.p``
