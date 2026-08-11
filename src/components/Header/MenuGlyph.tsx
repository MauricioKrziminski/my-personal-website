import React from "react"

import styled from "styled-components"

import colors from "styles/colors"
import easing from "styles/easing"

type MenuGlyphProps = {
  isCloseButton?: boolean
}

/**
 * Marca do menu no header: três barras inclinadas, um "///" que remete a
 * comentário de código. Quando o menu abre, as mesmas três barras giram e se
 * sobrepõem virando um X, por isso elas precisam ter altura igual.
 */
export default function MenuGlyph({ isCloseButton = false }: MenuGlyphProps) {
  return (
    <Glyph>
      <Bar isCloseButton={isCloseButton} />
      <Bar isCloseButton={isCloseButton} />
      <Bar isCloseButton={isCloseButton} />
    </Glyph>
  )
}

const Glyph = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  gap: 7px;
`

const Bar = styled.div<{ isCloseButton?: boolean }>`
  background-color: ${colors.mainAccent};
  transition: transform 0.3s ${easing.main};

  height: 25px;
  width: 3px;
  transform: rotate(-20deg);

  /* hover state is found in parent */
  ${props =>
    props.isCloseButton &&
    `
      /* X mode: as barras das pontas se cruzam no centro e a do meio some junto
         com elas, formando um X limpo porque todas têm a mesma altura */
      &:nth-child(1) {
        transform: translate(10px, 0) rotate(45deg);
      }

      &:nth-child(2) {
        transform: rotate(45deg);
      }

      &:nth-child(3) {
        transform: translate(-10px, 0) rotate(-45deg);
      }
    `}
`
