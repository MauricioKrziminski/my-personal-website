export const isBrowser = () =>
  typeof window !== "undefined" && typeof document !== "undefined"

export const addDebouncedEventListener = (
  element: Window | HTMLElement,
  event: string,
  callback: () => void,
  delay = 500
) => {
  let timeout: NodeJS.Timeout | null = null
  const debounced = () => {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      callback()
    }, delay)
  }
  element.addEventListener(event, debounced)
  return () => {
    element.removeEventListener(event, debounced)
    if (timeout) {
      clearTimeout(timeout)
    }
  }
}

export const vwToPx = (vw: number) => {
  if (isBrowser()) {
    const px = vw * (window.innerWidth / 100)
    return px
  }
  return 0
}

// input in the form of rgb(255, 255, 255)
// determine if the color is light or dark
export const isColorLight = (color: string) => {
  const rgb = color.match(/\d+/g)
  if (!rgb) return false
  const r = parseInt(rgb[0], 10)
  const g = parseInt(rgb[1], 10)
  const b = parseInt(rgb[2], 10)
  const brightness = (r * 299 + g * 587 + b * 114) / 1000
  return brightness > 125
}

/**
 * keeps a value between a min and max
 * @param num number to clamp
 * @param min minimum value
 * @param max maximum value
 * @returns clamped number
 */
export const clamp = (num: number, min: number, max: number) =>
  Math.min(Math.max(num, min), max)

/**
 * takes a number and adds a zero to the beginning if it is less than 10
 * @param num number to pad
 * @returns padded number
 */
export const zeroPad = (num: number) => {
  return `0${num}`.slice(-2)
}

/**
 * determines if the current device is a mobile device with no mouse
 * @returns true if touch only
 */
export const isTouchDevice = () => {
  return isBrowser() ? window.matchMedia("(hover: none)").matches : true
}

export const pathnameMatches = (pathname: string, to: string) => {
  return pathname === to || pathname === `${to}/` || `${pathname}/` === to
}

export const sleep = (ms: number) =>
  new Promise(resolve => {
    setTimeout(resolve, ms)
  })
