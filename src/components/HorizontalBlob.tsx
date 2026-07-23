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
  background,
  trigger,
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
          start: "0 1",
          end: `+=${window.innerHeight}`,
          scrub: true,
        },
      })

      wave.fromTo(wrapperEl, {
          clipPath:
            `path('` +
            `M ${wrapperWidth}, ${wrapperHeight}` +
            `C ${wrapperWidth} ${wrapperHeight * 0.6}, ` +
            `0 ${wrapperHeight * 0.65}, ` +
            `0 ${wrapperHeight * 0.5}` +
            `C 0 ${wrapperHeight * 0.35}, ` +
            `${wrapperWidth} ${wrapperHeight * 0.4}, ` +
            `${wrapperWidth} 0` +
            `Z` +
            `')`,
        },
        {
          duration: 1,
          clipPath:
            `path('` +
            `M ${wrapperWidth}, ${wrapperHeight}` +
            `C ${wrapperWidth} ${wrapperHeight * 0.6}, ` +
            `${wrapperWidth} ${wrapperHeight * 0.65}, ` +
            `${wrapperWidth} ${wrapperHeight * 0.5}` +
            `C ${wrapperWidth} ${wrapperHeight * 0.35}, ` +
            `${wrapperWidth} ${wrapperHeight * 0.4}, ` +
            `${wrapperWidth} 0` +
            `Z` +
            `')`,
        }, 0)

      if (innerEl) {
        wave.to(innerEl, {
            duration: 0.25,
            x: 50,
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
    <Wrapper ref={ref => setWrapperEl(ref)} background={background}>
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
  top: 50vh;
  transform: translate(-99%, -50%);
  left: 0;

  ${media.fullWidth} {
    height: 580px;
    width: 176px;
  }

  ${media.desktop} {
    height: 40.28vw;
    width: 12.22vw;
  }
`

const Inner = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  overflow: hidden;

  ${media.fullWidth} {
    left: 40px;
  }

  ${media.desktop} {
    left: 2.78vw;
  }
`

const Text = styled.p<{ color: string }>`
  ${text.sub2}
  color: ${props => props.color};
`

const Arrow = styled(ArrowSVG)`
  width: auto;

  ${media.fullWidth} {
    height: 10px;
    margin-left: 15px;
  }

  ${media.desktop} {
    height: 0.69vw;
    margin-left: 1.04vw;
  }
`
