/**
 * Tokens de marca compartilhados pelos scripts de geração de imagem.
 *
 * Mantenha em sincronia com src/styles/colors.ts. Os scripts que rasterizam SVG
 * via sharp/librsvg não conseguem importar o TS do app, então esta é a cópia
 * canônica para eles. Se a paleta mudar lá, mude aqui também.
 */
import fs from "fs"

export const colors = {
  accent: "#FFB020",
  accentDeep: "#A66A00",
  dark: "#121110",
  white: "#FAF9F7",
}

/**
 * Embute uma woff2 como data URI num @font-face. O librsvg lê fontes assim,
 * então o texto rasterizado sai com a mesma tipografia do site em vez de cair
 * numa fonte de sistema.
 *
 * Geist é variável (100-900), e o librsvg escolhe a instância pelo font-weight
 * declarado no @font-face. Por isso declaramos um peso fixo por família em vez
 * de uma faixa: `font-weight: 100 900` faria ele renderizar no default.
 */
export const fontFace = (family, weight, file) => {
  const b64 = fs.readFileSync(file).toString("base64")
  return (
    `@font-face{font-family:'${family}';font-weight:${weight};` +
    `src:url(data:font/woff2;base64,${b64}) format('woff2');}`
  )
}

export const GEIST = "public/fonts/Geist-latin.woff2"
