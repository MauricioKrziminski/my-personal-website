import React, { useEffect, useRef, useContext } from "react"

import styled from "styled-components"

import { ScreenContext } from "components/Providers"
const LogoDarkSVG = "/images/global/LogoDark.svg"
const LogoLightSVG = "/images/global/LogoLight.svg"
const LogoSmallDark = "/images/global/LogoSmallDark.svg"
const LogoSmallLight = "/images/global/LogoSmallLight.svg"
import { isBrowser, isColorLight } from "utils/functions"
import loader from "utils/Loader"
import { getLoaderIsDone } from "utils/Loader/LoaderUtils"
import { loadPage } from "utils/Loader/TransitionUtils"

type LogoProps = {
  isScrolled: boolean
}

export default function Logo({ isScrolled }: LogoProps) {
  const logo = useRef<HTMLButtonElement>(null)
  const dark = useRef<HTMLImageElement>(null)
  const light = useRef<HTMLImageElement>(null)
  const { mobile } = useContext(ScreenContext)

  // this functions job is to choose which logo to show
  // depending on what's behind the logo
  const updateLogoColor = () => {
    if (logo.current && dark.current && light.current) {
      // get the element currently at the top left of the viewport
      const elements = document.elementsFromPoint(60, 60)
      const header = document.querySelector("header")

      if (!header) return

      // find the first element not in the header and has a background color
      const element = elements.find(el => {
        return (
          !header.contains(el) &&
          window.getComputedStyle(el).getPropertyValue("background-color") !==
            "rgba(0, 0, 0, 0)"
        )
      })

      if (element) {
        // get the background color of the element
        const color = window
          .getComputedStyle(element)
          .getPropertyValue("background-color")

        if (isColorLight(color)) {
          // if the color is light, show the dark logo
          light.current.style.opacity = "0"
          dark.current.style.opacity = "1"
        } else {
          // if the color is dark, show the light logo
          light.current.style.opacity = "1"
          dark.current.style.opacity = "0"
        }
      }
    }
  }

  useEffect(() => {
    if (isBrowser()) {
      /* updateLogoColor le o layout (elementsFromPoint + getComputedStyle), o
         que forca reflow. rodar isso a cada 250ms para sempre aparecia no
         Lighthouse como "Forced reflow" e impedia a main thread de ficar
         ociosa. entao so roda quando algo pode ter mudado o fundo atras do
         logo: enquanto o loader/transicao esta rodando, e por uma janela
         curta depois de cada mudanca de scroll (as ondas do fundo levam
         alguns frames para se acomodar depois que o scroll para). */
      const SETTLE_TICKS = 8
      let lastScroll = -1
      let settling = SETTLE_TICKS

      const rearm = () => {
        settling = SETTLE_TICKS
      }

      /* uma transicao de rota troca o fundo atras do logo sem que haja
         scroll nenhum, entao a janela precisa reabrir no fim dela tambem. */
      loader.addEventListener("anyEnd", rearm)
      loader.addEventListener("transitionEnd", rearm)

      const updater = setInterval(() => {
        if (document.hidden) return

        /* Enquanto o loader cobre a pagina, elementsFromPoint devolve o
           proprio overlay: a leitura seria do preto do loader e nao do fundo
           real. Segue checando (o wipe vai revelando o hero), mas sem
           consumir a janela, que precisa valer depois que o overlay sair.
           Sem isto o logo congelava claro sobre o hero branco ate o primeiro
           scroll. */
        if (!getLoaderIsDone()) {
          requestAnimationFrame(updateLogoColor)
          return
        }

        const scroll = Math.round(window.scrollY)
        if (scroll !== lastScroll) {
          lastScroll = scroll
          rearm()
        } else if (settling <= 0) return
        else settling -= 1

        requestAnimationFrame(updateLogoColor)
      }, 250)

      return () => {
        clearInterval(updater)
        loader.removeEventListener("anyEnd", rearm)
        loader.removeEventListener("transitionEnd", rearm)
      }
    }
  }, [])

  return (
    <Wrapper
      ref={logo}
      isScrolled={isScrolled || mobile}
      onClick={() => {
        // if on homepage, scroll to top
        // otherwise load homepage
        if (window.location.pathname === "" || window.location.pathname === "/")
          window.scrollTo({ top: 0, behavior: "smooth" })
        else loadPage("/", "generic").catch(console.error)
      }}
    >
      <LogoContainer ref={dark}>
        <Jail>
          <Image src={LogoDarkSVG} alt="Mauricio Krziminski" />
        </Jail>
        <Jail>
          <Image src={LogoSmallDark} alt="Mauricio Krziminski" fetchPriority="low" />
        </Jail>
      </LogoContainer>
      <LogoContainer ref={light}>
        <Jail>
          <Image
            src={LogoLightSVG}
            alt="Mauricio Krziminski"
            aria-hidden
            fetchPriority="low"
          />
        </Jail>
        <Jail>
          <Image
            src={LogoSmallLight}
            alt="Mauricio Krziminski"
            aria-hidden
            fetchPriority="low"
          />
        </Jail>
      </LogoContainer>
    </Wrapper>
  )
}

const Jail = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  transition: width 0.2s ease-in-out;
  overflow: hidden;
`

const Wrapper = styled.button<{ isScrolled: boolean }>`
  height: 100%;
  width: 100%;
  cursor: pointer;
  position: relative;

  /* o wordmark "Mauricio Krziminski" renderiza ~294px de largura na altura do
     header (28px), e o monograma "MK" ~54px. As duas trilhas tem folga por cima
     disso; se o logo for regerado com outra fonte ou tracking, o gen-logos.mjs
     imprime a proporcao nova e avisa se estourar estes valores. */
  ${Jail}:first-child {
    width: ${props => (props.isScrolled ? "0%" : "320px")};
  }
  ${Jail}:last-child {
    width: ${props => (props.isScrolled ? "60px" : "0%")};
  }

  &:hover {
    ${Jail}:first-child {
      width: 320px;
    }
    ${Jail}:last-child {
      width: 0%;
    }
  }
`

const LogoContainer = styled.div`
  width: 100%;
  height: 100%;
  transition: 0.2s opacity ease-in-out;
  position: absolute;
  top: 0;
  left: 0;
`

const Image = styled.img<{ alt: string }>`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  max-width: none;
  width: auto;
`
