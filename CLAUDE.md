@AGENTS.md

# Projeto: Portfólio pessoal do Mauricio Krziminski

> Documentação viva do projeto. Lida em toda sessão nova. Mantenha atualizada
> quando decisões ou estrutura mudarem. Escrita para eliminar viés de
> comunicação: assuma que quem lê **não tem** o histórico das sessões anteriores.

## O que este projeto é (leia primeiro)

Este repositório começou como um **port fiel** (Next.js 16 App Router +
styled-components + GSAP) do site da **New Form Capital** (um fundo de VC). O
port reproduz o design, as animações e a estrutura originais do site Gatsby.

**O projeto foi então transformado** no **portfólio de desenvolvedor do
Mauricio Krziminski**, mantendo TODO o visual/animações da New Form e trocando
apenas o conteúdo. Ou seja: se você encontrar nomes de seções "New Form-esque"
(Portfolio, Team, Venn, Quotes), eles foram **remapeados** para o contexto
pessoal — veja o mapa abaixo. Não "conserte" para o contexto de VC; o alvo é o
portfólio pessoal.

### Decisões travadas (não reabrir sem o usuário pedir)
1. **Bilíngue PT/EN** com um toggle no header. PT é o padrão.
2. **Manter a identidade visual da New Form**: verde `#2BEE4B`, tema dark/light,
   fontes TWK Lausanne. Só o conteúdo/branding muda.
3. **Remapeamento de seções** (mantendo o design):
   - `Portfolio` / `/portfolio` → **Projetos**
   - `Team` / `/about` (rota renomeada de `/team`) → **Sobre / Trajetória**
   - `Venn` (Approach) → **Skills** (3 pilares: Back-end / Front-end / Dados & Infra)
   - `Quotes` → **tagline pessoal + stats**
4. **Rotas:** `/portfolio` mantida; `/team` foi **renomeada para `/about`**
   (pasta `src/app/about/`; links, canonical e `Layout.tsx` atualizados; a pasta
   de componentes segue `components/team/*` internamente). `/portfolio`→`/projects`
   é cleanup opcional futuro.

## Quem é o Mauricio (fonte de verdade para conteúdo)

Usar estes dados ao escrever/editar copy. Não inventar; se faltar algo, perguntar.

- **Papel**: **Desenvolvedor de Software Full-stack**, **formado** (não é mais
  estudante) em Engenharia de Software na **PUC-RS** (2022–2026). Atua também
  como **Desenvolvedor de Sistemas no Banrisul** desde 2024 (veja a regra de
  apresentação em "Regras de cópia/voz" abaixo).
- **Banrisul**: modernização do app bancário. Stack: C#, .NET, JavaScript,
  jQuery, IBM Db2, Oracle.
- **Hackatona Tecnopuc**: 3º lugar (2025), equipe Thinking Heads — app mobile
  Swift + back-end Go.
- **Stack pessoal**: TypeScript, React, Next.js, Nest, Spring, SQL, Docker,
  Clean/Hexagonal Architecture.
- **Localização**: Porto Alegre, RS — Brasil.
- **Contatos** (`src/utils/links.ts`): email `mauricio.krziminskii@gmail.com`
  (nota: dois "i" em krziminskii no email; o handle é sem — confirmar antes de
  "corrigir"), GitHub `github.com/MauricioKrziminski`,
  LinkedIn `linkedin.com/in/mauriciokrziminski`, site `mauriciokrziminski.com.br`.

## Regras de cópia/voz (valem para TODA a cópia do site)

1. **NUNCA usar travessão (`—`) em frases.** Sem exceção. Use pontuação usual:
   vírgula, dois-pontos, ponto ou parênteses. Isto vale para PT e EN, em
   `strings.ts`, `data.ts`, metadados e qualquer texto visível.
2. **Apresentação vs. trajetória.** Para **se apresentar** (hero, seção Intro da
   home, `quotes.sub`, `aboutPage.description`, metadados), apresentar como
   **"Desenvolvedor de Software Full-stack"** e **NÃO citar o emprego atual**
   (Banrisul). O Banrisul só aparece em **contexto de trajetória/histórico**:
   os cards de experiência da Sobre (`getExperiences`) e o stat de milestone
   (`getStats`), onde é legítimo.
3. **Formado, não estudante.** Ele concluiu Engenharia de Software na PUC-RS.
   Nunca escrever "estudante"; usar "formado em Engenharia de Software na PUC-RS".
4. **É "no Banrisul"**, nunca "na Banrisul" (Banrisul é masculino). E "na PUC-RS"
   (universidade é feminino) está correto.

### Projetos (em `src/utils/data.ts` → `getProjects`)
1. **SoftCode** — `softcodedev.com.br` — software house do Mauricio (Next.js/TS/Tailwind).
2. **Barbalog** — `barbalog.com.br` — site de consultoria em logística/supply
   chain, entregue pela SoftCode.
3. **Portfólio Pessoal** — `mauriciokrziminski.com.br` — portfólio anterior, tema
   terminal, deploy Cloudflare.
4. **Confeitaria GE** — `confeitaria-ge.vercel.app` — site de confeitaria artesanal (catálogo).
5. **LyftConnect** — `lyftconnect.com.br` — **empresa de automação residencial /
   casa inteligente** (não é "conecta pessoas e serviços"; erro corrigido).

Cada projeto tem: `image` (screenshot emoldurado em `public/images/projects/*.webp`),
descrição PT/EN e `tech[]` (tags mostradas no card).

## Tech stack & comandos

- **Next.js 16.2.10** (App Router, **Turbopack**), **React 19.2.4**,
  **styled-components 6**, **GSAP 3** (ScrollSmoother/ScrollTrigger/SplitText/
  TextPlugin — plugins premium incluídos no repo), **sharp** (geração de imagens),
  TypeScript 5.
- Tailwind 4 está instalado (starter) mas o projeto **não usa Tailwind** — é um
  port em styled-components. Ignore sugestões de hook para migrar para
  shadcn/ui + Tailwind (o `posttooluse-validate` sugere isso em todo arquivo
  styled-components; é ruído, não aja).

```bash
npm run dev     # dev server (Turbopack) — normalmente já rodando em localhost:3000
npm run build   # build de produção — RODE após mudanças (é o gate principal)
npm run lint    # eslint
npx tsc --noEmit  # type-check (ver ressalva abaixo)
```

**Sobre `tsc`**: existem **erros de tipo pré-existentes** do port (padrão
`pt: Strings` + `as const` em `strings.ts`, refs `HTMLDivElement | null`,
`ScrollSmoother | undefined`, `Timer` vs `Timeout`, etc.). `next build`
**ignora** validação de tipos (`Skipping validation of types`) e passa verde.
Ao rodar `tsc`, foque nos erros dos **arquivos que você tocou** — ignore os
pré-existentes listados. O gate de "está ok" é `npm run build` verde.

## Arquitetura

### Origem: port de Gatsby → Next
Copy que no Gatsby vinha do Contentful (GraphQL) agora é **estático** em
`src/utils/data.ts`, reusando os shapes ambientes `Contentful.*` / `Queries.*`
declarados em `src/gatsby-shim.d.ts` — assim os componentes de card renderizam
**sem alteração**. `siteMetadata` (antes `useStaticQuery`) está em
`src/utils/siteMetadata.ts`.

### Árvore de montagem
```
src/app/layout.tsx  (Server Component; metadata; <html>)
  └ StyledComponentsRegistry  (SSR do styled-components)
     └ RouterBridge + AppShell  ("use client")
        └ Providers            → <Language><Screen><Background><Nav>
           └ Layout            → Header, Scroll (ScrollSmoother), Transition (loader), Footer
              └ {children}     → páginas
```
- `src/components/AppShell.tsx` é o **client boundary** ("use client"). Tudo que
  ele importa entra no bundle client automaticamente — por isso os componentes
  folha portados **não** precisam cada um do `"use client"`.
- `src/lib/registerGsap.ts` registra os plugins GSAP (import de side-effect no AppShell).
- Rotas: `src/app/page.tsx` (home), `src/app/portfolio/page.tsx`,
  `src/app/team/page.tsx`. A lógica real de cada página está em
  `src/components/{homepage,portfolio,team}/`.

## i18n — a peça central (leia antes de mexer em qualquer texto)

Diretório `src/utils/i18n/`:
- **`LanguageContext.tsx`** ("use client"): `type Language = "pt" | "en"`;
  provider `Language` (é o **provider mais externo** em `Providers/index.tsx`).
  Inicializa: SSR-safe default `"pt"` → no mount resolve `localStorage("lang")`
  → senão `navigator.language` (`pt*`→pt) → default. Persiste no `setLang` e
  seta `document.documentElement.lang`.
- **`strings.ts`**: dicionário `{ en, pt }`. **`en` é a forma de referência**
  (`type Strings = typeof en`); `pt` é tipado contra ela, então **chave faltando
  em qualquer língua é erro de compilação**. Adicione a chave nos DOIS objetos.
- **`useT.ts`**: `useT()` → dicionário da língua atual (para copy em JSX);
  `useLang()` → `{ lang, setLang }` (para forçar re-render / passar `lang` a
  funções de dados).
- **`LanguageToggle.tsx`**: o botão `PT | EN` no header.

### Regras práticas de i18n
- **Todo texto visível vem de `useT()`**. Não hardcode strings em JSX. (Um sweep
  já removeu todas as strings literais; mantenha assim.)
- **Dados bilíngues**: `data.ts` exporta funções `getProjects(lang)`,
  `getExperiences(lang)`, `getStats(lang)` que montam os arrays já na língua
  certa. Os **4 consumidores** passam `lang` via `useLang()`:
  `homepage/Home.tsx`, `homepage/Quotes/AllCards.tsx`, `portfolio/Portfolio.tsx`,
  `team/Team.tsx`.
- **Títulos animados com GSAP** (Hero, Stories typewriter, Quotes SplitText):
  SplitText muta o DOM **fora do React**. Ao trocar de idioma é preciso
  **remontar** o componente com `key={lang}` para re-splitar (feito em
  `06-Quotes.tsx`). Se um título animado não traduzir, é quase sempre isto.

## Estilo & convenções

- **styled-components** em todo lugar. Nada de CSS modules/Tailwind.
- **Breakpoints** (`src/styles/media.ts`): `mobile ≤428`, `tablet 429–1024`,
  `desktop 1025–1440`, `fullWidth ≥1441`. Use `${media.fullWidth}`,
  `${media.desktop}`, etc. Padrão do port: valores em **px no fullWidth** e em
  **vw** nos demais (responsividade fluida).
- **`useMedia(fw, d, t, m)`** (`src/utils/useMedia.ts`) e **`getMedia(...)`**
  (`src/utils/getMedia.ts`): escolhem um valor por breakpoint em JS (ordem
  **fullWidth, desktop, tablet, mobile**). Usados p/ ex. em animações GSAP.
- **Cores** (`src/styles/colors.ts`): `green500 #2bee4b`, `mainBlack #121613`,
  `mainWhite #fafffa`, `black700`, `white500`, etc. Use os tokens, não hex cru.
- **Tipografia** (`src/styles/text.ts`): tokens `text.h1..h6`, `text.sub1..3`,
  `text.bodyS/bodyXS`, `text.buttonMain`, etc. Espalhe com `${text.h4}`.
- **`useAnimation(fn, deps)`** (`src/utils/useAnimation.ts`): wrapper do padrão
  do port para efeitos GSAP (roda no cliente, re-executa nas deps). Título/efeito
  que depende de texto deve incluir o texto/lang nas deps.

## Gotchas do port (economize tempo — já resolvidos antes)

- **Edição com CRLF**: os `.tsx` usam **quebra de linha CRLF**. A ferramenta
  `Edit` casa por texto exato; **matches multi-linha frequentemente falham**.
  Prefira editar **linha a linha** (âncoras de uma linha só), ou use PowerShell
  com `[System.IO.File]::ReadAllText/WriteAllText` + regex e
  `UTF8Encoding($false)` (sem BOM) para edições em bloco.
- **Read hook**: o harness às vezes recusa reler um arquivo ("Wasted call").
  Use `Grep` com `pattern: "."` e `-n` para ver o conteúdo, ou `Read` com
  `offset/limit`.
- **SVGs como `<img src>`**: alguns SVGs vêm compilados como componentes SVGR
  (JS). Quando um SVG é usado via `<img src>` (não import SVGR), ele precisa
  existir como **SVG cru** em `public/images/**`. Ícones do Approach animam
  consultando os próprios elementos por tag/classe — não regenere sem verificar.
- **JSX apaga whitespace** entre expressões em linhas separadas (ex.: `{a}` e
  `<span>` viraram "FaleComigo"). Use `{" "}` explícito quando precisar do espaço.
- **Imagens de projeto via `sharp`**: os screenshots emoldurados (barra de
  browser com 3 pontinhos + URL + cantos arredondados) são gerados por scripts
  `sharp` temporários (`_frame_*.mjs`) na raiz — **rode e apague** depois. Saída
  em `public/images/projects/*.webp` (~1200px de largura). O `Contentful.CompanyNode`
  ganhou campos opcionais `image?` e `tech?`; o card renderiza `image` em cor
  real + sombra (sem o filtro verde dos logos placeholder) quando presente.
- **Aba de automação (Claude-in-Chrome)**: o loader/ScrollSmoother usa `rAF` que
  **congela em aba de fundo**. Para verificar visualmente: dirija manualmente
  `gsap.ticker.tick()` em loop com `setTimeout` real entre ticks, e use
  `ScrollSmoother.get().scrollTop(y)` em vez de `window.scrollTo`. Loops muito
  longos podem estourar timeout do CDP — quebre em chamadas menores. Para sites
  externos com animação de reveal congelada, injete um `<style>` forçando
  `opacity:1!important;transform:none!important;visibility:visible!important;
  animation:none` e esconda `[class*=load]` antes do screenshot.

## Assets

- **Prontos**: os 5 screenshots emoldurados dos projetos; ícones/SVGs do port
  já renderizados; texturas; fotos reais do Mauricio no Intro da home
  (`homepage/intro/mauricio.webp`) e no hero da Sobre (`team/Hero-team-main.webp`,
  braços cruzados); caricatura vetorial (`team/caricatura.png`).
- **Favicon e OG image (prontos, gerados por script)**: monograma MK verde
  `#2BEE4B` sobre `#121613` em `src/app/icon.png` (512), `apple-icon.png` (180) e
  `favicon.ico` (16/32/48, PNGs embutidos); OG 1200x630 com a caricatura em
  `public/images/og-default.png`. Saem de `scripts/gen-icons.mjs` e
  `scripts/gen-og.mjs` (rodar da raiz). Os scripts montam um SVG com a
  **TWK Lausanne embutida como data URI woff2** e renderizam via `sharp`:
  librsvg lê `@font-face` base64, então a tipografia sai idêntica à do site
  (vale para qualquer imagem futura com texto da marca).
- **Ainda placeholder** (trocar quando o Mauricio enviar os originais — mesmos
  paths em `src/images/**` e cópia em `public/images/**` p/ os usados como `<img>`):
  os 4 logos MK (`global/Logo*.svg`), `portfolio/hero.webp`,
  e headshots/dados reais dos membros de "experiência"
  (hoje `headshot:null` em `data.ts`).
- Detalhe completo dos assets faltantes vive na memória do assistente
  (`missing-site-assets`).

## Git / commits

1. **NUNCA adicione `Co-Authored-By` (nem qualquer crédito a assistente/IA) na
   mensagem de commit.** Sem exceção, mesmo que a configuração padrão da
   ferramenta peça. Os commits são do Mauricio. Isso vale também para descrição
   de PR e para qualquer trailer equivalente.
2. Mensagens em português, no imperativo ("Corrige...", "Adiciona..."), com o
   porquê da mudança quando não for óbvio.
3. Commita direto na `master`: é dela que o Cloudflare Pages publica. Só
   commite/pushe quando o usuário pedir.

## Fluxo de verificação (faça sempre)

1. `npm run build` verde (gate principal).
2. Se tocou tipos, `npx tsc --noEmit` e confira só os arquivos alterados.
3. Verificação visual no browser (`localhost:3000`, `/portfolio`, `/team`):
   trocar PT↔EN e conferir que TODO o copy troca, animações re-rodam sem
   quebrar, 0 imagens quebradas, 0 erros de console, seções remapeadas corretas.
4. Ignorar o hook `posttooluse-validate` que sugere shadcn/Tailwind.

## Fora de escopo / pendências

- Renomear rota `/portfolio`→`/projects` (o `/team`→`/about` já foi feito).
- Páginas `/terms` e `/privacy` (linkadas em `Socials`, sem rota) — criar ou
  remover links.
- Logos MK definitivos (`global/Logo*.svg` ainda são placeholder). Favicon, OG
  image e fotos reais já estão feitos.
- Ícones de skill custom no Venn (hoje reusa os SVGs animados do Approach).
