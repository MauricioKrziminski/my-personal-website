/* eslint-disable */

import React, { useCallback, useContext, useEffect, useRef } from "react"

import { useLocation } from "utils/useLocation"
import { ScrollSmoother } from "gsap/ScrollSmoother"
import styled from "styled-components"

import { BackgroundContext, ScreenContext } from "components/Providers"
import blackBG from "images/global/Black-Background-Tile-2x.webp"
import whiteBG from "images/global/White-Background-Tile-2x.webp"
import { clamp, vwToPx } from "utils/functions"
import { pageReady } from "utils/pageReady"
import useMedia from "utils/useMedia"

import { useIsSmooth } from "./Scroll"
import loader from "utils/Loader"

const RENDER_BUFFER = 100

const boundsOnscreen = (top: number, bottom: number) => {
  return top < window.innerHeight + RENDER_BUFFER && bottom > -RENDER_BUFFER
}

const getDesiredCanvasHeight = () => {
  const windowHeight = Math.max(window.innerHeight, window.outerHeight)
  // we don't want the canvas to resize when scrolling on mobile
  // sometimes on mobile outerHeight matches innerHeight, so in that case we use screen height instead
  // overestimating is fine
  return screen.height < windowHeight + 200
    ? Math.max(windowHeight, screen.height)
    : windowHeight
}

const blobOffscreen = (offset: number, blobHeight: number) => {
  // if blobHeight is negative, compensate for it
  const compensation = blobHeight < 0 ? Math.abs(blobHeight) : 0

  // determine if the DOMRect is on the screen
  return !boundsOnscreen(offset - compensation, Math.abs(blobHeight))
}

export type BackgroundKiller = () => void

interface Section {
  element: HTMLElement
  /**
   * distance from the top of the element to the top of the screen
   */
  topOffset: number
  /**
   * height of the element
   */
  height: number
}

type Props = {
  position?: string
}

export default function BackgroundCanvas({ position }: Props) {
  const MAX_HEIGHT = useMedia(300, 300, 200, 75)
  const canvasEl = useRef<HTMLCanvasElement>(null)

  // All of the canvas's mutable state has to persist across renders (and
  // survive React StrictMode's mount/unmount/remount in dev). As plain locals
  // it was recreated on every render, so the scroll/resize listeners and the
  // addBackgroundSection callback registered in effects closed over stale,
  // empty copies of `sections`/`ctx`/`canvas` — the canvas never painted.
  const st = useRef({
    sections: {} as { [key: string]: Section },
    canvas: null as HTMLCanvasElement | null,
    darkBackground: null as CanvasPattern | null | undefined,
    lightBackground: null as CanvasPattern | null | undefined,
    idCounter: 0,
    blobHeight: 0,
    ctx: null as CanvasRenderingContext2D | null,
    lastScrollTop: undefined as number | undefined,
    totalOffset: 0,
  }).current

  const usingWave = useIsSmooth()

  const location = useLocation()
  const { mobile } = useContext(ScreenContext)
  const { setAddBackgroundSection } = useContext(BackgroundContext)

  // Stable registration callback. Each <Section> registers itself once (on
  // mount) and removes itself on unmount via the returned killer — so the
  // registry survives every re-init of the canvas. (The old version returned a
  // no-op killer and instead wiped the whole registry on every init(), which
  // raced with re-registration and randomly left the canvas blank.)
  const addBackgroundSection = useCallback(
    (element?: HTMLElement): BackgroundKiller => {
      if (element && typeof element.getBoundingClientRect === "function") {
        st.idCounter++
        const id = st.idCounter

        st.sections[id] = {
          element,
          height: element.clientHeight,
          topOffset: element.getBoundingClientRect().top,
        }

        return () => {
          delete st.sections[id]
        }
      }

      return () => {}
    },
    [st]
  )

  // Publish the (stable) registration callback into context exactly once, and
  // withdraw it on unmount. Sections react to its identity to (de)register.
  useEffect(() => {
    setAddBackgroundSection(() => addBackgroundSection)
    return () => {
      setAddBackgroundSection(() => undefined)
    }
  }, [addBackgroundSection, setAddBackgroundSection])

  const updateBlobs = () => {
    updateScroll()

    const smoother = ScrollSmoother.get()
    if (!smoother) return
    // prevent errored values
    if (Math.abs(smoother.getVelocity()) < 10000)
      st.blobHeight -= smoother.getVelocity() * 0.01
    st.blobHeight *= 0.9
    st.blobHeight = Math.round(st.blobHeight)
    st.blobHeight = clamp(st.blobHeight, -MAX_HEIGHT, MAX_HEIGHT)

    const ctx = st.ctx
    if (!ctx) return
    if (!st.canvas) return

    st.darkBackground?.setTransform(
      new DOMMatrix().translate(0, -smoother.scrollTop()).scale(0.5)
    )
    st.lightBackground?.setTransform(
      new DOMMatrix().translate(0, -smoother.scrollTop()).scale(0.75)
    )

    // iterate through sections
    for (const key in st.sections) {
      const section = st.sections[key]

      const isDark = section.element.getAttribute("data-is-dark") === "true"
      const hasTopBlob = !(
        section.element.getAttribute("data-no-top") === "true"
      )
      const hasBottomBlob = !(
        section.element.getAttribute("data-no-bottom") === "true"
      )
      const localHasTopBlob = blobOffscreen(section.topOffset, st.blobHeight)
        ? false
        : hasTopBlob
      const localHasBottomBlob = blobOffscreen(
        section.topOffset + section.height,
        st.blobHeight
      )
        ? false
        : hasBottomBlob
      let offset = section.topOffset
      const top = ScrollSmoother.get().scrollTop()
      if (position === "relative" && top < window.innerHeight) {
        offset += top
      }
      const wrapperHeight = section.height

      // constructs a wave path using the velocity
      // not a huge fan of the concatting but it's worth it for readability
      const newPath = `M0,${offset} ${
        localHasTopBlob
          ? // top left curve
            `C${vwToPx(35)},${offset} ` +
            `${vwToPx(35)},${st.blobHeight + offset} ` +
            `${vwToPx(50)},${st.blobHeight + offset} ` +
            // top right curve
            `C${vwToPx(65)},${st.blobHeight + offset} ` +
            `${vwToPx(65)},${offset} ` +
            `${vwToPx(100)},${offset} `
          : // top side (straight line)
            `L${vwToPx(100)},${offset} `
        // right side
      }L${vwToPx(100)},${wrapperHeight + offset} ${
        localHasBottomBlob
          ? // bottom right curve
            `C${vwToPx(65)},${wrapperHeight + offset} ` +
            `${vwToPx(65)},${wrapperHeight + st.blobHeight + offset} ` +
            `${vwToPx(50)},${wrapperHeight + st.blobHeight + offset} ` +
            // bottom left curve
            `C${vwToPx(35)},${wrapperHeight + st.blobHeight + offset} ` +
            `${vwToPx(35)},${wrapperHeight + offset} ` +
            `0,${wrapperHeight + offset} `
          : // bottom side (straight line)
            `L0,${wrapperHeight + offset} `
      }Z`

      // check if the wrapper is on the screen
      if (
        boundsOnscreen(
          section.topOffset + Math.min(0, st.blobHeight),
          section.topOffset + section.height + Math.max(0, st.blobHeight)
        )
      ) {
        // fill section on canvas
        ctx.fillStyle = isDark
          ? st.darkBackground ?? "black"
          : st.lightBackground ?? "white"
        ctx.fill(new Path2D(newPath))
      }
    }
  }

  const updateSizeAndPositions = () => {
    const canvas = st.canvas
    // update client rects for each section
    for (const key in st.sections) {
      const section = st.sections[key]
      section.topOffset = section.element.getBoundingClientRect().top
      section.height = section.element.clientHeight
    }

    // check if canvas size has changed
    if (canvas && canvas?.width !== canvas.clientWidth) {
      canvas.width = canvas.clientWidth
      requestAnimationFrame(updateSizeAndPositions)
    }

    if (canvas) {
      const height = mobile
        ? getDesiredCanvasHeight()
        : canvas.clientHeight ?? 0
      if (Math.abs((canvas?.height ?? Infinity) - height) > 1) {
        canvas.height = height
        canvas.style.height = mobile ? `${height}px` : "100vh"
        requestAnimationFrame(updateSizeAndPositions)
      }
    }

    requestAnimationFrame(() => updateBlobs())
  }

  const init = () => {
    st.lastScrollTop = undefined
    updateScroll()
    const canvas = canvasEl.current
    st.canvas = canvas

    if (canvas) {
      canvas.width = canvas.clientWidth
      const height = mobile ? getDesiredCanvasHeight() : canvas.clientHeight

      canvas.height = height
      canvas.style.height = mobile ? `${height}px` : "100vh"
      st.ctx = canvas.getContext("2d")
    }

    const darkImage = new Image()
    // Next.js image imports are StaticImageData objects, not URL strings —
    // assign `.src` or the tile never loads and the pattern stays null.
    darkImage.src = blackBG.src
    darkImage.onload = () => {
      st.darkBackground = st.ctx?.createPattern(darkImage, "repeat")
      requestAnimationFrame(updateBlobs)
    }
    const lightImage = new Image()
    lightImage.src = whiteBG.src
    lightImage.onload = () => {
      st.lightBackground = st.ctx?.createPattern(lightImage, "repeat")
      requestAnimationFrame(updateBlobs)
    }

    // when any images on the page are loaded, update the sizes and positions
    const images = Array.from(document.querySelectorAll("img"))
    for (const image of images) {
      image.addEventListener("load", () => {
        requestAnimationFrame(updateSizeAndPositions)
      })
    }

    // Re-measure section positions and repaint. The registry itself is owned by
    // the <Section> components (register on mount / kill on unmount), so init()
    // must NOT clear it — doing so used to blank the canvas whenever the loader
    // fired "anyEnd" a few seconds after load.
    requestAnimationFrame(updateSizeAndPositions)
    requestAnimationFrame(updateBlobs)
    pageReady()
      .then(() => requestAnimationFrame(updateBlobs))
      .catch(console.error)
  }

  const movementFactor = usingWave ? 1 : 100
  const updateScroll = () => {
    if (st.lastScrollTop) {
      const newScrollTop = ScrollSmoother.get()?.scrollTop() ?? 0
      const delta = newScrollTop - st.lastScrollTop
      st.lastScrollTop = newScrollTop

      // if the delta is too big, that usually indicates a scroll event directly after a resize
      // has to be ignored or the blobs will be drawn incorrectly
      if (Math.abs(delta) > 100) {
        requestAnimationFrame(updateSizeAndPositions)
        return
      }

      st.totalOffset += delta

      for (const key in st.sections) {
        const section = st.sections[key]
        section.topOffset -= st.totalOffset / movementFactor
      }
      st.totalOffset -= st.totalOffset / movementFactor
      if (Math.abs(st.totalOffset) > 1) requestAnimationFrame(updateBlobs)
    } else {
      st.lastScrollTop = ScrollSmoother.get()?.scrollTop() ?? 0
      st.totalOffset = 0
    }
  }

  useEffect(() => {
    if (!usingWave) return

    let previousWidth = window.innerWidth
    const mobileResize = () => {
      if (mobile)
        if (previousWidth !== window.innerWidth) {
          previousWidth = window.innerWidth
          requestAnimationFrame(init)
        }
    }

    init()
    addEventListener("resize", updateSizeAndPositions)
    addEventListener("smoothScroll", updateBlobs)
    addEventListener("resize", mobileResize)
    return () => {
      removeEventListener("smoothScroll", updateBlobs)
      removeEventListener("resize", updateSizeAndPositions)
      removeEventListener("resize", mobileResize)
    }
  }, [usingWave, mobile])

  useEffect(() => {
    init()

    loader.addEventListener("anyEnd", init)
    return () => {
      loader.removeEventListener("anyEnd", init)
    }
  }, [location.pathname])

  return <Canvas ref={canvasEl} position={position} />
}

const Canvas = styled.canvas<{ position?: string }>`
  position: ${props => props.position ?? "fixed"};
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`
