/**
 * Gera as três imagens abstratas da galeria da página Sobre ("Onde eu trabalho").
 * Rode da raiz do projeto: `node scripts/gen-gallery.mjs`
 * Saída: src/images/about/gallery/gallery-{1,2,3}.webp (1000x1300, retrato)
 *
 * Os três motivos são os mesmos dos círculos do Venn (blocos empilhados, campo de
 * pontos e wireframe de interface), recortados em retrato: a página Sobre e a
 * seção de skills passam a falar a mesma língua visual.
 */
import fs from "fs"
import sharp from "sharp"

import { colors } from "./brand.mjs"

const W = 1000
const H = 1300
const ACCENT = colors.accent

const hash = (a, b) => {
  const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453
  return s - Math.floor(s)
}

/** blocos empilhados subindo a partir da base, como um rack de serviços */
function blocks() {
  const out = []
  const PITCH = 62
  const BW = 38
  const BH = 34
  const GAP = 12
  for (let c = 0; c * PITCH < W + PITCH; c++) {
    const x = 20 + c * PITCH
    const wave = 0.5 + 0.5 * Math.sin(c * 0.55 - 0.8)
    const n = Math.max(4, Math.round(5 + wave * 16 + hash(c, 5) * 3))
    for (let b = 0; b < n; b++) {
      const y = H - 60 - b * (BH + GAP)
      out.push(
        `<rect x="${x}" y="${y}" width="${BW}" height="${BH}" rx="4" fill="${ACCENT}" ` +
          `fill-opacity="${(0.85 - (b / n) * 0.6).toFixed(2)}"/>`
      )
    }
  }
  return out
}

/** campo de pontos adensando em direção ao centro */
function dots() {
  const out = []
  const STEP = 46
  let row = 0
  for (let y = 24; y < H; y += STEP * 0.87, row++) {
    const offset = row % 2 ? STEP / 2 : 0
    for (let x = 24 + offset; x < W; x += STEP) {
      const t = 1 - Math.hypot((x - W / 2) / (W / 2), (y - H / 2) / (H / 2))
      if (t <= 0) continue
      out.push(
        `<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${(2 + 9 * t * t).toFixed(1)}" ` +
          `fill="${ACCENT}" fill-opacity="${(0.25 + 0.65 * t).toFixed(2)}"/>`
      )
    }
  }
  return out
}

/** wireframe de interface: cards, linhas de lista e barras de conteúdo */
function wireframe() {
  const out = []
  out.push(
    `<rect x="70" y="90" width="860" height="90" rx="10" stroke="${ACCENT}" stroke-width="3" fill="none"/>`,
    `<rect x="100" y="120" width="70" height="30" rx="6" fill="${ACCENT}" fill-opacity="0.9"/>`
  )
  for (let i = 0; i < 3; i++)
    out.push(
      `<rect x="${200 + i * 150}" y="128" width="110" height="16" rx="8" fill="${ACCENT}" fill-opacity="0.5"/>`
    )
  for (let i = 0; i < 18; i++) {
    const y = 240 + i * 46
    out.push(
      `<rect x="70" y="${y}" width="22" height="22" rx="5" fill="${ACCENT}" fill-opacity="0.85"/>`,
      `<rect x="110" y="${y + 6}" width="${(240 + hash(i, 3) * 180).toFixed(0)}" height="11" rx="5" fill="${ACCENT}" fill-opacity="0.4"/>`,
      `<rect x="560" y="${y + 6}" width="${(180 + hash(i, 9) * 200).toFixed(0)}" height="11" rx="5" fill="${ACCENT}" fill-opacity="0.35"/>`
    )
  }
  for (let i = 0; i < 3; i++)
    out.push(
      `<rect x="${70 + i * 300}" y="1090" width="260" height="140" rx="12" stroke="${ACCENT}" stroke-width="3" fill="none"/>`,
      `<rect x="${100 + i * 300}" y="1130" width="120" height="20" rx="10" fill="${ACCENT}" fill-opacity="0.7"/>`
    )
  return out
}

async function render(marks, out) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
    <defs><radialGradient id="glow" cx="42%" cy="38%" r="75%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.16"/>
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient></defs>
    <rect width="${W}" height="${H}" fill="${colors.dark}"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>
    ${marks.join("")}
  </svg>`
  await sharp(Buffer.from(svg)).webp({ quality: 88 }).toFile(out)
  return `${out} ${W}x${H}`
}

fs.mkdirSync("src/images/about/gallery", { recursive: true })
console.log(await render(blocks(), "src/images/about/gallery/gallery-1.webp"))
console.log(await render(dots(), "src/images/about/gallery/gallery-2.webp"))
console.log(await render(wireframe(), "src/images/about/gallery/gallery-3.webp"))
