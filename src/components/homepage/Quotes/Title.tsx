import React, { RefObject, useRef } from "react"

import SplitText from "gsap/SplitText"
import styled from "styled-components"

import WaveArrowSVG from "images/quotes/waveArrows.svg"
import media from "styles/media"
import text from "styles/text"
import distributeByPosition from "utils/distributeByPosition"
import { useT } from "utils/i18n/useT"
import useAnimation from "utils/useAnimation"

type TitleProps = {
  timeline: gsap.core.Timeline | null
  clipper: RefObject<HTMLDivElement>
}

export default function Title({ timeline, clipper }: TitleProps) {
  const currentSplit = useRef<SplitText | undefined>(undefined)
  const t = useT()

  const updateSplit = () => {
    const initTimeline = () => {
      if (timeline && currentSplit.current) {
        timeline.clear()

        timeline
          .fromTo(currentSplit.current.chars, {
              opacity: 0,
            },
            {
              opacity: 1,
              stagger: distributeByPosition({
                from: "start",
                axis: "x",
                amount: 1,
              }),
              duration: 0.001, // almost zero, but not zero
            }, 1.05)
          .fromTo(clipper.current, {
              height: 0,
            },
            {
              height: "auto",
              duration: 1,
            }, 0)
          .fromTo(clipper.current, {
              width: 0,
            },
            {
              width: "auto",
              duration: 1,
              // ease: "power1.out",
            }, 1)
      }
    }

    // Bail until the ref is attached. gsap 3.13's SplitText also requires a
    // config object — it dereferences `config.overwrite` with no null-check, so
    // the original `new SplitText(el)` (valid in older versions) now throws.
    // We split into chars because the entrance timeline staggers `.chars`, but
    // we ALSO split into words so each word gets an inline-block wrapper: with
    // chars-only, the browser can wrap between any two char spans, which broke
    // longer PT words mid-word (e.g. "i / deias"). Word wrappers keep each word
    // intact and only allow breaks at spaces.
    if (!clipper.current) return

    const newSplit = new SplitText(clipper.current, { type: "words, chars" })
    if (newSplit) {
      currentSplit.current = newSplit
      initTimeline()
    }
  }

  useAnimation(updateSplit, [clipper, timeline])

  return (
    <Wrapper>
      <Before />
      <Clipper ref={clipper}>
        <Text>
          {t.quotes.titleA}
          <MobileHidden>{t.quotes.titleHyphen}</MobileHidden>
          {t.quotes.titleB}
        </Text>
      </Clipper>
      <After />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;

  ${media.mobile} {
    /* just center the tagline in the viewport; the old 200vw + translateX hack
       (needed to fit the flanking wave arrows in a row) pushed the text off the
       right edge and clipped words. The arrows are hidden on mobile below. */
    width: 100vw;
  }
`

const Before = styled(WaveArrowSVG)`
  align-self: start;

  margin: 32px 20px;
  height: 71px;
  ${media.desktop} {
    margin: 2.222vw 1.389vw;
    height: 4.931vw;
  }
  ${media.tablet} {
    height: 5.273vw;
    margin: 3.1vw 1.953vw;
  }
  ${media.mobile} {
    /* decorative flourish only: hiding it on mobile lets the tagline use the
       full centered width instead of being squeezed/clipped between the arrows */
    display: none;
  }
`

const Clipper = styled.div`
  ${media.mobile} {
    width: 92vw;
  }
  will-change: width, height;
`

const Text = styled.h2`
  ${text.h4}

  padding: 20px 0;
  /* center each line within the box — the box is centered in the viewport, but
     left-aligned text made the shorter lines look pushed to the left */
  text-align: center;
  /* wider box so the longer personal tagline wraps to ~3 lines instead of 5
     (reads more horizontal); the original firm copy was shorter */
  width: 1050px;
  ${media.desktop} {
    padding: 1.389vw 0;
    width: 66vw;
  }
  ${media.tablet} {
    ${text.h5}
    width: 58.691vw;
  }
  ${media.mobile} {
    width: 81.333vw;
    ${text.h6}
  }
`

const MobileHidden = styled.span`
  ${media.mobile} {
    display: none;
  }
`

const After = styled(Before)`
  transform: rotate(180deg);
  align-self: flex-end;
`
