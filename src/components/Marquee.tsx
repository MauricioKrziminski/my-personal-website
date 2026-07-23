import React from "react"

import styled, { keyframes } from "styled-components"

type MarqueeProps = {
  children: React.ReactNode
  timing?: number
}

export default function Marquee({ children, timing = 20 }: MarqueeProps) {
  return (
    <StyledMarquee timing={timing ?? 20}>
      <div>{children}</div>
      <div>{children}</div>
    </StyledMarquee>
  )
}

const marqueeEffect = keyframes`
  from {
    transform: translateX(0);
  }

  to {
    transform: translateX(-100%);
  }
`

const StyledMarquee = styled.div<{ timing: number }>`
  display: grid;
  grid-template-columns: repeat(2, max-content);
  & > div {
    white-space: pre;
    will-change: transform;
    animation: ${marqueeEffect} ${({ timing }) => timing}s linear infinite;
  }
`
