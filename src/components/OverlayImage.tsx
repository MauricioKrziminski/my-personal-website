import React from "react"

import type { StaticImageData } from "next/image"
import styled from "styled-components"

import halftone from "images/global/halftone-texture-small.webp"
import pixelated from "images/global/pixelated-texture-small.webp"

type OverlayImageProps = {
  type: "halftone" | "pixelated"
  src: string | StaticImageData
  loading?: "eager" | "lazy"
  alt: string
  width?: number
  height?: number
  className?: string
}

export default function OverlayImage({
  src,
  loading = "lazy",
  alt,
  width = undefined,
  height = undefined,
  type,
  className = "",
}: OverlayImageProps) {
  return (
    <Wrapper className={className}>
      <Image
        src={typeof src === "string" ? src : src.src}
        loading={loading}
        alt={alt}
        width={width}
        height={height}
      />
      <Overlay
        backgroundUrl={type === "pixelated" ? pixelated.src : halftone.src}
        backgroundSize={type === "pixelated" ? 156 : 17}
        opacity={type === "pixelated" ? 0.1 : 0.075}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  min-width: 100%;
  min-height: 100%;
`

const Image = styled.img<{ alt: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`

const Overlay = styled.div<{
  backgroundUrl: string
  backgroundSize: number
  opacity: number
}>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(${({ backgroundUrl }) => backgroundUrl}) repeat;
  background-size: ${({ backgroundSize }) => backgroundSize}px;
  opacity: ${({ opacity }) => opacity};
`
