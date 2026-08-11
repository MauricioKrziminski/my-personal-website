/**
 * Gera as texturas e os tiles de fundo do site.
 * Rode da raiz do projeto: `node scripts/gen-textures.mjs`
 *
 * Saída:
 *   src/images/global/dark-tile.webp   fundo dos blocos escuros
 *   src/images/global/light-tile.webp   fundo dos blocos claros
 *   src/images/header/grain.webp                      ruído do header
 *
 * Todos precisam ladrilhar sem emenda: são usados com `background: url(...) repeat`.
 * As ondas usam um número inteiro de períodos na largura e um espaçamento que
 * divide a altura, então a costura fecha nos dois eixos. O ruído usa um PRNG com
 * semente fixa em vez de Math.random para o build ser reproduzível.
 */
import sharp from "sharp"

import { colors } from "./brand.mjs"

/** mulberry32: PRNG pequeno e determinístico */
const rng = seed => () => {
  seed = (seed + 0x6d2b79f5) | 0
  let t = seed
  t = Math.imul(t ^ (t >>> 15), t | 1)
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

/** ruído monocromático: cada pixel um cinza aleatório em torno de 50% */
async function noise(w, h, spread, seed, out) {
  let s = seed
  const next = () => {
    s = (s + 1) | 0
    return rng(s)()
  }
  const buf = Buffer.alloc(w * h * 3)
  for (let i = 0; i < w * h; i++) {
    const v = Math.max(0, Math.min(255, Math.round(128 + (next() - 0.5) * spread)))
    buf[i * 3] = buf[i * 3 + 1] = buf[i * 3 + 2] = v
  }
  await sharp(buf, { raw: { width: w, height: h, channels: 3 } })
    .webp({ quality: 92 })
    .toFile(out)
  return `${out} ${w}x${h}`
}

/**
 * Tile de fundo: base sólida com hairlines onduladas quase invisíveis. `lines`
 * é o número de linhas na altura e `periods` o número de períodos da onda na
 * largura; ambos inteiros para a emenda fechar.
 */
async function waveTile(w, h, base, line, lines, periods, amp, out) {
  const paths = []
  for (let i = 0; i < lines; i++) {
    const y = ((i + 0.5) * h) / lines
    const pts = []
    const STEPS = 60
    for (let sx = 0; sx <= STEPS; sx++) {
      const x = (sx * w) / STEPS
      const yy = y + amp * Math.sin((2 * Math.PI * periods * x) / w)
      pts.push(`${sx === 0 ? "M" : "L"}${x.toFixed(2)} ${yy.toFixed(2)}`)
    }
    paths.push(`<path d="${pts.join("")}" stroke="${line}" stroke-width="0.7" fill="none"/>`)
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">
    <rect width="${w}" height="${h}" fill="${base}"/>${paths.join("")}</svg>`
  await sharp(Buffer.from(svg)).webp({ quality: 95 }).toFile(out)
  return `${out} ${w}x${h}`
}

console.log(
  [
    await waveTile(500, 300, colors.dark, "#1d1b18", 60, 3, 2.2, "src/images/global/dark-tile.webp"),
    await waveTile(348, 348, colors.white, "#efece7", 58, 2, 2.2, "src/images/global/light-tile.webp"),
    await noise(500, 308, 210, 90210, "src/images/header/grain.webp"),
  ].join("\n")
)
