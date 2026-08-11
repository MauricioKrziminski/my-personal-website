import React from "react"

import styled from "styled-components"

import colors from "styles/colors"
import media from "styles/media"
import text from "styles/text"

type Props = {
  active: boolean
  center: boolean
  onClick: VoidFunction
  name: string
}

export default function Box({ active, center, onClick, name }: Props) {
  return (
    <Wrapper onClick={onClick}>
      <Outer active={active} center={center}>
        <Flag>
          <Inner>{name}</Inner>
        </Flag>
      </Outer>
    </Wrapper>
  )
}

const Outer = styled.div<{ center: boolean; active: boolean }>`
  background-color: ${props =>
    props.center ? colors.mainAccent : colors.black600};
  transition: height 0.5s;

  ${media.fullWidth} {
    height: ${props => (props.active ? 14 : 3)}px;
  }

  ${media.desktop} {
    height: ${props => (props.active ? 0.97 : 0.21)}vw;
  }
`

const Flag = styled.div`
  position: absolute;
  z-index: 5;
  top: 50%;
  transform: translateY(-50%);
  transition: opacity 0.5s;
  opacity: 0;

  ${media.fullWidth} {
    min-height: 35px;
    right: 35px;
    min-width: 45px;
    padding: 7.5px 6px;
  }

  ${media.desktop} {
    min-height: 2.43vw;
    right: 2.43vw;
    min-width: 3.13vw;
    padding: 0.52vw 0.42vw;
  }
`

const Wrapper = styled.button`
  position: relative;
  width: 100%;
  cursor: pointer;
  height: auto;
  transition: height 0.5s;

  &:last-of-type {
    padding-bottom: 0px;
  }

  &:hover {
    ${Outer} {
      ${media.fullWidth} {
        height: 14px;
      }

      ${media.fullWidth} {
        height: 0.97vw;
      }
    }

    ${Flag} {
      opacity: 1;
    }
  }

  ${media.fullWidth} {
    padding-bottom: 4px;
  }

  ${media.desktop} {
    padding-bottom: 0.28vw;
  }
`

const Inner = styled.div`
  ${text.bodyXS}
  background-color: ${colors.black700};
  height: 100%;
  width: 100%;
  white-space: nowrap;
  color: ${colors.white300};

  ${media.fullWidth} {
    border-radius: 4px;
    padding: 7.5px 6px;
  }

  ${media.desktop} {
    border-radius: 0.28vw;
    padding: 0.52vw 0.42vw;
  }
`
