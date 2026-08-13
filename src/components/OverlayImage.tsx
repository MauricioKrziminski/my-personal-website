import React from "react"

import type { StaticImageData } from "next/image"
import styled from "styled-components"

/**
 * Imagem que preenche o container do pai, recortando pelo centro.
 *
 * Já teve uma camada de textura por cima (meio-tom / granulado, herdada do port),
 * removida por decisão do Mauricio: o padrão criava moiré em cima de screenshots
 * de interface e deixava as fotos sujas. Se um dia voltar, volta como opt-in por
 * prop, não como padrão em toda imagem.
 */
type OverlayImageProps = {
  src: string | StaticImageData
  loading?: "eager" | "lazy"
  alt: string
  width?: number
  height?: number
  className?: string
}

export default function OverlayImage({
  src,
  loading = "lazy",
  alt,
  width = undefined,
  height = undefined,
  className = "",
}: OverlayImageProps) {
  /* Quando o src é um import estático, o Next já entrega as dimensões
     intrínsecas. Aproveitá-las aqui resolve de uma vez o "Image elements do not
     have explicit width and height" do Lighthouse em todos os call sites (as 8
     imagens do hero, os marquees) sem precisar repetir números à mão. O layout
     continua vindo do CSS abaixo (width/height 100% + object-fit): os atributos
     só informam a proporção ao navegador antes do download. */
  const intrinsic = typeof src === "string" ? undefined : src

  return (
    <Wrapper className={className}>
      <Image
        src={typeof src === "string" ? src : src.src}
        loading={loading}
        alt={alt}
        width={width ?? intrinsic?.width}
        height={height ?? intrinsic?.height}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  min-width: 100%;
  min-height: 100%;
`

const Image = styled.img<{ alt: string }>`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`
