import React from "react"

import styled, { keyframes } from "styled-components"

import linkArrowSVG from "images/global/linkArrow.svg"
import easing from "styles/easing"
import media from "styles/media"
import text from "styles/text"
import { useT } from "utils/i18n/useT"

export default function ScrollInvite() {
  const t = useT()
  return (
    <div>
      <Content>
        <Arrow />
        {t.common.scroll}
      </Content>
    </div>
  )
}

const uppyDowny = keyframes`
  0% {
    transform: rotate(-90deg) translateX(0);
  }
  50% {
    transform: rotate(-90deg) translateX(20px);
  }
  100% {
    transform: rotate(-90deg) translateX(0);
  }

`

const Content = styled.div`
  transform: rotate(-90deg);
  animation: ${uppyDowny} 3s ${easing.main} infinite;
  display: flex;
  align-items: center;
  ${text.sub2}

  width: 75px;
  ${media.desktop} {
    width: 5.208vw;
  }
  ${media.tablet} {
    width: 7.324vw;
  }
  ${media.mobile} {
    width: 20vw;
  }
`

const Arrow = styled(linkArrowSVG)`
  transform: rotate(180deg);
  height: 10px;
  margin-right: 15px;

  ${media.desktop} {
    height: 0.694vw;
    margin-right: 1.042vw;
  }
  ${media.tablet} {
    height: 0.977vw;
    margin-right: 1.465vw;
  }
  ${media.mobile} {
  }
`
