import React, { useMemo, useEffect, useState } from "react"

import gsap from "gsap"
import styled from "styled-components"

import media from "styles/media"
import { vwToPx } from "utils/functions"
import useMedia from "utils/useMedia"

import Box from "./Box"

type Props = {
  companies: Contentful.CompanyNodes
  active: number | null
  setActive: (arg0: number | null) => void
  center: number
}

const MAX_BOXES = 22

export default function SideNav({
  companies,
  active,
  setActive,
  center,
}: Props) {
  const [innerRef, setInnerRef] = useState<HTMLDivElement | null>(null)

  const boxClosedHeight = useMedia(7, vwToPx(0.49), 7, 7)
  const boxOpenHeight = useMedia(18, vwToPx(1.25), 18, 18)

  useEffect(() => {
    if (innerRef) {
      gsap.to(innerRef, {
        duration: 0.25,
        y: yIn => {
          let y = yIn
          const min = MAX_BOXES / 2
          const max = companies.length + 1 - MAX_BOXES / 2

          if (center < min) {
            y = 0
          } else if (center >= min && center <= max) {
            y = -(center - min) * boxClosedHeight
          } else if (center > max) {
            y = -(max - 1 - min) * boxClosedHeight

            if (active as number) {
              y -= boxOpenHeight
            }
          }
          return y
        },
      })
    }
  }, [center, active, innerRef, companies, boxClosedHeight, boxOpenHeight])

  const boxes = useMemo(
    () =>
      companies.map((item, index) => {
        return (
          <Box
            key={`${item.name ?? ""}${item.url ?? ""}`}
            active={active === index}
            center={center === index}
            onClick={() => setActive(index)}
            name={item.name ?? ""}
          />
        )
      }),
    [companies, active, center, setActive]
  )

  return (
    <Wrapper>
      <Inner ref={(ref: HTMLDivElement) => setInnerRef(ref)}>{boxes}</Inner>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  overflow-y: hidden;
  position: relative;
  width: 100%;
  height: 100%;
`

const Inner = styled.div`
  position: absolute;
  right: 0;
  display: flex;
  flex-direction: column;

  ${media.fullWidth} {
    width: 25px;
  }

  ${media.desktop} {
    width: 1.74vw;
  }
`
