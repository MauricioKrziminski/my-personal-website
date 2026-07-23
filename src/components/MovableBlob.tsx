/* eslint-disable */
import React, { useEffect, useRef, useState } from "react"

import gsap from "gsap"
import styled from "styled-components"

import colors from "styles/colors"
import { clamp, isTouchDevice, vwToPx } from "utils/functions"
import spline from "utils/spline"
import getMedia from "utils/getMedia"

interface Point {
  // home position
  x: number
  y: number
  // desired offset from that home position
  ox: number
  oy: number
  // actual current offset of the point
  ax: number
  ay: number
  // acceralation of the point
  dx: number
  dy: number
  // primary axis of the point
  primaryAxis?: "x" | "y"
  distanceFromCorner?: number
}

type CustomMouseMove = {
  clientX: number
  clientY: number
  movementX: number
  movementY: number
}

/**
 * takes a number between -1 and 1 and returns the
 * amplitude of the new form wave at that point
 *
 * bezier curves don't convert to functions easily,
 * so this is just an approximation function of the curve
 * more than good enough for our purposes
 *
 * @param x number between -1 and 1
 * @returns amplitude of the new form wave at that point
 */
const realCurve = (x: number) => {
  return (
    4 *
      (-1.087566 * x ** 6 +
        0.049912 * x ** 5 +
        2.284716 * x ** 4 -
        0.084281 * x ** 3 -
        1.585232 * x ** 2 +
        0.036302 * x +
        0.385252) -
    0.05
  )
}

const createPoint = (x: number, y: number, axis?: "x" | "y"): Point => {
  return {
    x,
    y,
    ox: 0,
    oy: 0,
    ax: 0,
    ay: 0,
    dx: 0,
    dy: 0,
    primaryAxis: axis,
  }
}

type props = {
  isFilled?: boolean
  drawPath?: boolean
  isStaticAnimation?: boolean
}

export default function MovableBlob({
  isFilled,
  drawPath,
  isStaticAnimation,
}: props) {
  const [highPerf, setHighPerf] = useState(false)
  useEffect(() => {
    if (isTouchDevice()) {
      setHighPerf(true)
    }
  }, [])
  /**
   * increases the size of the canvas so the blob has room to move
   */
  const PADDING = Math.min(vwToPx(6), 90)
  /**
   * space between each point along straight edges
   */
  const INTERVAL = 10
  /**
   * border-radius of the blob
   */
  const RADIUS = 10
  /**
   * number of points in each corner
   */
  const RADIUS_NUMPOINTS = 2
  /**
   * maximum change in velocity per frame
   */
  const MAX_SPEED = 8
  /**
   * essentially the width of the sine wave
   */
  const getSize = () => Math.min(vwToPx(100), 72)
  /**
   * minimum distance between two points on the blob
   * affects the smoothness of the blob
   */
  const MIN_DISTANCE = 5
  /**
   * speed at which points move towards their desired position
   */
  const SPEED = 0.2
  /**
   * factor applied to the speed of the when updating points
   * a value of 2 would move points twice as far
   */
  const SPEED_FACTOR = 2
  /**
   * affects corners not moving
   */
  const DISTANCE_THRESHOLD = RADIUS * 4
  /**
   * how fast the blob returns home
   */
  const REDUCTION_FACTOR = 0.9

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const wrapper = useRef<HTMLDivElement>(null)
  const pathColor = useRef<string>(colors.black300)
  const fillState = useRef<boolean>(false)
  /**
   * all points on border
   */
  let listOfPoints: Point[] = []
  /**
   * the width of the entire canvas
   */
  let width = 0
  /**
   * the height of the entire canvas
   */
  let height = 0
  /**
   * tracks if the component is unmounted to stop the animation
   */
  let isMounted = false
  /**
   * used to calculate mouse movement delta and approximate speed of the mouse
   */
  let lastMouseMove = Date.now()
  /**
   * used to calculate frame times and compensate movement accordingly
   */
  let lastFrame = Date.now()
  /**
   * used to track mouse if mouse has crossed X border
   * we wait until after the mouse crosses the border to start moving the blob
   */
  let blobIsTrackingX = false
  /**
   * used to track mouse if mouse has crossed Y border
   * we wait until after the mouse crosses the border to start moving the blob
   */
  let blobIsTrackingY = false
  /**
   * used to pad CustomMouseMove events with mouse clientX and clientY data
   * @see CustomMouseMove
   */
  let lastMouseEventRAW: CustomMouseMove | null = null
  /**
   * used to track if the path has updated and needs to be redrawn
   */
  let lastPath: string
  /**
   * used to track movement of the canvas on the screen
   */
  let lastPosition: { x: number; y: number } = { x: 0, y: 0 }
  /**
   * current mouse position in local coordinates
   */
  const mouse = { x: 0, y: 0 }
  /**
   * tracks if the blob is currently on screen for culling
   */
  let isInView = false
  let isInViewLast = false
  /**
   * tracks fill of the blob
   */
  let fillPercentage = 0
  let needsRedraw = false

  const animate = () => {
    if (highPerf) return
    if (!isMounted) return // stop on unmount

    // check if the canvas has moved since the last frame
    const canvas = canvasRef.current
    if (canvas && lastMouseEventRAW) {
      // get the current position of the canvas
      const { x, y, width, height } = canvas.getBoundingClientRect()
      // if the canvas has moved, update the last position
      if (x !== lastPosition.x || y !== lastPosition.y) {
        const dx = lastPosition.x - x
        const dy = lastPosition.y - y
        lastPosition = { x, y }
        updateMouse({
          clientX: lastMouseEventRAW.clientX,
          clientY: lastMouseEventRAW.clientY,
          movementX: dx,
          movementY: dy,
        })
      }

      // determine on screen status
      isInViewLast = isInView
      isInView =
        x + width > 0 &&
        x < window.innerWidth &&
        y + height > 0 &&
        y < window.innerHeight
      if (isInViewLast !== isInView) {
        needsRedraw = true
      }
    } else {
      requestAnimationFrame(animate)
      return
    }

    // fillPercentage needs to be updated before the needsRedraw check or it won't always be accurate
    if (fillState.current) {
      fillPercentage += 5
      if (fillPercentage <= 100) needsRedraw = true
    } else {
      fillPercentage -= 5
      if (fillPercentage >= 0) needsRedraw = true
    }
    fillPercentage = clamp(fillPercentage, 0, 100)

    if (needsRedraw) {
      needsRedraw = false
    } else {
      requestAnimationFrame(animate)
      return
    }

    if (!isInView) {
      requestAnimationFrame(animate)
      return
    }

    // track how long since last frame
    const now = Date.now()
    const delta = Math.min(now - lastFrame, 64)
    lastFrame = now
    /**
     * 1 at 60fps, 2 at 30fps, etc
     */
    const timeDilation = Math.min(16, delta / (1000 / 60))

    // update point positions
    listOfPoints.forEach(point => {
      // get the manhattan distance between the point and the mouse
      const xdistance = Math.abs(point.x - mouse.x)
      const ydistance = Math.abs(point.y - mouse.y)

      // update acceleration to move ax and ay towards ox and oy
      point.dx = (point.ox - point.ax) * SPEED
      point.dy = (point.oy - point.ay) * SPEED

      // apply all new values
      point.ax += point.dx * timeDilation
      point.ay += point.dy * timeDilation
      point.dx -= (point.dx - point.dx * REDUCTION_FACTOR) * timeDilation
      point.dy -= (point.dy - point.dy * REDUCTION_FACTOR) * timeDilation
      if (xdistance > getSize() || ydistance > getSize()) {
        point.ox -= (point.ox - point.ox * REDUCTION_FACTOR) * timeDilation
        point.oy -= (point.oy - point.oy * REDUCTION_FACTOR) * timeDilation
      }

      // max distance from home position
      point.ox = clamp(point.ox, -getSize(), getSize())
      point.oy = clamp(point.oy, -getSize(), getSize())

      // if a point is near a corner, move it towards the corner proportional to its distance from the corner
      if (!point.distanceFromCorner)
        point.distanceFromCorner = Math.min(
          getDistance(point.x, point.y, PADDING, PADDING),
          getDistance(point.x, point.y, width - PADDING, PADDING),
          getDistance(point.x, point.y, width - PADDING, height - PADDING),
          getDistance(point.x, point.y, PADDING, height - PADDING)
        )
      if (point.distanceFromCorner < DISTANCE_THRESHOLD) {
        point.ox *= point.distanceFromCorner / DISTANCE_THRESHOLD
        point.oy *= point.distanceFromCorner / DISTANCE_THRESHOLD
      }

      const small = getSize() * 0.25
      if (point.primaryAxis === "x") {
        point.oy = clamp(point.oy, -small, small)
      }
      if (point.primaryAxis === "y") {
        point.ox = clamp(point.ox, -small, small)
      }

      // error correction, if any of x, y, ax, ay, dx, dy, ox, oy are NaN, set them to 0
      // this is to prevent the blob from becoming invisible in rare cases
      if (isNaN(point.x)) point.x = 0
      if (isNaN(point.y)) point.y = 0
      if (isNaN(point.ax)) point.ax = 0
      if (isNaN(point.ay)) point.ay = 0
      if (isNaN(point.dx)) point.dx = 0
      if (isNaN(point.dy)) point.dy = 0
      if (isNaN(point.ox)) point.ox = 0
      if (isNaN(point.oy)) point.oy = 0

      // finally, if ax or ay is greater than 2, we need a redraw on next frame
      if (Math.abs(point.ax) > 2 || Math.abs(point.ay) > 2) {
        needsRedraw = true
      }
    })

    // iterate over each point and set each point's position to the average of it's two neighbors and itself
    for (let i = 1; i < listOfPoints.length - 2; i++) {
      const point = listOfPoints[i]
      const left = listOfPoints[i - 1]
      const right = listOfPoints[i + 1]
      point.ox = (left.ox + right.ox + point.ox) / 3
      point.oy = (left.oy + right.oy + point.oy) / 3
    }

    const newPath = spline(
      listOfPoints.map(x => {
        return {
          x: x.x + x.ax,
          y: x.y + x.ay,
        }
      }),
      1,
      true
    )

    if (newPath !== lastPath) {
      // actually update the canvas
      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.clearRect(0, 0, width, height)
        const path = new Path2D(newPath)
        ctx.strokeStyle = pathColor.current
        ctx.fillStyle = `rgba(255,255,255,${fillPercentage / 100})`

        // random color for redraw testing
        // ctx.fillStyle = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(
        //   Math.random() * 255
        // )},${Math.floor(Math.random() * 255)}, ${Math.max(
        //   0.1,
        //   fillPercentage / 100
        // )})`

        ctx.stroke(path)
        ctx.fill(path)
      }
    }

    requestAnimationFrame(animate)
  }

  const init = () => {
    needsRedraw = true

    const pointsOnCircle: Point[] = []
    const newPoints = []

    // update the size of the canvas
    if (wrapper.current) {
      height = wrapper.current.clientHeight + PADDING * 2
      width = wrapper.current.clientWidth + PADDING * 2

      if (canvasRef.current) {
        canvasRef.current.height = height
        canvasRef.current.width = width
        canvasRef.current.style.margin = `-${PADDING}px`
      }
    }

    // generate all corners of the circle
    for (let i = 0; i < RADIUS_NUMPOINTS * 4; i++) {
      // starts at very top middle and moves clockwise
      const angle = (i / (RADIUS_NUMPOINTS * 4)) * Math.PI * 2 - 0.5 * Math.PI
      const x = Math.cos(angle) * RADIUS
      const y = Math.sin(angle) * RADIUS

      let quadrant = 0
      if (x > 0 && y < 0) quadrant = 1
      if (x > 0 && y > 0) quadrant = 2
      if (x < 0 && y > 0) quadrant = 3
      if (x < 0 && y < 0) quadrant = 4

      // and apply offsets depending on their location
      switch (quadrant) {
        case 1: // top right
          pointsOnCircle.push(
            createPoint(x + width - PADDING - RADIUS, y + PADDING + RADIUS)
          )
          break
        case 2: // bottom right
          pointsOnCircle.push(
            createPoint(
              x + width - PADDING - RADIUS,
              y + height - PADDING - RADIUS
            )
          )
          break
        case 3: // bottom left
          pointsOnCircle.push(
            createPoint(x + PADDING + RADIUS, y + height - PADDING - RADIUS)
          )
          break
        case 4: // top left
          pointsOnCircle.push(
            createPoint(x + PADDING + RADIUS, y + PADDING + RADIUS)
          )
          break
      }
    }

    // generate all points along the top edge of the rectangle
    for (
      let i = RADIUS + PADDING;
      i < width - PADDING - RADIUS;
      i += INTERVAL
    ) {
      newPoints.push(createPoint(i, 0 + PADDING, "y"))
    }
    newPoints.push(createPoint(width - PADDING - RADIUS, 0 + PADDING, "y"))

    // add the first RADIUS_NUMPOINTS points to the list
    newPoints.push(...pointsOnCircle.slice(0, RADIUS_NUMPOINTS))

    // generate all points along the right of the rectangle
    for (
      let i = PADDING + RADIUS;
      i < height - PADDING - RADIUS;
      i += INTERVAL
    ) {
      newPoints.push(createPoint(width - PADDING, i, "x"))
    }
    newPoints.push(createPoint(width - PADDING, height - PADDING - RADIUS, "x"))

    // add the next RADIUS_NUMPOINTS points to the list
    newPoints.push(
      ...pointsOnCircle.slice(RADIUS_NUMPOINTS, 2 * RADIUS_NUMPOINTS)
    )

    // generate all points along the bottom of the rectangle
    for (
      let i = width - PADDING - RADIUS;
      i >= RADIUS + PADDING;
      i -= INTERVAL
    ) {
      newPoints.push(createPoint(i, height - PADDING, "y"))
    }
    newPoints.push(createPoint(PADDING + RADIUS, height - PADDING, "y"))

    // add the next RADIUS_NUMPOINTS points to the list
    newPoints.push(
      ...pointsOnCircle.slice(2 * RADIUS_NUMPOINTS, 3 * RADIUS_NUMPOINTS)
    )

    // generate all points along the left of the rectangle
    for (let i = height - PADDING * 2 - RADIUS; i >= RADIUS; i -= INTERVAL) {
      newPoints.push(createPoint(0 + PADDING, i + PADDING, "x"))
    }
    newPoints.push(createPoint(0 + PADDING, PADDING + RADIUS, "x"))

    // add the final RADIUS_NUMPOINTS points to the list
    newPoints.push(
      ...pointsOnCircle.slice(3 * RADIUS_NUMPOINTS, 4 * RADIUS_NUMPOINTS)
    )

    // iterate through the list of points and remove any that are too close to each other
    for (let i = 0; i < newPoints.length - 1; i++) {
      const j = i + 1
      const distance = getDistance(
        newPoints[i].x,
        newPoints[i].y,
        newPoints[j].x,
        newPoints[j].y
      )
      // if the distance is less than the minimum distance, remove the second point
      if (distance < MIN_DISTANCE) {
        newPoints.splice(j, 1)
        i--
      }
    }

    listOfPoints = newPoints
    if (!isMounted) {
      isMounted = true
      // make sure line shows up on first render
      updateMouse({
        clientX: width / 2,
        clientY: height / 2,
        movementX: 0,
        movementY: 0,
      })
      requestAnimationFrame(animate)
    }
  }

  const deinit = () => {
    isMounted = false
    listOfPoints.length = 0
  }

  /**
   * takes a mouse event and updates the velocities of nearby points
   * @param e mouse move event
   */
  const updateMouse = (e: CustomMouseMove) => {
    lastMouseEventRAW = e

    // track how long since last mouse move
    const now = Date.now()
    const delta = now - lastMouseMove
    lastMouseMove = now
    const timeDilation = delta / (1000 / 60)

    // because a slower mouse will fire more events, we need to compensate for speed
    const speedX = clamp(Math.abs(e.movementX / delta), 0.4, 2)
    const speedY = clamp(Math.abs(e.movementY / delta), 0.4, 2)

    // update mouse
    const coords = screenCoordsToLocal(e.clientX, e.clientY)
    mouse.x = coords[0]
    mouse.y = coords[1]

    // check if on line, if so enable tracking
    const BUFFER = 10
    if (
      mouse.x >= PADDING - BUFFER &&
      mouse.x <= width - PADDING + BUFFER &&
      // check if too close to middle
      (mouse.x < PADDING + BUFFER || mouse.x > width - PADDING - BUFFER)
    ) {
      blobIsTrackingX = true
    }
    if (
      mouse.y >= PADDING - BUFFER &&
      mouse.y <= height - PADDING + BUFFER &&
      // check if too close to middle
      (mouse.y < PADDING + BUFFER || mouse.y > height - PADDING - BUFFER)
    ) {
      blobIsTrackingY = true
    }

    // check if far enough away from line, if so disable tracking
    const distance = getSize() * 0.75
    if (
      mouse.x < PADDING - distance ||
      mouse.x > width - PADDING + distance ||
      (mouse.x >= PADDING + distance && mouse.x <= width - PADDING - distance)
    ) {
      blobIsTrackingX = false
    }
    if (
      mouse.y < PADDING - distance ||
      mouse.y > height - PADDING + distance ||
      (mouse.y >= PADDING + distance && mouse.y <= height - PADDING - distance)
    ) {
      blobIsTrackingY = false
    }

    if (blobIsTrackingX || blobIsTrackingY) {
      listOfPoints.forEach(point => {
        const distance = getDistance(
          point.x,
          point.y,
          screenCoordsToLocal(e.clientX, e.clientY)[0],
          screenCoordsToLocal(e.clientX, e.clientY)[1]
        )

        if (distance < getSize()) {
          if (blobIsTrackingX) {
            point.ox +=
              clamp(
                e.movementX * timeDilation * speedX * SPEED_FACTOR,
                -MAX_SPEED,
                MAX_SPEED
              ) * normalize(distance)
            needsRedraw = true
          }

          if (blobIsTrackingY) {
            point.oy +=
              clamp(
                e.movementY * timeDilation * speedY * SPEED_FACTOR,
                -MAX_SPEED,
                MAX_SPEED
              ) * normalize(distance)
            needsRedraw = true
          }
        }
      })
    }
  }

  /**
   * gets the distance between two points
   */
  const getDistance = (x1: number, y1: number, x2: number, y2: number) => {
    return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2)
  }

  /**
   * converts user coordinates to local canvas coordinates
   * @param x x coordinate on screen
   * @param y y coordinate on screen
   * @returns x and y coordinates on canvas
   */
  const screenCoordsToLocal = (x: number, y: number) => {
    if (!canvasRef.current) return [0, 0]
    const boundingBox = canvasRef.current.getBoundingClientRect()
    return [x - boundingBox.left, y - boundingBox.top]
  }

  /**
   * normalizes values to create a sine wave
   * @param x distance to the mouse
   * @returns normalization factor, larger if close to the mouse
   */
  const normalize = (x: number) => {
    return realCurve(x / getSize())
  }

  // watch wrapper for size changes
  const handleResize = () => {
    init()
  }

  useEffect(() => {
    if (highPerf) return

    init()

    window.addEventListener("mousemove", updateMouse)

    // watch wrapper for size changes
    const resizeObserver = new ResizeObserver(handleResize)
    if (wrapper.current) resizeObserver.observe(wrapper.current)

    return () => {
      deinit()
      window.removeEventListener("mousemove", updateMouse)
      resizeObserver.disconnect()
    }
  }, [highPerf])

  useEffect(() => {
    if (drawPath) {
      pathColor.current = colors.mainGreen
    } else {
      pathColor.current = colors.black300
    }
  }, [drawPath])

  const staticBackground = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (isFilled) {
      fillState.current = true
    } else {
      fillState.current = false
    }

    if (isStaticAnimation && staticBackground.current) {
      if (canvasRef.current) canvasRef.current.style.display = "none"
      staticBackground.current.style.display = "block"
      staticBackground.current.style.removeProperty("background-color")
      let height = getMedia(500, 34.72, 35.16, 86.67) // straight from card file
      const isVw = getMedia(false, true, true, true)
      height = isVw ? vwToPx(height) : height
      const width = staticBackground.current.clientWidth

      const first = height * 0.3
      const second = height * 0.6

      if (isFilled) {
        gsap.fromTo(
          staticBackground.current,
          {
            clipPath:
              `path('` +
              `M0, 0 ` +
              `L0, 0 ` +
              `C${width * 0.3}, ${0} ` +
              `${width * 0.3}, ${0} ` +
              `${width * 0.5}, ${0} ` +
              `C${width * 0.7}, ${0} ` +
              `${width * 0.7}, ${0} ` +
              `${width}, ${0} ` +
              `L${width}, 0 ` +
              `Z')`,
          },
          {
            duration: 0.25,
            clipPath:
              `path('` +
              `M0, 0 ` +
              `L0, ${first} ` +
              `C${width * 0.3}, ${first} ` +
              `${width * 0.3}, ${second} ` +
              `${width * 0.5}, ${second} ` +
              `C${width * 0.7}, ${second} ` +
              `${width * 0.7}, ${first} ` +
              `${width}, ${first} ` +
              `L${width}, 0 ` +
              `Z')`,
            ease: "power1.in",
          }
        )
        gsap.to(staticBackground.current, {
          delay: 0.25,
          duration: 0.25,
          clipPath:
            `path('` +
            `M0, 0 ` +
            `L0, ${height} ` +
            `C${width * 0.3}, ${height} ` +
            `${width * 0.3}, ${height} ` +
            `${width * 0.5}, ${height} ` +
            `C${width * 0.7}, ${height} ` +
            `${width * 0.7}, ${height} ` +
            `${width}, ${height} ` +
            `L${width}, 0 ` +
            `Z')`,
          ease: "power1.out",
        })
      } else {
        gsap.to(staticBackground.current, {
          backgroundColor: "transparent",
        })
      }

      setTimeout(() => {
        if (canvasRef.current && staticBackground.current) {
          canvasRef.current.style.display = "block"
          staticBackground.current.style.display = "none"
        }
      }, 1000)
    }
  }, [isFilled])

  return highPerf ? (
    <HighPerfBackground
      isFilled={isFilled}
      drawPath={drawPath}
      ref={staticBackground}
    />
  ) : (
    <Wrapper ref={wrapper}>
      <canvas ref={canvasRef} />
      <StaticAnimation ref={staticBackground} />
    </Wrapper>
  )
}

const HighPerfBackground = styled.div<{
  isFilled?: boolean
  drawPath?: boolean
}>`
  width: 100%;
  height: 100%;
  background-color: ${({ isFilled }) =>
    isFilled ? colors.mainWhite : "transparent"};
  border: 1px solid
    ${({ drawPath }) => (drawPath ? colors.mainGreen : colors.black300)};
  border-radius: 10px;
  transition: background-color 0.2s ease-in-out;
`

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
`

const StaticAnimation = styled.div`
  display: none;
  width: 100%;
  height: 100%;
  background-color: white;
  border-radius: 10px;
  border: 1px solid ${colors.black300};
`
