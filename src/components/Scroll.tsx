import React, { useEffect, useRef, useState } from "react"

import ScrollSmoother from "gsap/ScrollSmoother"

import { useLocation } from "utils/useLocation"

import loader from "utils/Loader"
import { onUnmount, pageReady } from "utils/pageReady"

type ScrollProps = {
  children: React.ReactNode
}

/**
 * shorthand for pins, which selects "fixed" if scroller is off and "transform"
 * if scroller is on
 */
export const usePinType = () => {
  const isSmooth = useIsSmooth()
  return isSmooth ? "transform" : "fixed"
}

/**
 * returns true if ScrollSmoother is enabled
 */
export const useIsSmooth = () => {
  const [smooth, setSmooth] = useState(true)

  useEffect(() => {
    const enableSmooth = () => {
      setSmooth(true)
    }
    const disableSmooth = () => {
      setSmooth(false)
    }

    window.addEventListener("wheel", enableSmooth, { passive: true })
    window.addEventListener("touchstart", disableSmooth, { passive: true })

    return () => {
      window.removeEventListener("wheel", enableSmooth)
      window.removeEventListener("touchstart", disableSmooth)
    }
  }, [])

  // if the device is mobile, set the initial value to false
  useEffect(() => {
    const hover = window.matchMedia("(hover: hover)")
    if (!hover.matches) {
      setSmooth(false)
    }
  }, [])

  return smooth
}

/**
 * context that provides a refresh signal whenever the smoother changes
 */
export const ScrollerHasInitContext = React.createContext<false | number>(false)

export default function Scroll({ children }: ScrollProps) {
  const isSmooth = useIsSmooth()
  const isPaused = useRef(true)
  const [refreshSignal, setRefreshSignal] = useState(0)
  const [externalSignal, setExternalSignal] = useState(0)
  const location = useLocation()

  /**
   * create the smoother
   */
  useEffect(() => {
    const smoother = ScrollSmoother.create({
      smooth: isSmooth ? 1 : 0,
      smoothTouch: isSmooth ? 1 : 0,
      effects: true,
      onUpdate: e => {
        // if at the top, enable overscroll behavior (pull to refresh)
        // so escreve quando muda: este callback roda a cada frame de scroll, e
        // escrever no style do body todo frame forcava recalculo de estilo a toa
        const overscrollY = e.scrollTop() === 0 ? "auto" : "none"
        if (document.body.style.overscrollBehaviorY !== overscrollY) {
          document.body.style.overscrollBehaviorY = overscrollY
        }
        // always allow sideways overscroll (forward/back usually)
        if (document.body.style.overscrollBehaviorX !== "auto") {
          document.body.style.overscrollBehaviorX = "auto"
        }

        const event = new CustomEvent("smoothScroll")
        window.dispatchEvent(event)
      },
      onStop: () => {
        const event = new CustomEvent("smoothScroll")
        window.dispatchEvent(event)
        const stop = new CustomEvent("smoothStop")
        window.dispatchEvent(stop)
      },
    })

    setTimeout(() => {
      // persist paused state across re-renders
      smoother.paused(isPaused.current)

      // send a refresh signal to children when the smoother changes
      setExternalSignal(prev => prev + 1)
    }, 0)

    const pauseSmooth = () => {
      smoother.paused(true)
    }
    const resumeSmooth = () => {
      smoother.paused(false)
    }

    loader.addEventListener("anyStart", pauseSmooth)
    loader.addEventListener("anyEnd", resumeSmooth)

    return () => {
      loader.removeEventListener("anyStart", pauseSmooth)
      loader.removeEventListener("anyEnd", resumeSmooth)
      isPaused.current = smoother.paused()
      smoother.kill()
    }
  }, [isSmooth, refreshSignal, location])

  /**
   * kill the smoother when back/forward buttons are pressed
   */
  useEffect(() => {
    const killSmoother = () => {
      const smoother = ScrollSmoother.get()
      if (smoother) smoother.kill()

      // we want to wait for the *next* page to be ready before refreshing
      onUnmount(() => {
        pageReady()
          .then(() => {
            setRefreshSignal(s => s + 1)
          })
          .catch(() => {
            setRefreshSignal(s => s + 1)
          })
      })
    }

    window.addEventListener("popstate", killSmoother)
    return () => {
      window.removeEventListener("popstate", killSmoother)
    }
  }, [])

  return (
    <ScrollerHasInitContext.Provider value={externalSignal}>
      <div id="smooth-wrapper">
        <div id="smooth-content">{children}</div>
      </div>
    </ScrollerHasInitContext.Provider>
  )
}
