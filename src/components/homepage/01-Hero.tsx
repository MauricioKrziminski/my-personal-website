import React, { useRef } from "react"

import type { StaticImageData } from "next/image"
import gsap from "gsap"
import styled from "styled-components"

import OverlayImage from "components/OverlayImage"
import EditorOne from "images/homepage/hero/editor-01.webp"
import EditorTwo from "images/homepage/hero/editor-02.webp"
import EditorThree from "images/homepage/hero/editor-03.webp"
import EditorFour from "images/homepage/hero/editor-04.webp"
import ScreenOne from "images/homepage/hero/screen-01.webp"
import ScreenTwo from "images/homepage/hero/screen-02.webp"
import ScreenThree from "images/homepage/hero/screen-03.webp"
import ScreenFour from "images/homepage/hero/screen-04.webp"
import media from "styles/media"
import text from "styles/text"
import { useT } from "utils/i18n/useT"
import useAnimation from "utils/useAnimation"

const TIME = 3
const DURATION = 1
const STAGGER = 0.25

/** o par de fotos que se revela por clip-path; a de cima leva a classe .animate */
function Slot({
  under,
  over,
  alt,
}: {
  under: StaticImageData
  over: StaticImageData
  alt: string
}) {
  return (
    <Image>
      <ImgContainer>
        <OverlayImage src={under} alt={alt} />
        <OverlayImage className="animate" src={over} alt={alt} />
      </ImgContainer>
    </Image>
  )
}

export default function Hero() {
  const wrapper = useRef<HTMLDivElement>(null)
  const t = useT()

  useAnimation(() => {
    if (wrapper.current) {
      const images = wrapper.current.querySelectorAll(".animate")

      gsap
        .timeline({ repeat: -1 })
        .fromTo(images, { clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)" },
          {
            clipPath: "polygon(0 0%, 100% 0%, 100% 0%, 0 0%)",
            duration: DURATION,
            stagger: STAGGER,
            ease: "power2.inOut",
          }, TIME)

        // cant be a fromTo because that screwed up the beginning
        .set(
          images,
          {
            clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
          },
          (TIME + DURATION) * 2
        )
        .to(images, {
            clipPath: "polygon(0 0%, 100% 0%, 100% 100%, 0 100%)",
            duration: DURATION,
            stagger: STAGGER,
            ease: "power2.inOut",
          }, (TIME + DURATION) * 2)
    }
  }, [])

  return (
    <Outer>
      <Wrapper ref={wrapper}>
        <Row>
          <Text>{t.hero.line1}</Text>
          <Slot under={EditorOne} over={ScreenOne} alt={t.hero.alt} />
        </Row>
        <Row $flip>
          <Text>{t.hero.line2}</Text>
          <Slot under={EditorTwo} over={ScreenTwo} alt={t.hero.alt} />
        </Row>
        <Row>
          <Text>{t.hero.line3}</Text>
          <Slot under={EditorThree} over={ScreenThree} alt={t.hero.alt} />
        </Row>
        <Row $flip>
          <Text>{t.hero.line4}</Text>
          <Slot under={EditorFour} over={ScreenFour} alt={t.hero.alt} />
        </Row>
      </Wrapper>
    </Outer>
  )
}

const Outer = styled.div`
  display: grid;
  place-items: center;
  min-height: 100vh;
`

/*
 * O headline é um BLOCO JUSTIFICADO: as quatro linhas têm exatamente a mesma
 * largura, alternando texto+imagem e imagem+texto.
 *
 * A versão anterior fazia isso com um grid de 5 colunas de larguras fixas, o que
 * só funciona se as quatro frases tiverem mais ou menos o mesmo comprimento. Com
 * a cópia daqui ("Building" tem metade do tamanho de "Robust Software") sobrava
 * um vão grande de um lado e o bloco perdia o alinhamento, em PT e em EN.
 *
 * Agora cada linha é um flex: o texto ocupa o que precisa e a IMAGEM absorve a
 * sobra (flex-grow), então toda linha fecha na mesma largura sozinha, seja qual
 * for o idioma. O preço é que a proporção das imagens varia de linha para linha,
 * que é justamente o efeito procurado: quanto mais curta a frase, mais larga a
 * faixa de imagem ao lado.
 *
 * A largura do bloco sai da linha mais larga (width: max-content), e o
 * flex-basis da imagem garante que mesmo essa linha reserve espaço para a foto.
 */
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: max-content;
  margin: 0 auto;

  padding: 100px 0 60px;
  ${media.desktop} {
    padding: 6.944vw 0 4.167vw;
  }
  ${media.tablet} {
    width: 90.234vw;
  }
  ${media.mobile} {
    width: calc(100vw - 5.333vw);
  }
`

const Row = styled.div<{ $flip?: boolean }>`
  display: flex;
  /* o DOM e sempre texto -> imagem (ordem de leitura correta quando empilha no
     mobile); no desktop o $flip inverte so a direcao visual, jogando a foto
     para a esquerda nas linhas pares */
  flex-direction: ${({ $flip }) => ($flip ? "row-reverse" : "row")};
  /* stretch (padrão) de propósito: é o texto que define a altura da linha, e a
     imagem acompanha essa altura */
  gap: 20px;
  ${media.desktop} {
    gap: 1.389vw;
  }
  ${media.tablet} {
    flex-direction: column;
    gap: 0;
  }
  ${media.mobile} {
    flex-direction: column;
    gap: 0;
  }
`

const Text = styled.h1`
  ${text.h3};
  flex: 0 0 auto;
  white-space: nowrap;

  ${media.tablet} {
    font-size: 12.7vw;
    text-align: center;
  }

  ${media.mobile} {
    ${text.m1};
    /* as frases daqui são mais longas que as do layout original: sem o nowrap
       elas quebram em vez de vazar para fora da tela */
    white-space: normal;
    text-align: center;
  }
  /* bloco separado para este font-size ganhar do tamanho mobile herdado do
     text.m1; um pouco menor para a frase inteira caber na largura da coluna */
  ${media.mobile} {
    font-size: 12.8vw;
  }
`

const Image = styled.div`
  /* flex-shrink 0 de proposito: com shrink ligado, a imagem da linha mais larga
     era espremida ate 0 e o max-content do bloco saia igual ao texto sozinho.
     O flex-basis e o minimo que a foto ocupa nessa linha; nas outras ela cresce
     para fechar o bloco. */
  flex: 1 0 220px;
  overflow: hidden;
  position: relative;

  margin: 10px 0;
  border-radius: 8px;
  ${media.desktop} {
    flex-basis: 15.278vw;
    margin: 0.694vw 0;
    border-radius: 0.556vw;
  }
  ${media.tablet} {
    /* aqui a linha vira coluna: sem zerar o flex, o flex-basis passaria a valer
       como ALTURA e sobrescreveria o height abaixo */
    flex: none;
    width: 100%;
    height: 13.184vw;
    border-radius: 0.781vw;
  }
  ${media.mobile} {
    flex: none;
    width: 100%;
    height: 24vw;
    border-radius: 2.133vw;
  }
`

const ImgContainer = styled.div`
  position: absolute;
  min-height: 100%;
  min-width: 100%;
  & > div {
    position: absolute;
    top: 0;
    left: 0;
  }
`
