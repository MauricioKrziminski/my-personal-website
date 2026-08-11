import React, { createRef } from "react"

import gsap from "gsap"
import styled from "styled-components"

import OverlayImage from "components/OverlayImage"
import media from "styles/media"
import getMedia from "utils/getMedia"
import useAnimation from "utils/useAnimation"

type DesktopPicturesProps = {
  photos: string[]
  alts: string[]
  timeline: gsap.core.Timeline | null
}

export default function DesktopPictures({
  photos,
  timeline,
  alts,
}: DesktopPicturesProps) {
  const photoRefs = photos.map(() => createRef<HTMLImageElement>())

  useAnimation(() => {
    const left = () => getMedia("70%", "140%", "65%", "")
    const top = () => getMedia("100%", "90%", "100%", "")

    if (timeline) {
      photoRefs.forEach((photo, i) => {
        if (photo.current) {
          const adjusted = i - 2

          // set up initial positions
          switch (i) {
            case 0:
              gsap.set(photo.current, {
                x: "0%",
                y: "0%",
              })
              break
            case 1:
              gsap.set(photo.current, {
                x: left,
                y: top,
                scale: 0.7,
                borderRadius: 14,
              })
              break
            default:
              gsap.set(photo.current, {
                x: left,
                y: "200%",
                scale: 0.7,
                borderRadius: 14,
              })
              break
          }

          // slide up into screen
          // only if not first two
          if (adjusted >= 0)
            timeline.to(photo.current, {
                y: top,
                duration: 1,
              }, adjusted)

          // slide to center
          // only if not first one
          if (adjusted + 1 >= 0)
            timeline
              .to(photo.current, {
                  y: "0%",
                  ease: "power1.inOut",
                  duration: 1,
                }, 1 + adjusted)
              .to(photo.current, {
                  x: "0%",
                  scale: 1,
                  borderRadius: 8,
                  ease: "power3.inOut",
                  duration: 1,
                }, 1 + adjusted)

          // slide to top
          // only if not last one
          if (i < photos.length - 1)
            timeline
              .to(photo.current, {
                  y: () => `-${top()}`,
                  ease: "power1.inOut",
                  duration: 1,
                }, 2 + adjusted)
              .to(photo.current, {
                  x: left,
                  scale: 0.6,
                  borderRadius: 14,
                  ease: "power3.inOut",
                  duration: 1,
                }, 2 + adjusted)

          // slide off top of screen
          // only if not the last two
          if (i < photos.length - 2)
            timeline.to(photo.current, {
                y: "-200%",
                duration: 1,
              }, 3 + adjusted)
        }
      })
    }
  }, [photoRefs, photos.length, timeline])

  return (
    <Wrapper>
      {photos.map((photo, i) => (
        <Image key={photo} ref={photoRefs[i]}>
          <OverlayImage
            loading="lazy"
            src={photo}
            alt={alts[i]}
          />
        </Image>
      ))}
    </Wrapper>
  )
}

const Wrapper = styled.div``

const Image = styled.div`
  overflow: hidden;

  &:not(:first-child) {
    position: absolute;
    top: 0;
    left: 0;
  }

  & > div {
    min-width: 100%;
    max-width: none;
    height: 100%;
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  ${media.fullWidth} {
    width: 400px;
    height: 600px;
    border-radius: 8px;
  }

  ${media.desktop} {
    width: 27.778vw;
    height: 41.667vw;
    border-radius: 0.556vw;
  }

  ${media.tablet} {
    width: 39.063vw;
    height: 58.594vw;
    border-radius: 0.781vw;
  }
`
