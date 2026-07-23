import React from "react"

import styled from "styled-components"

import colors from "styles/colors"
import easing from "styles/easing"
import media from "styles/media"

type CandleStickProps = {
  isCloseButton?: boolean
}

export default function Candlestick({
  isCloseButton = false,
}: CandleStickProps) {
  return (
    <Group>
      <Candle isCloseButton={isCloseButton} />
      <Candle isCloseButton={isCloseButton} />
      <Candle isCloseButton={isCloseButton} />
    </Group>
  )
}

const Group = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 8px;
`

const Candle = styled.div<{ isCloseButton?: boolean }>`
  background-color: ${colors.mainGreen};
  transition: transform 0.3s ${easing.main};

  height: 25px;
  width: 3px;
  &:nth-child(2) {
    transform: translateY(4px);
  }
  &:nth-child(3) {
    transform: translateY(-7px);
  }

  ${media.desktop} {
    height: 25px;
    width: 3px;
    &:nth-child(2) {
      transform: translateY(4px);
    }
    &:nth-child(3) {
      transform: translateY(-7px);
    }
  }

  ${media.tablet} {
    height: 25px;
    width: 3px;
    &:nth-child(2) {
      transform: translateY(4px);
    }
    &:nth-child(3) {
      transform: translateY(-7px);
    }
  }

  ${media.mobile} {
    height: 25px;
    width: 3px;
    &:nth-child(2) {
      transform: translateY(4px);
    }
    &:nth-child(3) {
      transform: translateY(-7px);
    }
  }

  /* hover state is found in parent */
  ${props =>
    props.isCloseButton &&
    `
      // X mode
      &:nth-child(1) {
        transform: translate(11px, 0) rotate(45deg);
      }

      &:nth-child(2) {
        transform: translateY(0) rotate(45deg);
      }

      &:nth-child(3) {
        transform: translate(-11px, 0) rotate(-45deg);
      }
    `}
`
