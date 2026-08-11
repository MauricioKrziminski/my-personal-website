import styled from "styled-components"

import colors from "styles/colors"
import media from "styles/media"
import text from "styles/text"

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: grid;
  place-items: center;
`

export const Text = styled.h2<{ $shift?: number }>`
  color: ${colors.mainWhite};
  ${text.d4Pixel}
  position: relative;
  z-index: 3;
  text-align: center;

  /*
   * Corpo, largura e deslocamento aqui saem da GEOMETRIA do Venn, não do gosto.
   *
   * Os três círculos se sobrepõem, e o vizinho cobre o rótulo de UM lado só: no
   * círculo do Back-end é o do Data que entra pela direita, no do Data é o do
   * Back-end que entra pela esquerda, e o do Front-end fica livre. Centrar o
   * texto no centro do círculo, como era antes, jogava a primeira (ou última)
   * letra por baixo do vizinho: era isso que comia o "I" de "Infrastructure".
   *
   * $shift recentra o rótulo na parte VISÍVEL do círculo. Os 3.4% saíram de
   * medição no browser (centro da zona livre menos centro da linha mais larga),
   * não de estimativa: a invasão na altura do rótulo é bem menor do que a
   * distância entre os centros sugere. É left e não transform de propósito: o
   * GSAP anima y neste mesmo elemento e sobrescreveria um transform do CSS.
   *
   * A largura da caixa precisa ficar ENTRE a palavra mais longa ("Arquitetura",
   * ~8.4px por px de corpo) e o rótulo inteiro numa linha só. Larga demais e ele
   * para de quebrar e vira uma linha comprida; estreita demais e a palavra
   * estoura sozinha. Se a cópia ou a fonte mudarem, remeça as duas pontas.
   */
  font-size: 28px;
  left: ${({ $shift = 0 }) => $shift}%;

  ${media.fullWidth} {
    width: 74%;
  }

  ${media.desktop} {
    font-size: 1.96vw;
    width: 74%;
  }

  ${media.tablet} {
    font-size: 2.75vw;
    width: 74%;
  }

  ${media.mobile} {
    ${text.mobileVennTextPixel}
    width: 74%;
  }
`

export const BeforeText = styled.h2`
  color: ${colors.white600};
  ${text.d4Serif}
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 3;
  transform: translate(-50%, -50%);
  padding-top: 20px;

  ${media.desktop} {
    padding-top: 1.389vw;
  }
  ${media.tablet} {
    padding-top: 1.953vw;
  }
  ${media.mobile} {
    padding-top: 5.333vw;
    ${text.mobileVennTextSerif}
  }
`

export const Image = styled.img<{ alt: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  opacity: 0.08;
  z-index: 2;
`
