import React from "react"

import styled from "styled-components"

import linkArrowSVG from "images/global/linkArrow.svg"
import colors from "styles/colors"
import easing from "styles/easing"
import media from "styles/media"
import text from "styles/text"

type MainButtonProps = {
  children: string
  onClick?: VoidFunction
  /**
   *  The button has different shadow colors depending on the background
   *  This should be true if the background is dark
   */
  darkBackground: boolean
  /**
   * "submit" para usar o botão dentro de um <form>. O default "button"
   * mantém o comportamento dos consumidores que já existiam.
   */
  type?: "button" | "submit"
  disabled?: boolean
}

export default function MainButton({
  children,
  onClick = undefined,
  darkBackground,
  type = "button",
  disabled = false,
}: MainButtonProps) {
  return (
    <Wrapper
      darkBackground={darkBackground}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      <TextWrapper>
        {children}
        <Line />
      </TextWrapper>
      <Arrow />
    </Wrapper>
  )
}

const Line = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 1px;
  background-color: ${colors.mainBlack};
  transition: width 0.5s ${easing.main};
`

const Arrow = styled(linkArrowSVG)`
  display: inline-block;
  transition: transform 0.5s ${easing.main};

  * {
    fill: ${colors.mainBlack};
  }

  width: 20px;
  height: 8px;
  margin-left: 15px;
  ${media.desktop} {
    width: 1.389vw;
    height: 0.556vw;
    margin-left: 1.042vw;
  }
  ${media.tablet} {
    width: 1.953vw;
    height: 0.781vw;
    margin-left: 1.465vw;
  }
  ${media.mobile} {
    width: 5.333vw;
    height: 2.133vw;
    margin-left: 4vw;
  }
`

const Wrapper = styled.button<{ darkBackground: boolean }>`
  ${text.buttonMain}
  background-color: ${colors.mainAccent};
  color: ${colors.mainBlack};
  transition: box-shadow 0.3s ${easing.main};
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  /* Sombras derivadas do accent ambar. Eram verdes (rgba(16,94,29) e
     rgba(18,146,39)), sobra da identidade visual anterior, e brigavam com
     o proprio botao, que e accent500. Sobre fundo escuro vale um brilho
     luminoso (accent500); sobre fundo claro, uma sombra quente e mais
     escura (accent800), que e o que a rampa tem para esse papel. */
  box-shadow: ${({ darkBackground }) =>
    darkBackground
      ? "1px 8px 20px rgba(255, 176, 32, 0.35);"
      : "1px 8px 20px rgba(122, 78, 0, 0.25);"};

  &:hover {
    cursor: pointer;
    box-shadow: ${({ darkBackground }) =>
      darkBackground
        ? "1px 4px 10px rgba(255, 176, 32, 0.35);"
        : "1px 4px 10px rgba(122, 78, 0, 0.25);"};
    ${Line} {
      width: 100%;
    }
    ${Arrow} {
      transform: translateX(5px);
    }
  }

  /* depois do &:hover de proposito: senao o cursor: pointer dele
     venceria enquanto o botao esta desabilitado durante o envio */
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  padding: 20px 30px;
  border-radius: 5px;
  ${media.desktop} {
    padding: 1.389vw 2.083vw;
    border-radius: 0.347vw;
  }
  ${media.tablet} {
    padding: 1.953vw 2.93vw;
    border-radius: 0.488vw;
  }
  ${media.mobile} {
    padding: 5.333vw 8vw;
    border-radius: 1.333vw;
    width: 100%;
  }
`

const TextWrapper = styled.div`
  position: relative;
  text-transform: uppercase;
`
