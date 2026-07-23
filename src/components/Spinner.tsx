import React from "react"

import styled, { keyframes } from "styled-components"

import colors from "styles/colors"

export default function Spinner() {
  return (
    <Wrapper>
      <Bar timing={1} />
      <Bar timing={2} />
      <Bar timing={1.5} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  width: 60px;
  height: 150px;
  display: flex;
  justify-content: space-between;
`

const bounce = keyframes`
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(52px)
  }
  100% {
    transform: translateY(0);
  }
`

const Bar = styled.div<{ timing: number }>`
  background-color: ${colors.mainGreen};
  width: 8px;
  height: 68px;
  animation: ${bounce} ${({ timing }) => timing}s ease-in-out infinite;
  transform-origin: bottom;
`
