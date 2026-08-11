import React, { useEffect } from "react"

import styled from "styled-components"

import { useLocation } from "utils/useLocation"

import BackgroundCanvas from "components/BackgroundCanvas"
import FPSTracker from "components/FPSTracker"
import Header from "components/Header"
import Scroll from "components/Scroll"
import PageLoader from "components/Transition"
import { isBrowser } from "utils/functions"

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation()

  useEffect(() => {
    // add a 100vh css variable to the root element
    const update = () => {
      const vh = isBrowser() ? `${window.innerHeight}px` : "100vh"
      const oneVh = isBrowser() ? `${window.innerHeight * 0.01}px` : "1vh"
      document.documentElement.style.setProperty("--vh", oneVh)
      document.documentElement.style.setProperty("--hundred-vh", vh)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  })

  return (
    <>
      <FPSTracker />
      <PageLoader>
        {pathname === "/" && <BackgroundCanvas />}
        {(pathname === "/about" || pathname === "/about/") && (
          <BackgroundCanvas />
        )}
        {(pathname === "/projects" || pathname === "/projects/") && (
          <BackgroundCanvas />
        )}
        <Header />
        <Scroll>
          <Main>{children}</Main>
        </Scroll>
      </PageLoader>
    </>
  )
}

const Main = styled.main`
  overflow: hidden;
  position: relative;
`
