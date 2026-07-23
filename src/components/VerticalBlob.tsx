import React, { useEffect, useState } from "react"

import gsap from "gsap"
import styled from "styled-components"

import ArrowSVG from "images/global/linkArrow.svg"
import media from "styles/media"
import text from "styles/text"
import { addDebouncedEventListener } from "utils/functions"
import useAnimation from "utils/useAnimation"
import { useT } from "utils/i18n/useT"

type Props = {
  background: string
  trigger: string
  textColor?: string
}

export default function Blob({
  trigger,
  background,
  textColor = undefined,
}: Props) {
  const [wrapperEl, setWrapperEl] = useState<HTMLDivElement | null>(null)
  const t = useT()
  const [innerEl, setInnerEl] = useState<HTMLDivElement | null>(null)
  const [wrapperWidth, setWrapperWidth] = useState(176)
  const [wrapperHeight, setWrapperHeight] = useState(580)

  useAnimation(() => {
    if (wrapperEl) {
      const wave = gsap.timeline({
        scrollTrigger: {
          trigger,
          start: () => `-${window.innerHeight} 1`,
          end: () => `+=${window.innerHeight}`,
          scrub: true,
        },
      })

      wave.fromTo(wrapperEl, {
          clipPath:
            `path('` +
            `M 0, ${wrapperHeight}` +
            `C ${wrapperWidth * 0.35} ${wrapperHeight}, ` +
            `${wrapperWidth * 0.35} 0, ` +
            `${wrapperWidth * 0.5} 0` +
            `C ${wrapperWidth * 0.65} 0, ` +
            `${wrapperWidth * 0.65} ${wrapperHeight}, ` +
            `${wrapperWidth} ${wrapperHeight}` +
            `Z` +
            `')`,
        },
        {
          clipPath:
            `path('` +
            `M 0, ${wrapperHeight}` +
            `C ${wrapperWidth * 0.35} ${wrapperHeight}, ` +
            `${wrapperWidth * 0.35} ${wrapperHeight}, ` +
            `${wrapperWidth * 0.5} ${wrapperHeight}` +
            `C ${wrapperWidth * 0.65} ${wrapperHeight}, ` +
            `${wrapperWidth * 0.65} ${wrapperHeight}, ` +
            `${wrapperWidth} ${wrapperHeight}` +
            `Z` +
            `')`,
        })

      if (innerEl) {
        wave.to(innerEl, {
            duration: 0.25,
            y: 20,
          }, 0)

        wave.fromTo(innerEl.children, {
            x: 2,
          },
          {
            duration: 0.25,
            x: -100,
          }, 0)
      }
    }
  }, [wrapperEl, innerEl, wrapperWidth, wrapperHeight, trigger])

  useEffect(() => {
    if (wrapperEl) {
      const updateSize = () => {
        const rect = wrapperEl.getBoundingClientRect()
        setWrapperWidth(rect.width)
        setWrapperHeight(rect.height)
      }

      updateSize()

      const remove = addDebouncedEventListener(window, "resize", updateSize)

      return () => {
        remove()
      }
    }
  }, [wrapperEl])

  return (
    <Wrapper
      ref={(ref: HTMLDivElement) => setWrapperEl(ref)}
      background={background}
    >
      {!!textColor && (
        <Inner ref={ref => setInnerEl(ref)}>
          <Text color={textColor}>{t.common.scroll}</Text>
          <Arrow />
        </Inner>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div<{ background: string }>`
  position: absolute;
  ${props => props.background};
  top: 0;
  left: 50%;
  transform: translate(-50%, -99%);

  ${media.fullWidth} {
    width: 546px;
    height: 110px;
  }

  ${media.desktop} {
    width: 37.92vw;
    height: 7.64vw;
  }

  ${media.tablet} {
    height: 14.16vw;
    width: 74.02vw;
  }

  ${media.mobile} {
    display: none;
  }
`

const Inner = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: rotate(90deg) translate(-50%, -50%);
  transform-origin: 0 0;
  display: flex;
  align-items: center;
  overflow: hidden;
`

const Text = styled.p<{ color: string }>`
  ${text.sub2}
  color: ${props => props.color};
`

const Arrow = styled(ArrowSVG)`
  width: auto;

  ${media.fullWidth} {
    width: 23.53px;
    height: 10px;
    margin-left: 15px;
  }

  ${media.desktop} {
    width: 1.63vw;
    height: 0.69vw;
    margin-left: 1.04vw;
  }

  ${media.tablet} {
    width: 2.3vw;
    height: 0.98vw;
    margin-left: 1.46vw;
  }
`
