import React, { useEffect, useRef, useState } from "react"

import gsap from "gsap"
import styled from "styled-components"

const linkArrowSVG = "/images/global/linkArrow.svg"
import colors from "styles/colors"
import easing from "styles/easing"
import media from "styles/media"
import text from "styles/text"
import { addDebouncedEventListener } from "utils/functions"
import useAnimation from "utils/useAnimation"

type Props = {
  isDark: boolean
  parent: HTMLElement | null
}

export default function FooterBlob({ isDark, parent }: Props) {
  const wrapper = useRef<HTMLDivElement>(null)
  const [arrowEl, setArrowEl] = useState<HTMLImageElement | null>(null)
  const [textEl, setTextEl] = useState<HTMLParagraphElement | null>(null)
  const [wrapperWidth, setWrapperWidth] = useState(425)
  const [wrapperHeight, setWrapperHeight] = useState(112)

  useAnimation(() => {
    if (parent) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: parent,
          start: "bottom bottom+=40%",
          toggleActions: "play none none reverse",
          refreshPriority: 0,
        },
      })

      tl.fromTo(wrapper.current, {
          clipPath:
            `path('M0, ${wrapperHeight} ` +
            // left half of curve
            `C${wrapperWidth * 0.35}, ${wrapperHeight} ` +
            `${wrapperWidth * 0.35}, ${wrapperHeight} ` +
            `${wrapperWidth * 0.5}, ${wrapperHeight} ` +
            // right half of curve
            `C${wrapperWidth * 0.65}, ${wrapperHeight} ` +
            `${wrapperWidth * 0.65}, ${wrapperHeight} ` +
            `${wrapperWidth}, ${wrapperHeight} ` +
            `Z')`,
        },
        {
          duration: 0.5,
          clipPath:
            `path('M0, ${wrapperHeight} ` +
            // left half of curve
            `C${wrapperWidth * 0.35}, ${wrapperHeight} ` +
            `${wrapperWidth * 0.35}, 0 ` +
            `${wrapperWidth * 0.5}, 0 ` +
            // right half of curve
            `C${wrapperWidth * 0.65}, 0 ` +
            `${wrapperWidth * 0.65}, ${wrapperHeight} ` +
            `${wrapperWidth}, ${wrapperHeight} ` +
            `Z')`,
        }, 0)

      tl.fromTo(arrowEl, {
          x: -100,
        },
        {
          x: 0,
        }, 0)

      tl.fromTo(textEl, {
          y: "150%",
        },
        {
          y: 0,
        }, 0)
    }
  }, [parent, wrapperWidth, wrapperHeight, arrowEl, textEl])

  useEffect(() => {
    const updateSize = () => {
      if (wrapper.current) {
        setWrapperWidth(wrapper.current?.offsetWidth)
        setWrapperHeight(wrapper.current?.offsetHeight)
      }
    }

    updateSize()
    const remove = addDebouncedEventListener(window, "resize", updateSize)

    return () => {
      remove()
    }
  }, [])

  return (
    <Wrapper
      onClick={() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        })
      }}
    >
      <ArrowWrapper>
        <Arrow
          ref={ref => setArrowEl(ref)}
          src={linkArrowSVG}
          alt="a green arrow"
        />
      </ArrowWrapper>
      <Inner ref={wrapper} isDark={isDark} />
      <TextWrapper>
        <Text ref={ref => setTextEl(ref)} isDark={isDark}>
          Top of Page
        </Text>
      </TextWrapper>
    </Wrapper>
  )
}

const Inner = styled.div<{ isDark: boolean }>`
  position: relative;
  display: grid;
  place-items: center;
  ${props => (props.isDark ? colors.backgroundBlack : colors.backgroundWhite)};
  width: 100%;
  height: 100%;
  transition: transform 0.5s ${easing.main};
  transform-origin: bottom;
`

const Wrapper = styled.button`
  cursor: pointer;
  position: absolute;
  z-index: 3;
  top: 0;
  transform: translateY(calc(-100% + 2px));
  display: grid;
  place-items: center;

  &:hover {
    ${Inner} {
      transform: scaleY(1.2);
      transform-origin: bottom;
    }
  }

  ${media.fullWidth} {
    width: 425px;
    height: 78px;
    right: 40px;
  }

  ${media.desktop} {
    width: 29.514vw;
    height: 5.417vw;
    right: 2.778vw;
  }

  ${media.tablet} {
    width: 41.504vw;
    height: 7.617vw;
    right: 1.953vw;
  }

  ${media.mobile} {
    right: 50%;
    width: 64vw;
    height: 12vw;
    transform: translate(50%, -99%);
  }
`

const ArrowWrapper = styled.div`
  overflow: hidden;
  transform: rotate(-90deg) translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform-origin: 0% 0%;
`

const Arrow = styled.img<{ alt: string }>`
  ${media.fullWidth} {
    width: 35px;
  }

  ${media.desktop} {
    width: 2.43vw;
  }

  ${media.tablet} {
    width: 35px;
  }

  ${media.mobile} {
    width: 6.67vw;
  }
`

const TextWrapper = styled.div`
  color: white;
  position: absolute;
  overflow: hidden;
  z-index: 20;
  left: 50%;
  transform: translateX(-50%);

  ${media.fullWidth} {
    width: 94px;
    height: 23px;
    top: -36px;
  }

  ${media.desktop} {
    width: 6.53vw;
    height: 1.6vw;
    top: -2.5vw;
  }

  ${media.tablet} {
    width: 9.5vw;
    height: 1.76vw;
    top: -3.13vw;
  }

  ${media.mobile} {
    width: 25.5vw;
    height: 4.8vw;
    top: -7.73vw;
  }
`

const Text = styled.p<{ isDark: boolean }>`
  ${text.sub2}
  color: ${props => (props.isDark ? colors.mainBlack : colors.mainWhite)};
`
