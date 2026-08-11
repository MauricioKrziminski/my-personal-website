import React, { useContext, useEffect, useRef, useState } from "react"

import styled from "styled-components"

import { ScreenContext } from "components/Providers"
import colors from "styles/colors"
import media from "styles/media"
import text from "styles/text"
import useAnimation from "utils/useAnimation"

type MainTextProps = {
  stories: string[]
  timeline: gsap.core.Timeline | null
}

/**
 * takes a sentence and splits it into n parts
 * @param textToSplit - text to split
 * @param n - number of strings to split into
 * @returns - array of n strings, roughly the same length
 */
const splitLines = (textToSplit: string, numParts: number) => {
  const words = textToSplit.split(" ")
  const numWords = words.length
  const partSize = Math.ceil(numWords / numParts)
  const parts = []
  for (let i = 0; i < numParts; i += 1) {
    parts.push(words.slice(i * partSize, (i + 1) * partSize).join(" "))
  }

  if (parts[parts.length - 1] === "") {
    parts.pop()
    parts.unshift("")
  }

  return parts
}

export default function MainText({ stories, timeline }: MainTextProps) {
  const textRef = useRef<HTMLDivElement>(null)
  const { mobile } = useContext(ScreenContext)
  const [numLines, setNumLines] = useState(3)

  useEffect(() => {
    setNumLines(mobile ? 4 : 3)
  }, [mobile])

  useAnimation(() => {
    if (timeline) {
      const blinkies = textRef.current?.querySelectorAll(".blinky")

      stories.forEach((story, i) => {
        const lines = splitLines(story, numLines)
        lines.forEach((line, lineNumber) => {
          if (textRef.current && i !== 0) {
            const time = i - 0.5
            timeline
              .to(textRef.current.querySelectorAll(".line")[lineNumber], {
                  text: {
                    value: line.charAt(0),
                    rtl: true,
                  },
                  duration: 0.25,
                  delay: lineNumber * 0.1,
                }, time + 0.25)
              .to(textRef.current.querySelectorAll(".line")[lineNumber], {
                  text: {
                    value: line,
                  },
                  duration: 0.25,
                  delay: lineNumber * 0.1,
                }, time + 0.5)
              .to(textRef.current, {}, time + 1)
          }
        })
        if (blinkies) {
          timeline
            .set(blinkies, { opacity: 1 }, i + 0.25)
            .set(blinkies, { opacity: 0 }, i + 0.75 + numLines * 0.1)
        }
      })
    }
  }, [timeline, stories, numLines])

  return (
    <Wrapper>
      <div ref={textRef}>
        {splitLines(stories[0], numLines).map(line => (
          <Line key={line}>
            <Inner className="line">{line}</Inner>
            <Blinky className="blinky" />
          </Line>
        ))}
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  ${text.h5}
  position: relative;

  width: 800px;
  height: 215px;
  ${media.desktop} {
    width: 55.556vw;
    height: 14.931vw;
  }
  ${media.tablet} {
    position: absolute;
    top: 12.695vw;
    left: 4.883vw;
  }
  ${media.mobile} {
    ${text.h6};
    font-size: 9.9vw !important;
    order: -1;
  }
`

const Line = styled.div`
  line-height: 110%;
  display: flex;
  align-items: baseline;
  ${media.mobile} {
    height: 12.32vw;
  }
  will-change: contents;
`

const Inner = styled.div`
  white-space: nowrap;
  height: 100%;
  will-change: contents;

  &:empty {
    & ~ .blinky {
      display: none;
    }
  }
`

const Blinky = styled.div`
  background-color: ${colors.mainAccent};
  display: inline-block;
  width: 50px;
  height: 10px;
  opacity: 0;
  transform: translateY(10px);

  ${media.desktop} {
    width: 3.472vw;
    height: 0.694vw;
  }
  ${media.tablet} {
    width: 4.883vw;
    height: 0.977vw;
  }
  ${media.mobile} {
    width: 9.333vw;
    height: 1.333vw;
    transform: translateY(1.333vw);
  }
`
