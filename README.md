# mauriciokrziminski.com.br

Portfólio pessoal do Mauricio Krziminski, desenvolvedor de software full-stack.
Bilíngue PT/EN, exportado como site estático e publicado no Cloudflare Pages.

## Stack

- **Next.js 16** (App Router, Turbopack, `output: "export"`)
- **React 19** + **styled-components 6**
- **GSAP 3** (ScrollSmoother, ScrollTrigger, SplitText, TextPlugin)
- **sharp** para gerar os assets de imagem
- TypeScript

## Rodando

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # gera o site estático em out/
npm run lint
```

## Fontes

As três famílias são [SIL Open Font License 1.1](https://openfontlicense.org) e
ficam auto-hospedadas em `public/fonts`, com os textos de licença em
`public/fonts/licenses`:

| Papel | Família |
| --- | --- |
| Texto e títulos | [Geist](https://github.com/vercel/geist-font) (variável) |
| Display pixelado | [Pixelify Sans](https://fonts.google.com/specimen/Pixelify+Sans) (variável) |
| Display serifado | [Instrument Serif](https://fonts.google.com/specimen/Instrument+Serif) |

Cada família vem em dois subsets (`latin` e `latin-ext`) com o mesmo
`unicode-range` que o Google Fonts usa, declarados em `src/app/globals.css`.

## Assets gerados

Nada de arte no repositório é desenhado à mão: todos os gráficos saem de scripts
determinísticos em `scripts/`, então dá para regerar tudo depois de mexer na
paleta ou na tipografia. Rode da raiz do projeto:

```bash
node scripts/gen-logos.mjs      # os 4 SVGs do logo do header
node scripts/gen-icons.mjs      # favicon.ico + icon.png + apple-icon.png
node scripts/gen-og.mjs         # imagem de preview de link (Open Graph)
node scripts/gen-textures.mjs   # tiles de fundo, meio-tom, granulado e ruído
node scripts/gen-approach.mjs   # os 3 círculos animados do Venn + interseção
node scripts/gen-gallery.mjs    # as 3 imagens abstratas da página Sobre
```

`scripts/brand.mjs` guarda os tokens de marca compartilhados por esses scripts.
Ele precisa ficar em sincronia com `src/styles/colors.ts`.

Os SVGs do Venn têm um contrato com as animações GSAP (quais tags e classes cada
componente busca). Está documentado no cabeçalho de `scripts/gen-approach.mjs`;
leia antes de mudar a geometria.
