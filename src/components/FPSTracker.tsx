import { useEffect } from "react"

import { isBrowser } from "utils/functions"

export default function FPSTracker() {
  useEffect(() => {
    if (isBrowser()) {
      if (window.location.href.indexOf("fps") > -1) {
        setTimeout(() => {
          /* eslint-disable */
          const { document } = window
          const script = document.createElement("script")
          script.onload = function () {
            // @ts-ignore
            const stats = new Stats()
            document.body.appendChild(stats.dom)
            requestAnimationFrame(function loop() {
              stats.update()
              requestAnimationFrame(loop)
            })
          }
          script.src = "//rawgit.com/mrdoob/stats.js/master/build/stats.min.js"
          document.head.appendChild(script)
          /* eslint-enable */
        }, 1000)
      }
    }
  }, [])

  return null
}
