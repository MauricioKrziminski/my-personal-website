import React, { useContext, useEffect, useRef } from "react"

import styled from "styled-components"

import colors from "styles/colors"

import { BackgroundContext } from "./Providers"
import { useIsSmooth } from "./Scroll"

type SectionProps = {
  children: React.ReactNode
  isDark?: boolean
  noTopWave?: boolean
  noBottomWave?: boolean
}

export default function Section({
  children,
  isDark = false,
  noTopWave = false,
  noBottomWave = false,
}: SectionProps) {
  const wrapper = useRef<HTMLDivElement>(null)

  const { addBackgroundSection } = useContext(BackgroundContext)

  useEffect(() => {
    if (wrapper.current && addBackgroundSection) {
      const killSection = addBackgroundSection(wrapper.current)

      return () => {
        killSection()
      }
    }
  }, [addBackgroundSection])

  const useWave = useIsSmooth()

  return (
    <Wrapper
      isDark={isDark ?? false}
      ref={wrapper}
      data-no-top={noTopWave}
      data-no-bottom={noBottomWave}
      data-is-dark={isDark}
    >
      <ColorReference isDark={isDark ?? false} useWave={useWave} />
      {children}
    </Wrapper>
  )
}

const Wrapper = styled.div<{ isDark: boolean }>`
  position: relative;
  color: ${props => (props.isDark ? colors.mainWhite : colors.mainBlack)};
  z-index: 1;
`

const ColorReference = styled.div<{ isDark: boolean; useWave: boolean }>`
  z-index: -1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: ${({ isDark }) => (isDark ? "black" : "white")};
  ${({ isDark }) => (isDark ? colors.backgroundBlack : colors.backgroundWhite)};
  opacity: ${({ useWave }) => (useWave ? "0" : "1")};
`
