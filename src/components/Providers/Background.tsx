import React, { createContext, useMemo, useState } from "react"

// eslint-disable-next-line import/no-cycle
import { BackgroundKiller } from "components/BackgroundCanvas"

export const BackgroundContext = createContext<{
  addBackgroundSection: ((arg0: HTMLElement) => BackgroundKiller) | undefined
  setAddBackgroundSection: React.Dispatch<
    React.SetStateAction<((arg0: HTMLElement) => BackgroundKiller) | undefined>
  >
}>({
  addBackgroundSection: () => () => {},
  setAddBackgroundSection: () => {},
})

type Props = {
  children: React.ReactNode
}

export default function Provider({ children }: Props) {
  const [addBackgroundSection, setAddBackgroundSection] = useState<
    ((arg0: HTMLElement) => BackgroundKiller) | undefined
  >()

  const backgroundValues = useMemo(
    () => ({
      addBackgroundSection,
      setAddBackgroundSection,
    }),
    [addBackgroundSection]
  )

  return (
    <BackgroundContext.Provider value={backgroundValues}>
      {children}
    </BackgroundContext.Provider>
  )
}
