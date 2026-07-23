import React, { useMemo, useState } from "react"

import styled from "styled-components"

import OverlayImage from "components/OverlayImage"
import { vwToPx } from "utils/functions"
import useAnimation from "utils/useAnimation"

type MobilePicturesProps = {
  photos: string[]
  timeline: gsap.core.Timeline | null
  alts: string[]
}

export default function MobilePictures({
  photos,
  timeline,
  alts,
}: MobilePicturesProps) {
  const [wrapperEl, setWrapperEl] = useState<HTMLDivElement | null>(null)

  useAnimation(() => {
    if (wrapperEl && timeline) {
      timeline.time(0).clear()
      timeline.fromTo(wrapperEl, {
          x: 0,
        },
        {
          // width + margin-right * number of photos
          x: -vwToPx(54.67 + 2.67) * (photos.length - 1),
        }, 0)
    }
  }, [timeline, wrapperEl, photos])

  const images = useMemo(
    () =>
      photos.map((photo, index) => {
        return (
          <Image key={photo}>
            <OverlayImage
              type={index === 2 ? "pixelated" : "halftone"}
              loading="lazy"
              src={photo}
              alt={alts[index]}
            />
          </Image>
        )
      }),
    [alts, photos]
  )

  return <Wrapper ref={ref => setWrapperEl(ref)}>{images}</Wrapper>
}

const Image = styled.div`
  width: 54.67vw;
  height: 100%;
  transform: translateZ(0);
  filter: drop-shadow(0.27vw 1.6vw 8vw rgba(0, 0, 0, 0.25));
  border-radius: 2.13vw;
  margin-right: 2.67vw;
  max-width: none;
  overflow: hidden;

  & > div {
    min-width: 100%;
    max-width: none;
    height: 100%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  img {
    object-fit: cover;
    object-position: bottom center;
  }

  @supports (-webkit-touch-callout: none) {
    filter: none;
  }
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;
  height: 100%;
`
