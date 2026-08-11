import React from "react"

import styled from "styled-components"

import ArrowLink from "components/ArrowLink"
import media from "styles/media"
import text from "styles/text"
import UniversalLink from "utils/Loader/UniversalLink"
import { useT } from "utils/i18n/useT"

type Props = {
  isDark: boolean
}

export default function FooterNav({ isDark }: Props) {
  const t = useT()
  return (
    <Wrapper>
      <UniversalLink to="/" transition="generic">
        <ArrowLink darkText={!isDark}>{t.nav.home}</ArrowLink>
      </UniversalLink>
      <UniversalLink to="/projects" transition="generic">
        <ArrowLink darkText={!isDark}>{t.nav.projects}</ArrowLink>
      </UniversalLink>
      <UniversalLink to="/about" transition="generic">
        <ArrowLink darkText={!isDark}>{t.nav.about}</ArrowLink>
      </UniversalLink>
      <UniversalLink to="/contact" transition="generic">
        <ArrowLink darkText={!isDark}>{t.nav.contact}</ArrowLink>
      </UniversalLink>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${text.sub2}

  display: grid;
  gap: 25px;

  ${media.mobile} {
    gap: 6.67vw;
  }
`
