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

/**
 * Rotas que pintam o proprio fundo (as faixas clara/escura e as ondas) via
 * BackgroundCanvas.
 *
 * Uma rota que NAO estiver nesta lista renderiza sem fundo nenhum, e como os
 * heros escuros escrevem em mainWhite o titulo fica branco no branco, ou seja
 * invisivel. Foi exatamente o que aconteceu quando /contact foi criada: a
 * pagina existia e montava <Section isDark>, mas o canvas nunca era montado.
 *
 * Ao adicionar uma rota nova com <Section>, adicione-a aqui tambem.
 */
const BACKGROUND_ROUTES = ["/", "/about", "/projects", "/contact"]

export default function Layout({ children }: LayoutProps) {
  const { pathname } = useLocation()
  const usesBackground = BACKGROUND_ROUTES.some(
    route => pathname === route || pathname === `${route}/`,
  )

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
        {usesBackground && <BackgroundCanvas />}
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
