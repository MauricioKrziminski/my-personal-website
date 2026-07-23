import React, { useContext } from "react"

import { ScreenContext } from "components/Providers"

import DesktopTablet from "./DesktopTablet"
import Mobile from "./Mobile"

type Props = {
  photos: string[]
  timeline: gsap.core.Timeline | null
  alts: string[]
}

export default function Pictures(props: Props) {
  const { mobile } = useContext(ScreenContext)

  if (mobile) {
    return <Mobile {...props} />
  }
  return <DesktopTablet {...props} />
}
