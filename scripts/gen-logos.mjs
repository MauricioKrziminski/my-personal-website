/**
 * Gera os 4 SVGs do logo do header: wordmark completo e monograma "MK", cada um
 * na versão para fundo claro (Dark) e para fundo escuro (Light).
 * Rode da raiz do projeto: `node scripts/gen-logos.mjs`
 * Saída: src/images/global/Logo{Dark,Light,SmallDark,SmallLight}.svg
 *        + cópia idêntica em public/images/global/ (o Logo.tsx carrega via <img src>)
 *
 * A Geist vai embutida como data URI dentro do próprio SVG: o <img> não herda o
 * @font-face do documento, então sem isso o logo cairia numa fonte de sistema.
 *
 * POR QUE `textLength` E NÃO UM viewBox MEDIDO:
 * a primeira versão deste script media a tinta rasterizando com o sharp e
 * recortando. O viewBox saía 846 de largura, mas o Chrome desenha o mesmo texto
 * com 889 (o librsvg e o HarfBuzz do browser aplicam letter-spacing e bearings
 * de formas diferentes), e o "i" final ficava cortado no header. Com `textLength`
 * + `lengthAdjust="spacingAndGlyphs"` é o SVG que manda: todo renderizador encaixa
 * o texto exatamente na largura declarada, então o viewBox nunca corta. A diferença
 * de shaping vira uma compressão/expansão de ~3%, imperceptível num wordmark.
 *
 * As métricas abaixo saíram do Chrome (canvas TextMetrics, que dá a tinta real):
 *   const c = document.createElement("canvas").getContext("2d")
 *   c.font = "600 100px Geist"; c.letterSpacing = "-2px"
 *   c.measureText("Mauricio Krziminski")
 * Só precisam ser refeitas se a fonte, o peso ou o tracking mudarem.
 */
import fs from "fs"
import path from "path"

import { colors, fontFace, GEIST } from "./brand.mjs"

const face = fontFace("Geist", 600, GEIST)

// tinta em duas cores: o nome no tom do tema e o sobrenome no accent. Em fundo
// claro o accent puro não tem contraste suficiente, então lá entra o tom fechado.
const ON_LIGHT = { ink: colors.dark, accent: colors.accentDeep }
const ON_DARK = { ink: colors.white, accent: colors.accent }

const FS = 100 // corpo de referência das métricas; o viewBox normaliza depois
const TRACKING = -2 // -0.02em, o mesmo tracking dos títulos em styles/text.ts
const PAD_X = 5
/**
 * Folga vertical de 8% da altura da tinta. As maiúsculas acentuadas sobem e as
 * descidas (g, j, p, q, y) descem para fora da caixa da linha; sem essa folga o
 * `overflow: hidden` do Jail raspa a letra. "Mauricio Krziminski" não tem descida,
 * mas a folga fica para qualquer texto futuro que passe por aqui.
 */
const PAD_Y = 0.08

const LOGOS = {
  // advance/ascent/descent medidos no Chrome, ver cabeçalho
  wordmark: { first: "Mauricio ", second: "Krziminski", advance: 890, ascent: 72, descent: 2 },
  monogram: { first: "M", second: "K", advance: 150, ascent: 71, descent: 0 },
}

function build({ first, second, advance, ascent, descent }, theme) {
  const inkH = ascent + descent
  const padY = inkH * PAD_Y
  const w = advance + PAD_X * 2
  const h = inkH + padY * 2
  const baseline = padY + ascent

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h.toFixed(2)}" fill="none">\n` +
    `  <defs><style>${face}</style></defs>\n` +
    `  <text x="${PAD_X}" y="${baseline.toFixed(2)}" textLength="${advance}" ` +
    `lengthAdjust="spacingAndGlyphs" font-family="Geist" font-weight="600" ` +
    `font-size="${FS}" letter-spacing="${TRACKING}" xml:space="preserve">` +
    `<tspan fill="${theme.ink}">${first}</tspan>` +
    `<tspan fill="${theme.accent}">${second}</tspan>` +
    `</text>\n</svg>\n`
  )
}

function write(name, spec, theme) {
  const svg = build(spec, theme)
  for (const dir of ["src/images/global", "public/images/global"]) {
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, `${name}.svg`), svg, "utf8")
  }
  const [, w, h] = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/)
  return w / h
}

const wide = write("LogoDark", LOGOS.wordmark, ON_LIGHT)
write("LogoLight", LOGOS.wordmark, ON_DARK)
const small = write("LogoSmallDark", LOGOS.monogram, ON_LIGHT)
write("LogoSmallLight", LOGOS.monogram, ON_DARK)

// o Jail do Logo.tsx clipa numa largura fixa, com o logo em height:100%/width:auto.
// Se a proporção crescer além do Jail, o logo corta: avisa antes de ir pro browser.
const HEADER_H = 28
for (const [label, ratio, jail] of [
  ["wordmark ", wide, 320],
  ["monograma", small, 60],
]) {
  const rendered = ratio * HEADER_H
  console.log(
    `${label} proporção ${ratio.toFixed(2)} -> ~${rendered.toFixed(0)}px a ${HEADER_H}px de altura ` +
      `(Jail ${jail}px: ${rendered <= jail ? "ok" : "ESTOURA, aumente no Logo.tsx"})`
  )
}
