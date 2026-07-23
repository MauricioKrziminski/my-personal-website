import React from "react"

import styled from "styled-components"

import colors from "styles/colors"
import media from "styles/media"
import text from "styles/text"

// Served as a static file and used as an <img src>. Importing the .svg would
// give the SVGR React component (this port's default), not a URL string.
const ArrowSVG = "/images/global/linkArrow.svg"

type Props = {
  children: React.ReactNode
  href: string
}

export default function Social({ children, href }: Props) {
  return (
    <Wrapper href={href} target="_blank">
      <Text>
        {children}
        <Line />
      </Text>
      <Arrow src={ArrowSVG} alt="arrow" />
    </Wrapper>
  )
}

const Line = styled.div`
  background-color: ${colors.mainBlack};
  height: 1px;
  width: 0%;
  transition: 0.5s width;
`

const Arrow = styled.img<{ alt: string }>`
  transition: 0.5s transform;

  ${media.fullWidth} {
    width: 17px;
    height: 7px;
    margin-left: 10px;
  }

  ${media.desktop} {
    width: 1.18vw;
    height: 0.49vw;
    margin-left: 0.69vw;
  }

  ${media.tablet} {
    width: 1.66vw;
    height: 0.68vw;
    margin-left: 0.98vw;
  }

  ${media.mobile} {
    width: 4.53vw;
    height: 1.87vw;
    margin-left: 2.67vw;
  }
`

const Wrapper = styled.a`
  margin-top: 20px;
  display: flex;
  align-items: center;
  align-self: end;

  &:hover {
    ${Arrow} {
      transform: translateX(50%);
    }

    ${Line} {
      width: 100%;
    }
  }
`

const Text = styled.div`
  ${text.buttonMain}
  color: ${colors.mainBlack};
  cursor: pointer;
`
