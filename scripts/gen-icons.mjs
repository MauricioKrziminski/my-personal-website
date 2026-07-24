/**
 * Gera o favicon/ícones: lockup do logo do header (MK preto sobre o branco da
 * aplicação, com o traço verde embaixo) num tile de cantos arredondados.
 * Rode da raiz do projeto: `node scripts/gen-icons.mjs`
 * Saída: src/app/icon.png (512), src/app/apple-icon.png (180), src/app/favicon.ico (16/32/48).
 */
import fs from "fs"
import sharp from "sharp"

const GREEN = "#2BEE4B" // colors.mainGreen, mesma cor do traço no logo do header
const DARK = "#121613" // colors.mainBlack
const WHITE = "#fafffa" // colors.mainWhite, o fundo claro da aplicação

// proporções escolhidas comparando renders reais em 16px e 32px: abaixo de 0.88
// as letras esmaecem na aba, e o traço fino demais vira um verde lavado
const LETTER_RATIO = 0.82 // largura do "MK" em relação ao lado do tile
const BAR_RATIO = 0.22 // espessura do traço em relação à altura das maiúsculas
const GAP_RATIO = 0.15 // respiro entre as letras e o traço
const CORNER_RATIO = 0.18 // raio dos cantos

// fonte real do site, embutida como data URI (librsvg lê woff2 via @font-face)
const woff2 = fs.readFileSync("public/fonts/TWKLausanne-550.woff2").toString("base64")
const fontFace = `@font-face{font-family:'TWK Lausanne';font-weight:550;src:url(data:font/woff2;base64,${woff2}) format('woff2');}`

const textEl = (fontSize, x, y) =>
  `<text x="${x}" y="${y}" font-family="'TWK Lausanne'" font-weight="550" font-size="${fontSize}"` +
  ` letter-spacing="${-0.0375 * fontSize}" fill="${DARK}">MK</text>`

/**
 * Mede a caixa de TINTA do "MK" (não a caixa de avanço da fonte, que tem
 * sidebearing e o letter-spacing sobrando à direita: era isso que fazia o
 * monograma parecer deslocado/cortado à esquerda quando centrado pelo avanço).
 */
const F0 = 560
const probe = await sharp(
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="900">
      <defs><style>${fontFace}</style></defs>${textEl(F0, 800, 650)}</svg>`
  )
)
  .png()
  .trim({ threshold: 0 })
  .toBuffer({ resolveWithObject: true })

const k = {
  w: probe.info.width / F0,
  h: probe.info.height / F0,
  left: (probe.info.trimOffsetLeft * -1 - 800) / F0, // trimOffsetLeft vem negativo
  top: (probe.info.trimOffsetTop * -1 - 650) / F0,
}
console.log("tinta do MK @", F0, "->", probe.info.width, "x", probe.info.height)

/** um ícone quadrado, rasterizado direto no tamanho final (nada de downscale) */
async function icon(size) {
  const inkW = size * LETTER_RATIO
  const fontSize = inkW / k.w
  const inkH = k.h * fontSize
  const barH = Math.max(1, Math.round(BAR_RATIO * inkH))
  const gap = GAP_RATIO * inkH

  const left = (size - inkW) / 2
  const top = (size - (inkH + gap + barH)) / 2

  // posiciona o texto de forma que a caixa de tinta caia exatamente em left/top
  const x = left - k.left * fontSize
  const y = top - k.top * fontSize

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    <defs><style>${fontFace}</style></defs>
    <rect width="${size}" height="${size}" rx="${size * CORNER_RATIO}" fill="${WHITE}"/>
    ${textEl(fontSize, x, y)}
    <rect x="${left}" y="${top + inkH + gap}" width="${inkW}" height="${barH}" fill="${GREEN}"/>
  </svg>`

  return sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer()
}

const png512 = await icon(512)
fs.writeFileSync("src/app/icon.png", png512)
fs.writeFileSync("src/app/apple-icon.png", await icon(180))

// confere que a tinta ficou centrada (padding esquerdo == direito)
const check = await sharp(png512)
  .extractChannel("red")
  .trim({ threshold: 10 })
  .toBuffer({ resolveWithObject: true })
console.log(
  "recorte do conteudo no 512:",
  check.info.width + "x" + check.info.height,
  "| sobra esquerda:",
  -check.info.trimOffsetLeft,
  "| sobra direita:",
  512 - check.info.width + check.info.trimOffsetLeft
)

// favicon.ico com PNGs embutidos (formato Vista+, aceito por todos os browsers atuais)
const sizes = [16, 32, 48]
const pngs = await Promise.all(sizes.map(icon))
const header = Buffer.alloc(6)
header.writeUInt16LE(0, 0)
header.writeUInt16LE(1, 2) // type: ícone
header.writeUInt16LE(sizes.length, 4)
let offset = 6 + 16 * sizes.length
const entries = sizes.map((s, i) => {
  const e = Buffer.alloc(16)
  e.writeUInt8(s === 256 ? 0 : s, 0)
  e.writeUInt8(s === 256 ? 0 : s, 1)
  e.writeUInt8(0, 2)
  e.writeUInt8(0, 3)
  e.writeUInt16LE(1, 4)
  e.writeUInt16LE(32, 6)
  e.writeUInt32LE(pngs[i].length, 8)
  e.writeUInt32LE(offset, 12)
  offset += pngs[i].length
  return e
})
fs.writeFileSync("src/app/favicon.ico", Buffer.concat([header, ...entries, ...pngs]))

console.log("icon.png", png512.length, "bytes | favicon.ico", fs.statSync("src/app/favicon.ico").size, "bytes")
