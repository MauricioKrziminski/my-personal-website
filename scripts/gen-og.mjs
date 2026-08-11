/**
 * Gera a OG image (preview de link em WhatsApp/LinkedIn/X) em 1200x630.
 * Rode da raiz do projeto: `node scripts/gen-og.mjs`
 * Saída: public/images/og-default.png (referenciada por siteMetadata.image).
 * Rode de novo se o nome/cargo da capa mudar.
 */
import fs from "fs"
import sharp from "sharp"

import { colors, fontFace, GEIST } from "./brand.mjs"

const W = 1200
const H = 630
const ACCENT = colors.accent
const DARK = colors.dark
const WHITE = colors.white
const MUTED = "#B7B2AC"

// Geist e variavel: o librsvg escolhe a instancia pelo peso do @font-face, entao
// declaramos os tres pesos que o layout usa como familias de mesmo nome.
const fonts = [
  fontFace("Geist", 600, GEIST),
  fontFace("Geist", 400, GEIST),
  fontFace("Geist", 250, GEIST),
].join(String.fromCharCode(10))

// caricatura sangrando na direita, cantos arredondados como os cards do site
const CW = 430
const CH = 530
const CX = W - CW - 72
const CY = (H - CH) / 2

const mask = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${CW}" height="${CH}"><rect width="${CW}" height="${CH}" rx="20" fill="#fff"/></svg>`
)
const portrait = await sharp("src/images/team/caricatura.png")
  .resize(CW, CH, { fit: "cover", position: "top" })
  .composite([{ input: mask, blend: "dest-in" }])
  .png()
  .toBuffer()

const layout = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">
  <defs><style>${fonts}</style></defs>
  <rect width="${W}" height="${H}" fill="${DARK}"/>

  <text x="72" y="150" font-family="Geist" font-weight="400" font-size="22"
        letter-spacing="3.4" fill="${ACCENT}">MAURICIOKRZIMINSKI.COM.BR</text>

  <text x="72" y="266" font-family="Geist" font-weight="600" font-size="82"
        letter-spacing="-3" fill="${WHITE}">Mauricio</text>
  <text x="72" y="352" font-family="Geist" font-weight="600" font-size="82"
        letter-spacing="-3" fill="${WHITE}">Krziminski</text>

  <rect x="72" y="396" width="72" height="6" fill="${ACCENT}"/>

  <text x="72" y="466" font-family="Geist" font-weight="250" font-size="30"
        fill="${MUTED}">Desenvolvedor de Software Full-stack</text>
  <text x="72" y="508" font-family="Geist" font-weight="250" font-size="30"
        fill="${MUTED}">Porto Alegre, RS</text>

  <rect x="0" y="${H - 10}" width="${W}" height="10" fill="${ACCENT}"/>
</svg>`)

await sharp(layout)
  .composite([{ input: portrait, left: CX, top: Math.round(CY) }])
  .png({ compressionLevel: 9 })
  .toFile("public/images/og-default.png")

const meta = await sharp("public/images/og-default.png").metadata()
console.log("og-default.png", meta.width + "x" + meta.height, fs.statSync("public/images/og-default.png").size, "bytes")
