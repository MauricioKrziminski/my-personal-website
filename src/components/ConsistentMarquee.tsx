import React, { useEffect, useRef, useState } from "react"

import gsap from "gsap"
import styled from "styled-components"

import { addDebouncedEventListener } from "utils/functions"

type MarqueeProps = {
  children: React.ReactNode
  timing?: number
  className?: string
}

export default function Marquee({
  children,
  timing = 20,
  className = "",
}: MarqueeProps) {
  const marquee = useRef<HTMLDivElement>(null)
  const [array, setArray] = useState<undefined[]>([undefined])
  const hash = useRef(0)
  const offset = useRef(0)

  useEffect(() => {
    if (marquee.current && hash) {
      const first = marquee.current?.children[0]

      const width = first.clientWidth
      offset.current = Math.min(0, offset.current)
      gsap.set(marquee.current.children, {
        left: i => i * width + offset.current,
      })

      gsap.to(marquee.current, {})

      const tween = gsap.to(marquee.current.children, {
        duration: timing,
        ease: "none",
        left: `-=${width}`, // move each box 500px to right
        modifiers: {
          left: gsap.utils.unitize((x: number) => {
            if (x < -width) {
              return x + width * array.length
            }
            return x
          }),
        },
        onComplete: () => {
          tween.invalidate()
          tween.restart()
        },
      })

      return () => {
        if (first instanceof HTMLElement)
          offset.current = parseInt(first.style.left, 10)
      }
    }
    return () => {}
  }, [array, timing, hash])

  useEffect(() => {
    const update = () => {
      if (marquee.current) {
        const width = Math.max(
          ...Array.from(marquee.current.children).map(
            child => child.clientWidth
          )
        )

        // Before layout the children can measure 0 (or Math.max of nothing is
        // -Infinity), which would make Array(newNumber) a RangeError. Only
        // recompute once we have a real width, and clamp to a sane range.
        if (width > 0 && Number.isFinite(width)) {
          // number needed to fill width plus some buffer
          const newNumber = Math.min(
            200,
            Math.max(1, Math.ceil((window.innerWidth + 1500) / width) + 1)
          )
          setArray(Array(newNumber).fill(undefined))
        }
      }
      hash.current += 1
    }

    update()

    const elementsToObserve = marquee.current?.querySelectorAll("*") ?? []

    const observer = new ResizeObserver(update)
    elementsToObserve.forEach(element => {
      observer.observe(element)
    })
    const remove = addDebouncedEventListener(window, "resize", update)

    return () => {
      remove()
      observer.disconnect()
    }
  }, [children])

  return (
    <StyledMarquee ref={marquee} number={array.length} className={className}>
      {/* repeat children NUMBER times */}
      {array.map(() => {
        return <div key={Math.random()}>{children}</div>
      })}
    </StyledMarquee>
  )
}

const StyledMarquee = styled.div<{ number: number }>`
  position: relative;
  display: grid;
  grid-template-columns: repeat(${({ number }) => number}, max-content);

  // always have a width of 100vw by default
  width: 100vw;
  left: 50%;
  transform: translateX(-50%);

  & > div {
    white-space: pre;
    will-change: transform;
    position: absolute;
  }

  & > div:first-child {
    position: relative;
  }
`
