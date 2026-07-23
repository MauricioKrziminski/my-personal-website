import React from "react"

import styled, { keyframes } from "styled-components"

import Noise from "images/header/noise.webp"

export default function NoiseEl() {
  return (
    <NoiseWrapper>
      <NoiseAnimation />
    </NoiseWrapper>
  )
}

const grain = keyframes`
  0%, 100% {transform: translate(0,0)}
  10% {transform: translate(-5rem,-5rem)}
  30% {transform: translate(3rem,-8)} 
  50% {transform: translate(10rem,10rem)}
  70% {transform: translate(9rem,3rem)}
  90% {transform: translate(-1rem,7rem)}
`

const NoiseWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  opacity: 0.6;
`

const NoiseAnimation = styled.div`
  animation: ${grain} 0.3s steps(6) infinite;
  position: absolute;
  top: -10rem;
  left: -10rem;
  width: calc(100% + 20rem);
  height: calc(100% + 20rem);
  background-image: url(${Noise.src});
  background-size: 15%;
`
