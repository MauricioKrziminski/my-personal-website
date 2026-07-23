import React, { createContext, useMemo, useState } from "react"

export const NavContext = createContext<{
  navIsOpen: boolean
  setNavIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  menuLight: boolean
  setMenuLight: React.Dispatch<React.SetStateAction<boolean>>
}>({
  navIsOpen: false,
  setNavIsOpen: () => false,
  menuLight: false,
  setMenuLight: () => false,
})

type Props = {
  children: React.ReactNode
}

export default function Provider({ children }: Props) {
  const [navIsOpen, setNavIsOpen] = useState<boolean>(false)
  const [menuLight, setMenuLight] = useState<boolean>(false)

  const values = useMemo(
    () => ({
      navIsOpen,
      setNavIsOpen,
      menuLight,
      setMenuLight,
    }),
    [menuLight, navIsOpen]
  )

  return <NavContext.Provider value={values}>{children}</NavContext.Provider>
}
