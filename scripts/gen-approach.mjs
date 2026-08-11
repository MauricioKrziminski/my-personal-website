/**
 * Gera a arte dos três círculos do Venn da seção "Como eu trabalho" e o triângulo
 * de interseção. Rode da raiz do projeto: `node scripts/gen-approach.mjs`
 *
 * Saída (src/images/homepage/approach/):
 *   backend.svg   + backend-background.webp    pilar Back-end   (Finance.tsx)
 *   data.svg      + infra-background.webp       pilar Dados      (Data.tsx)
 *   frontend.svg  + frontend-background.webp   pilar Front-end  (Blockchain.tsx)
 *   intersection.svg (+ cópia em public/, carregada via <img src>)
 *
 * CONTRATO COM AS ANIMAÇÕES — leia antes de mexer na geometria.
 * Cada componente busca os elementos dentro do seu próprio SVG e anima por tipo
 * de tag, não por id. Então a forma pode mudar à vontade, mas a estrutura não:
 *
 *   backend.svg   Finance.tsx  querySelectorAll("rect") menos os .background
 *                 -> TODO <rect> que não deve animar (fundo, clipPath) precisa
 *                    de class="background". Anima scaleY 0 -> 1, escalonado.
 *   data.svg      Data.tsx     querySelectorAll("circle:not(.specialBackground)")
 *                 -> o círculo de fundo precisa de class="specialBackground", e o
 *                    clipPath usa <rect rx> (retângulo não é consultado aqui).
 *                    Anima scale 10 -> 1 vindo de posições aleatórias.
 *   frontend.svg  Blockchain.tsx querySelectorAll("g") filtrando .one/.two/.three/.four
 *                 -> cada peça da composição vive num <g> com uma dessas classes.
 *                    one entra de cima, two da diagonal superior esquerda, three
 *                    de baixo, four da diagonal inferior direita. As contagens não
 *                    importam para o código, só as classes.
 *
 * E existe um QUARTO consumidor, fácil de esquecer: `Approach/Venn.tsx` faz um cull
 * de performance durante o zoom (`setSVGdisplay`), que põe `display="none"` em
 * TODOS os descendentes de cada SVG **menos os que têm `class="specialBackground"`**.
 * Ou seja: o disco de fundo dos três círculos precisa dessa classe, senão ele some
 * junto com o resto e o círculo fica claro no diagrama expandido. Por isso o fundo
 * dos três é um `<circle class="specialBackground">`, e não um `<rect>`.
 *
 * O SVGO do next.config.ts já está configurado para não converter shape em path,
 * não colapsar <g> e não renomear classes justamente por causa disto.
 */
import fs from "fs"
import path from "path"
import sharp from "sharp"

import { colors } from "./brand.mjs"

const SIZE = 560
const C = SIZE / 2
const R = SIZE / 2
const ACCENT = colors.accent
const FIELD = "#221e19" // fundo do círculo, o mainBlack levemente aquecido
const DIR = "src/images/homepage/approach"

/** ruído determinístico em [0,1) a partir de dois inteiros */
const hash = (a, b) => {
  const s = Math.sin(a * 127.1 + b * 311.7) * 43758.5453
  return s - Math.floor(s)
}

const svgWrap = (inner, defs) =>
  `<svg viewBox="0 0 ${SIZE} ${SIZE}" fill="none" xmlns="http://www.w3.org/2000/svg">` +
  `<defs>${defs}</defs>${inner}</svg>\n`

/* ------------------------------------------------------------------ back-end */
/**
 * Colunas de blocos empilhados, como um rack de serviços subindo. Cada bloco é
 * um <rect> com matrix(1 0 0 -1 x y) para ficar ancorado pela base, do mesmo jeito
 * que a versão anterior fazia, então o scaleY do GSAP se comporta igual.
 */
function backend() {
  const COLS = 17
  const PITCH = 30
  const W = 18
  const BLOCK = 16
  const GAP = 6
  const BASE = 490
  const x0 = (SIZE - (COLS - 1) * PITCH - W) / 2

  const rects = []
  for (let c = 0; c < COLS; c++) {
    const x = x0 + c * PITCH
    // perfil suave (duas ondas) + uma pitada de ruído, para não ficar simétrico
    const wave = 0.5 + 0.5 * Math.sin((c / COLS) * Math.PI * 1.7 - 0.6)
    const n = Math.max(3, Math.round(3 + wave * 10 + hash(c, 7) * 2))
    for (let b = 0; b < n; b++) {
      const y = BASE - b * (BLOCK + GAP)
      const op = (0.95 - (b / n) * 0.55).toFixed(2)
      rects.push(
        `<rect width="${W}" height="${BLOCK}" rx="2" ` +
          `transform="matrix(1 0 0 -1 ${x} ${y})" fill="${ACCENT}" fill-opacity="${op}"></rect>`
      )
    }
  }

  // O disco de fundo é um <circle class="specialBackground">, não um <rect>, por
  // dois motivos: <circle> nem entra na seleção do Backend.tsx (que busca "rect"),
  // e a classe é a única que sobrevive ao cull do Venn.tsx (ver cabeçalho).
  const inner =
    `<circle class="specialBackground" cx="${C}" cy="${C}" r="${R}" fill="${FIELD}"></circle>` +
    `<g clip-path="url(#backendClip)">${rects.join("")}</g>`
  const defs =
    `<clipPath id="backendClip">` +
    `<rect class="background" width="${SIZE}" height="${SIZE}" rx="${R}" fill="white"></rect>` +
    `</clipPath>`
  return { svg: svgWrap(inner, defs), count: rects.length }
}

/* ---------------------------------------------------------------------- data */
/**
 * Matriz de pontos em empacotamento hexagonal, mais densa e opaca no centro:
 * lê como um campo de dados condensando. Só <circle>, que é o que o Data.tsx anima.
 */
function data() {
  const STEP = 30
  const circles = []
  let row = 0
  for (let y = 25; y <= SIZE - 25; y += STEP * 0.87, row++) {
    const offset = row % 2 ? STEP / 2 : 0
    for (let x = 25 + offset; x <= SIZE - 25; x += STEP) {
      const dist = Math.hypot(x - C, y - C)
      if (dist > R - 12) continue
      const t = 1 - dist / R
      const r = 1.6 + 4.2 * Math.pow(t, 1.5)
      const op = (0.3 + 0.7 * t).toFixed(2)
      circles.push(
        `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(2)}" ` +
          `fill="${ACCENT}" fill-opacity="${op}"></circle>`
      )
    }
  }

  const inner =
    `<circle class="specialBackground" cx="${C}" cy="${C}" r="${R}" fill="${FIELD}"></circle>` +
    `<g clip-path="url(#dataClip)">${circles.join("")}</g>`
  // clipPath com <rect rx>, não <circle>: um <circle> aqui entraria na seleção do Data.tsx
  const defs =
    `<clipPath id="dataClip">` +
    `<rect width="${SIZE}" height="${SIZE}" rx="${R}" fill="white"></rect>` +
    `</clipPath>`
  return { svg: svgWrap(inner, defs), count: circles.length }
}

/* ------------------------------------------------------------------ front-end */
/**
 * Um wireframe de interface que se monta pelos quatro lados: barra de topo
 * (one, entra de cima), lista à esquerda (two, diagonal superior esquerda),
 * cards de baixo (three, entra de baixo) e linhas de conteúdo à direita
 * (four, diagonal inferior direita).
 */
function frontend() {
  const piece = (cls, body) => `<g class="${cls}">${body}</g>`
  const outline = (x, y, w, h, r = 4) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" ` +
    `stroke="${ACCENT}" stroke-width="1.6" fill="none"></rect>`
  const bar = (x, y, w, h, op = 0.85, r = 3) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" ` +
    `fill="${ACCENT}" fill-opacity="${op}"></rect>`

  const groups = []

  // one: barra de topo (bloco de marca + 3 pílulas de navegação)
  groups.push(piece("one", outline(96, 92, 40, 36) + bar(104, 104, 24, 12, 0.9)))
  for (let i = 0; i < 3; i++) {
    const x = 152 + i * 82
    groups.push(piece("one", outline(x, 92, 70, 36) + bar(x + 12, 105, 46, 10, 0.55)))
  }

  // two: lista à esquerda (marcador + linha)
  for (let i = 0; i < 10; i++) {
    const y = 168 + i * 26
    groups.push(
      piece("two", bar(96, y, 10, 10, 0.9, 2) + bar(114, y + 2, 118 - (i % 3) * 22, 6, 0.4))
    )
  }

  // three: cards de estatística embaixo, duas fileiras de quatro
  for (let i = 0; i < 8; i++) {
    const col = i % 4
    const row = Math.floor(i / 4)
    const x = 150 + col * 78
    const y = 438 + row * 52
    groups.push(piece("three", outline(x, y, 66, 42) + bar(x + 10, y + 12, 30, 8, 0.7)))
  }

  // four: linhas de conteúdo à direita
  for (let i = 0; i < 10; i++) {
    const y = 168 + i * 26
    const w = 150 - (i % 4) * 26
    groups.push(piece("four", bar(276, y + 2, w, 6, 0.45) + bar(276 + w + 8, y + 2, 10, 6, 0.85, 2)))
  }

  const inner =
    `<circle class="specialBackground" cx="${C}" cy="${C}" r="${R}" fill="${FIELD}"></circle>` +
    `<g clip-path="url(#frontendClip)">${groups.join("")}</g>`
  const defs =
    `<clipPath id="frontendClip">` +
    `<rect width="${SIZE}" height="${SIZE}" rx="${R}" fill="white"></rect>` +
    `</clipPath>`
  return { svg: svgWrap(inner, defs), count: groups.length }
}

/* ------------------------------------------------------------- interseção ---- */
/**
 * O triângulo curvo é a interseção real dos três círculos do Venn, então a forma
 * é geometria, não desenho: dá para derivá-la. Os três círculos têm raio R e
 * centros num triângulo equilátero de lado d (dois em cima, um embaixo). Os
 * vértices são os cruzamentos par a par que caem dentro do terceiro círculo, e
 * cada lado é um arco do círculo oposto.
 *
 * O componente posiciona a imagem por largura com height:auto sobre o Venn, então
 * a proporção precisa bater com a do layout: procuramos por bisseção o d/R que dá
 * a proporção alvo e depois escalamos para a caixa final.
 */
function intersection(boxW = 65, boxH = 59) {
  const TARGET = 64.6258 / 58.3231 // proporção da sobreposição no layout do Venn

  const shape = ratio => {
    const r = 1
    const d = ratio // d/R, com R = 1
    const k = (d * Math.sqrt(3)) / 2
    const A = [-d / 2, 0]
    const B = [d / 2, 0]
    const Cc = [0, k]
    const h = Math.sqrt(r * r - (d * d) / 4)

    const inside = (p, o) => Math.hypot(p[0] - o[0], p[1] - o[1]) <= r + 1e-9
    const cross = (o1, o2) => {
      const dx = o2[0] - o1[0]
      const dy = o2[1] - o1[1]
      const dist = Math.hypot(dx, dy)
      const a = dist / 2
      const hh = Math.sqrt(Math.max(0, r * r - a * a))
      const m = [o1[0] + dx / 2, o1[1] + dy / 2]
      const p = [-dy / dist, dx / dist]
      return [
        [m[0] + hh * p[0], m[1] + hh * p[1]],
        [m[0] - hh * p[0], m[1] - hh * p[1]],
      ]
    }

    const vAB = cross(A, B).find(p => inside(p, Cc))
    const vAC = cross(A, Cc).find(p => inside(p, B))
    const vBC = cross(B, Cc).find(p => inside(p, A))
    if (!vAB || !vAC || !vBC) return null

    // amostra os três arcos para medir a caixa de verdade (o arco de baixo do
    // círculo C estufa para cima, além dos vértices)
    const arc = (from, to, center) => {
      const a0 = Math.atan2(from[1] - center[1], from[0] - center[0])
      let a1 = Math.atan2(to[1] - center[1], to[0] - center[0])
      while (a1 - a0 > Math.PI) a1 -= 2 * Math.PI
      while (a0 - a1 > Math.PI) a1 += 2 * Math.PI
      const pts = []
      for (let i = 0; i <= 48; i++) {
        const a = a0 + ((a1 - a0) * i) / 48
        pts.push([center[0] + r * Math.cos(a), center[1] + r * Math.sin(a)])
      }
      return pts
    }
    const pts = [...arc(vAC, vBC, Cc), ...arc(vBC, vAB, B), ...arc(vAB, vAC, A)]
    const xs = pts.map(p => p[0])
    const ys = pts.map(p => p[1])
    const box = {
      minX: Math.min(...xs),
      maxX: Math.max(...xs),
      minY: Math.min(...ys),
      maxY: Math.max(...ys),
    }
    return { vAB, vAC, vBC, A, B, Cc, r, box, ratio: (box.maxX - box.minX) / (box.maxY - box.minY) }
  }

  // Bisseção em d/R. A proporção NÃO é monotônica no domínio todo: cai até ~0.976
  // perto de d=0.6 e só volta a subir depois de d=1. Bracketamos em [1, 1.79],
  // onde ela cresce de 1.000 até o limite em que os círculos deixam de se cruzar.
  let lo = 1
  let hi = 1.79
  let sol = shape(lo)
  for (let i = 0; i < 80; i++) {
    const mid = (lo + hi) / 2
    const s = shape(mid)
    if (!s) {
      hi = mid
      continue
    }
    sol = s
    if (s.ratio < TARGET) lo = mid
    else hi = mid
  }

  const { vAB, vAC, vBC, A, B, Cc, r, box } = sol
  const scale = 64.6258 / (box.maxX - box.minX)
  const ox = (boxW - (box.maxX - box.minX) * scale) / 2
  const oy = (boxH - (box.maxY - box.minY) * scale) / 2
  const T = p => [
    ((p[0] - box.minX) * scale + ox).toFixed(4),
    ((p[1] - box.minY) * scale + oy).toFixed(4),
  ]
  const RR = (r * scale).toFixed(4)

  // sweep-flag: 1 quando o arco anda no sentido de ângulo crescente (y para baixo)
  const sweep = (from, to, center) => {
    const a0 = Math.atan2(from[1] - center[1], from[0] - center[0])
    let a1 = Math.atan2(to[1] - center[1], to[0] - center[0])
    while (a1 - a0 > Math.PI) a1 -= 2 * Math.PI
    while (a0 - a1 > Math.PI) a1 += 2 * Math.PI
    return a1 > a0 ? 1 : 0
  }

  const d =
    `M${T(vAC).join(" ")}` +
    `A${RR} ${RR} 0 0 ${sweep(vAC, vBC, Cc)} ${T(vBC).join(" ")}` +
    `A${RR} ${RR} 0 0 ${sweep(vBC, vAB, B)} ${T(vAB).join(" ")}` +
    `A${RR} ${RR} 0 0 ${sweep(vAB, vAC, A)} ${T(vAC).join(" ")}Z`

  return {
    svg: `<svg viewBox="0 0 ${boxW} ${boxH}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="${d}" fill="${ACCENT}"></path></svg>\n`,
    ratio: sol.ratio,
  }
}

/* --------------------------------------------------- fundos texturizados ----- */
/**
 * Os três webp de fundo entram atrás do círculo a 8% de opacidade. Cada um repete
 * o motivo do seu pilar bem apagado, sobre um brilho âmbar suave.
 */
async function background(kind, out) {
  const S = 1200
  const marks = []
  if (kind === "backend") {
    for (let c = 0; c < 26; c++)
      for (let b = 0; b < 3 + Math.round(hash(c, 3) * 9); b++)
        marks.push(
          `<rect x="${20 + c * 46}" y="${1060 - b * 46}" width="26" height="34" rx="3" fill="${ACCENT}" fill-opacity="${(0.5 - b * 0.03).toFixed(2)}"/>`
        )
  } else if (kind === "data") {
    for (let y = 30; y < S; y += 54)
      for (let x = 30; x < S; x += 54) {
        const t = 1 - Math.hypot(x - S / 2, y - S / 2) / (S / 2)
        if (t <= 0) continue
        marks.push(
          `<circle cx="${x}" cy="${y}" r="${(2 + 7 * t * t).toFixed(1)}" fill="${ACCENT}" fill-opacity="${(0.25 + 0.5 * t).toFixed(2)}"/>`
        )
      }
  } else {
    for (let i = 0; i < 22; i++) {
      const y = 60 + i * 52
      const w = 300 + hash(i, 11) * 620
      marks.push(
        `<rect x="70" y="${y}" width="${w.toFixed(0)}" height="12" rx="6" fill="${ACCENT}" fill-opacity="0.45"/>`
      )
      marks.push(
        `<rect x="${(90 + w).toFixed(0)}" y="${y}" width="60" height="12" rx="6" fill="${ACCENT}" fill-opacity="0.7"/>`
      )
    }
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${S}" height="${S}">
    <defs><radialGradient id="glow" cx="38%" cy="42%" r="70%">
      <stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/>
    </radialGradient></defs>
    <rect width="${S}" height="${S}" fill="${colors.dark}"/>
    <rect width="${S}" height="${S}" fill="url(#glow)"/>
    ${marks.join("")}
  </svg>`
  await sharp(Buffer.from(svg)).webp({ quality: 88 }).toFile(out)
  return `${out} ${S}x${S}`
}

/* ----------------------------------------------------------------- escrita --- */
fs.mkdirSync(DIR, { recursive: true })
const b = backend()
const dt = data()
const fe = frontend()
const inter = intersection()

fs.writeFileSync(path.join(DIR, "backend.svg"), b.svg, "utf8")
fs.writeFileSync(path.join(DIR, "data.svg"), dt.svg, "utf8")
fs.writeFileSync(path.join(DIR, "frontend.svg"), fe.svg, "utf8")
for (const dir of [DIR, "public/images/homepage/approach"]) {
  fs.mkdirSync(dir, { recursive: true })
  fs.writeFileSync(path.join(dir, "intersection.svg"), inter.svg, "utf8")
}

console.log(`backend.svg   ${b.count} rects animáveis`)
console.log(`data.svg      ${dt.count} circles animáveis`)
console.log(`frontend.svg  ${fe.count} grupos (one/two/three/four)`)
console.log(`intersection  proporção ${inter.ratio.toFixed(4)} (alvo 1.1081)`)
console.log(await background("backend", path.join(DIR, "backend-background.webp")))
console.log(await background("data", path.join(DIR, "infra-background.webp")))
console.log(await background("frontend", path.join(DIR, "frontend-background.webp")))
