import React from "react"

import styled from "styled-components"

const linkArrowSVG = "/images/global/linkArrow.svg"
import colors from "styles/colors"
import easing from "styles/easing"
import media from "styles/media"

type ArrowLinkProps = {
  children: string
  darkText?: boolean
}

// entirely visual, no link logic here. wrap with UniversalLink or anchor tag.

export default function ArrowLink({
  children,
  darkText = false,
}: ArrowLinkProps) {
  return (
    <Wrapper darkText={darkText}>
      <Line darkText={darkText}>{children}</Line>
      <Arrow>
        <img src={linkArrowSVG} alt="seta" />
      </Arrow>
    </Wrapper>
  )
}

const Line = styled.div<{ darkText?: boolean }>`
  position: relative;

  &:after {
    content: "";
    position: absolute;
    bottom: -1px;
    left: 0;
    width: 0;
    height: 1px;
    background-color: ${({ darkText }) =>
      darkText ? colors.mainBlack : colors.mainWhite};
    transition: width 0.4s ${easing.main};
  }
`

const Arrow = styled.div`
  overflow: hidden;
  margin-left: 10px;
  width: 17px;
  height: 8px;

  ${media.desktop} {
    margin-left: 0.694vw;
    width: 1.181vw;
    height: 0.556vw;
  }
  ${media.tablet} {
    margin-left: 0.977vw;
    width: 1.66vw;
    height: 0.781vw;
  }
  ${media.mobile} {
    margin-left: 2.667vw;
    width: 4.533vw;
    height: 2.133vw;
  }

  img {
    display: block;
    transform: translateX(-105%);
    transition: transform 0.4s ${easing.main};
  }
`

const Wrapper = styled.div<{ darkText?: boolean }>`
  display: flex;
  align-items: center;
  color: ${({ darkText }) => (darkText ? colors.mainBlack : colors.mainWhite)};

  &:hover {
    ${Arrow} {
      img {
        transform: translateX(0);
      }
    }

    ${Line} {
      &:after {
        width: 100%;
      }
    }
  }
`
