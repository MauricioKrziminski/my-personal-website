import React from "react"

import Language, { LanguageContext } from "utils/i18n/LanguageContext"

// eslint-disable-next-line import/no-cycle
import Background, { BackgroundContext } from "./Background"
import Nav, { NavContext } from "./Nav"
import Screen, { ScreenContext } from "./Screen"

interface ProvidersProps {
  children: React.ReactNode
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <Language>
      <Screen>
        <Background>
          <Nav>{children}</Nav>
        </Background>
      </Screen>
    </Language>
  )
}

export { ScreenContext, BackgroundContext, NavContext, LanguageContext }
