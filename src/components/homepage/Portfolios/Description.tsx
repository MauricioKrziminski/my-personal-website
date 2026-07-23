import React from "react"

import styled from "styled-components"

import MainButton from "components/MainButton"
import media from "styles/media"
import text from "styles/text"
import UniversalLink from "utils/Loader/UniversalLink"
import { useT } from "utils/i18n/useT"

export default function Description() {
  const t = useT()
  return (
    <Wrapper>
      <Subtext>{t.featuredProjects.description}</Subtext>
      <UniversalLink to="/portfolio" transition="generic">
        <MainButton darkBackground>{t.common.viewProjects}</MainButton>
      </UniversalLink>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: start;

  gap: 20px;
  ${media.desktop} {
    gap: 1.389vw;
  }
  ${media.tablet} {
    margin-top: 1.465vw;
    flex-direction: row;
    justify-content: space-between;
  }
  ${media.mobile} {
  }
`

const Subtext = styled.p`
  ${text.bodyS}
  width: 50%;

  ${media.tablet} {
    ${text.bodyM}
    width: 34.96vw;
  }
  ${media.mobile} {
    width: 100%;
  }
`
