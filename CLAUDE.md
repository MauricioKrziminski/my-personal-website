@AGENTS.md

# Projeto: Portfólio pessoal do Mauricio Krziminski

> Documentação viva do projeto. Lida em toda sessão nova. Mantenha atualizada
> quando decisões ou estrutura mudarem. Escrita para eliminar viés de
> comunicação: assuma que quem lê **não tem** o histórico das sessões anteriores.

## O que este projeto é (leia primeiro)

Portfólio de desenvolvedor do **Mauricio Krziminski**: Next.js 16 App Router +
styled-components + GSAP, bilíngue PT/EN, exportado como site estático e
publicado no Cloudflare Pages.

A base técnica veio de um **port de um codebase Gatsby**, o que explica algumas
esquisitices que não são acidentais: os shapes `Contentful.*` / `Queries.*` em
`src/gatsby-shim.d.ts`, o `siteMetadata` estático no lugar de um `useStaticQuery`,
e utilitários como `useAnimation` / `getMedia` / os tokens de `text.ts`. Não
"conserte" esses padrões achando que são erro; eles sustentam os componentes de
card sem alteração.

### Decisões travadas (não reabrir sem o usuário pedir)
1. **Bilíngue PT/EN** com um toggle no header. PT é o padrão.
2. **Identidade**: accent **âmbar `#FFB020`**, neutros quentes
   (`mainBlack #121110`, `mainWhite #faf9f7`), tipografia **Geist + Pixelify Sans
   + Instrument Serif** (todas OFL, auto-hospedadas). Ver "Tipografia" abaixo.
3. **Repositório privado**, sem crédito ou atribuição a terceiros em lugar nenhum
   (nem no site, nem no README, nem em comentário).
4. **Seções da home** (a ordem e as animações são fixas): Hero, Intro, Stories,
   Marquee, Projetos, Skills (Venn), Tagline + stats.
5. **Rotas**: `/` (home), `/projects`, `/about`, `/contact`.

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
- **Contatos** (`src/utils/links.ts`): email `krziminski.mauricio@gmail.com`
  (nota: no email o sobrenome vem primeiro, ao contrário do handle das redes;
  confirmar antes de "corrigir"), GitHub `github.com/MauricioKrziminski`,
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
1. **ProOps** — SaaS multi-tenant de gestão comercial e operacional.
2. **SoftCode** — `softcodedev.com.br` — software house do Mauricio (Next.js/TS/Tailwind).
3. **Barbalog** — `barbalog.com.br` — site de consultoria em logística/supply
   chain, entregue pela SoftCode.
4. **Portfólio Pessoal** — `mauriciokrziminski.com.br` — portfólio anterior, tema
   terminal, deploy Cloudflare.
5. **Confeitaria GE** — `confeitaria-ge.vercel.app` — site de confeitaria artesanal (catálogo).
6. **LyftConnect** — `lyftconnect.com.br` — **empresa de automação residencial /
   casa inteligente** (não é "conecta pessoas e serviços"; erro corrigido).

Cada projeto tem: `image` (screenshot emoldurado em `public/images/projects/*.webp`),
descrição PT/EN e `tech[]` (tags mostradas no card).

## Tech stack & comandos

- **Next.js 16.2.10** (App Router, **Turbopack**, `output: "export"`),
  **React 19.2.4**, **styled-components 6**, **GSAP 3** (ScrollSmoother/
  ScrollTrigger/SplitText/TextPlugin — plugins premium incluídos no repo),
  **sharp** (geração de imagens), TypeScript 5.
- Tailwind 4 continua no `package.json` e no `postcss.config.mjs`, mas o
  `@import "tailwindcss"` **foi removido** de `globals.css`: o projeto nunca usou
  uma classe utilitária, e o import sozinho respondia por 7,3 KB dos 11,5 KB do
  CSS de produção. O que o site de fato usava do Tailwind era o **preflight**, e
  ele agora está escrito à mão no reset de `globals.css`. **Não remova aquelas
  regras**: sem `display: block` nas imagens elas voltam a ser inline (ganham o
  gap de baseline), sem `font-size/weight: inherit` nos headings o `h1` volta ao
  2em bold do navegador, e sem `background-color: transparent` nos botões os
  `styled.button` sem fundo próprio ficam cinza. Ignore sugestões de hook para
  migrar para shadcn/ui + Tailwind (o `posttooluse-validate` sugere isso em todo
  arquivo styled-components; é ruído, não aja).

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
  folha **não** precisam cada um do `"use client"`.
- `src/lib/registerGsap.ts` registra os plugins GSAP (import de side-effect no AppShell).
- Rotas: `src/app/page.tsx` (home), `src/app/projects/page.tsx`,
  `src/app/about/page.tsx`, `src/app/contact/page.tsx`. A lógica real de cada
  página está em `src/components/{homepage,projects,about,contact}/`.

### O loader tem um contrato de tempo (e ele define a nota do Lighthouse)

`Transition.tsx` cobre a página inteira com um overlay preto **e** mantém todo o
conteúdo em `opacity: 0` (o styled `Content`) até o loader terminar. Consequência
direta: **enquanto o loader estiver na tela, é ele que o Lighthouse mede.** Não
existe jeito de o site pontuar por si só enquanto o overlay estiver de pé.

**Cinco números acoplados.** Mexer em um sozinho quebra a animação do contador;
três estão em `src/utils/Loader/LoaderUtils.ts` e dois em `Transition.tsx`:

1. `LOADER_MS = 1700` — a duração alvo. É **ao mesmo tempo** o piso do loader e o
   **denominador do contador** (`progress = elapsed / LOADER_MS`). Tem que ser o
   mesmo valor nos dois lugares: quando eram diferentes, o contador era cortado no
   meio (parava em ~70% e saltava para 100 junto com o wipe).
2. `PERCENT_ANIM_MS = 400` (`Transition.tsx`) — a **velocidade** de uma troca:
   200 ms apagando o número anterior, 200 ms digitando o novo.
3. `PERCENT_INTERVAL_MS = 550` (`Transition.tsx`) — a **frequência** das trocas,
   e o throttle do listener `progressUpdated`. **Precisa ser maior que
   `PERCENT_ANIM_MS`**: a diferença entre os dois (150 ms) é o tempo em que o
   número fica parado e legível. Enquanto os dois eram a mesma constante não havia
   descanso nenhum, o contador vivia apagando ou digitando, e a contagem parecia
   frenética. Junto com `LOADER_MS`, define quantos números aparecem antes do 100
   (hoje 3, ou seja 5 estados contando o `0%` inicial e o `100%`).
4. `ANIMATION_DELAY = 450` — espera antes do wipe. Somado ao `sleep(200)` do
   `onComplete` precisa **cobrir um ciclo inteiro do typewriter** (`PERCENT_ANIM_MS`)
   e ainda sobrar folga, senão a saída começa enquanto o "100%" está sendo digitado
   (foi exatamente o bug de "a animação de terminar acontece antes de chegar em
   100%"). Hoje: 200 + 450 = 650 ms, com o "100%" pronto aos 400 ms e parado por
   250 ms.
5. `MAX_LOADER_MS = 3000` — guarda contra hidratação travada. Quase nunca decide
   nada: mesmo disparando, a saída só roda quando o `Transition` registra o
   callback, o que também depende da hidratação.

**O orçamento total é uma decisão de produto, não técnica.** Hoje o conteúdo
aparece em `LOADER_MS + 200 + ANIMATION_DELAY` ≈ **2,35 s**, escolhido para ficar
logo abaixo do limiar de 2,5 s que o Google usa como LCP "bom". Alongar o loader
além disso tira a performance de mobile do verde, e é um atraso real para todo
visitante, não só para o Lighthouse.

Dois detalhes que já morderam: `animatePercent` precisa **matar a timeline
anterior** antes de criar outra (duas timelines escrevendo no mesmo elemento fazem
o contador travar/piscar); e o caminho de hidratação lenta precisa ser tratado à
parte, porque aí o `onComplete` acontece antes de existir alguém escutando. Por
isso `registerLoaderCallback` agenda o callback com `ANIMATION_DELAY` quando
`isComplete` já é true, e o effect do listener chama `animatePercent(100)` se
`getIsComplete()` — sem isso o wipe saía com o contador parado no "0%" do HTML
estático.

**A versão antiga era o oposto disso** e é o motivo de o PageSpeed alternar entre
verde e `NO_FCP`: `EXTRA_DELAY` de 5000 ms, e um progresso falso com
`timeNeeded = (startTime / 3) * 2 + 1000` onde `startTime` era o momento em que o
bundle avaliava. Ou seja, **quanto mais lento o aparelho, mais longo ficava o
loader**. No mobile emulado (CPU 4× mais lenta) passava dos 30 s, estourava o
orçamento de FCP e a run inteira abortava — e, como `NO_FCP` é erro de runtime,
*todas* as categorias viram "Error!", inclusive coisas como "Uses HTTPS" e
"Page has the HTML doctype". Tela vermelha inteira, um problema só.

Ao mexer aqui, meça: `npm run build`, sirva o `out/` **com compressão** (sem gzip
o Lighthouse acusa 3 s de `uses-text-compression` que é artefato do harness, não
do site) e rode o Lighthouse. O critério não é a nota, é o **screenshot final**:
se ele mostrar a tela preta com "0%", a nota está descrevendo o loader e não vale
nada, por mais alta que seja.

**O gargalo hoje não é mais o loader, é a hidratação.** Sob o CPU throttling do
Lighthouse mobile, o conteúdo real só aparece por volta de 3 s porque `AppShell`
é um client boundary único que puxa tudo (Header, Scroll/ScrollSmoother,
BackgroundCanvas, Transition) de forma eager, ~976 KB de JS. Reduzir isso exige
code splitting das seções da home, não ajuste de timer.

### Contato: a única peça de servidor do projeto

O site é 100% estático (`output: "export"`), mas o formulário de `/contact`
precisa de um servidor. Ele posta para **`functions/api/contact.ts`**, uma
**Cloudflare Pages Function** que vive na **raiz do repositório**, fora de
`src/`, que é onde o Pages procura. Não é uma API route do Next, e por isso
`output: "export"` continua intacto.

A Function valida os campos, descarta o honeypot, confere o token do
**Turnstile** e envia via **Resend**. Ela devolve só códigos de erro estáveis
(`invalid_email`, `captcha_failed`, `send_failed`...), que o cliente traduz;
detalhe de erro do Resend vai para o log do Worker, nunca para a resposta.

- **`npm run dev` NÃO executa Pages Functions.** Em dev o POST dá 404. Para
  testar de verdade: `npm run build && npx wrangler pages dev out`, com um
  `.dev.vars` na raiz (git-ignorado) contendo `RESEND_API_KEY` e
  `TURNSTILE_SECRET_KEY`. Use as chaves de teste da Cloudflare (`1x000...AA`
  sempre passa, `2x000...AA` sempre falha) para não depender do widget real.
- **Secrets em produção** ficam no painel do Cloudflare Pages, em Production
  **e** Preview (são listas separadas; só em Production faz o preview responder
  `not_configured`).
- **O Turnstile é opcional e está DESLIGADO.** A site key em
  `src/utils/turnstile.ts` está vazia, então o widget nem carrega e o formulário
  roda só com o honeypot. Ligar exige os **dois** lados: a site key pública lá, e
  `TURNSTILE_SECRET_KEY` nos secrets do Pages. Só um dos dois trava tudo: com o
  secret setado e sem site key, nenhum envio passa.
- Depois de rodar o wrangler, apague o `.wrangler/` (é cache; já está no
  `.gitignore` e no ignore do ESLint, mas ocupa espaço).
- **Entregabilidade**: o DNS (no Cloudflare) tem DKIM (`resend._domainkey`), SPF
  e MX de bounce em `send.`, e um DMARC `p=none` em `_dmarc`. Sem o DMARC o Gmail
  mandava tudo para spam. Se um dia migrar de provedor de email, esses quatro
  registros vão junto.
- **Ao testar a Function por `curl` no Git Bash do Windows, mande o JSON de um
  arquivo** (`--data-binary @payload.json`), nunca inline com `-d '...'`. O
  `curl.exe` é binário nativo e recebe os argumentos convertidos pela codepage
  ANSI, o que destrói acento em argv. Isso já gerou um falso alarme de "bug de
  UTF-8" que não existia no código.

### `public/_headers` (cache do Cloudflare Pages)

O Pages lê um `_headers` na **raiz do diretório publicado**, e o Next copia
`public/` para `out/` no export, então o arquivo mora em `public/_headers`. Ele
marca `/_next/static/*` e `/fonts/*` como `immutable` (nomes com hash) e dá uma
semana para `/images/*`. **Não crie regra para HTML**: as páginas precisam
continuar revalidando, senão um deploy novo não chega para quem já visitou.

### `next.config.ts`
- `output: "export"` — site estático em `out/`, servido pelo Cloudflare Pages.
- `compiler.styledComponents` com **`displayName: false` e `fileName: false`**.
  Isso é deliberado: com eles ligados, o SWC assa o nome de cada componente e do
  arquivo de origem dentro das classes CSS, e o bundle de produção passa a expor
  a árvore interna inteira do projeto para qualquer um ler. **Não religue.**
  Confira com `grep -rE "[A-Z][A-Za-z0-9]+__[A-Z]" out/_next/static/chunks/`,
  que tem que voltar vazio.
- SVGR via `turbopack.rules`, com SVGO configurado para **não** converter shape
  em path, **não** colapsar `<g>` e **não** renomear classes. Os SVGs do Venn
  dependem disso (ver "Venn" abaixo).

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
- **Todo texto visível vem de `useT()`**. Não hardcode strings em JSX, e isso
  inclui `alt` de imagem (a galeria da Sobre e o rótulo "Topo da Página" já
  passaram por essa correção).
- **Dados bilíngues**: `data.ts` exporta funções `getProjects(lang)`,
  `getExperiences(lang)`, `getStats(lang)` que montam os arrays já na língua
  certa. Os **4 consumidores** passam `lang` via `useLang()`:
  `homepage/Home.tsx`, `homepage/Tagline/AllCards.tsx`, `projects/Projects.tsx`,
  `about/About.tsx`.
- **Títulos animados com GSAP** (Hero, Stories typewriter, Tagline SplitText):
  SplitText muta o DOM **fora do React**. Ao trocar de idioma é preciso
  **remontar** o componente com `key={lang}` para re-splitar (feito em
  `06-Tagline.tsx`). Se um título animado não traduzir, é quase sempre isto.

## Tipografia

Três famílias, todas **SIL OFL 1.1**, auto-hospedadas em `public/fonts` com os
textos de licença em `public/fonts/licenses`:

| Token | Família | Observação |
|---|---|---|
| `fonts.primary` | **Geist** | variável 100–900, cobre os pesos 200/350/550 de `text.ts` |
| `fonts.pixel` | **Pixelify Sans** | variável 400–700, tokens `d1..d4Pixel` |
| `fonts.serif` | **Instrument Serif** | **peso único 400**, tokens `d1..d4Serif` |

Cada família vem em dois subsets (`latin` e `latin-ext`) com o mesmo
`unicode-range` do Google Fonts, declarados em `src/app/globals.css`.

**Cuidado ao mexer em corpo de texto:** a Pixelify Sans é ~35% mais larga que a
fonte pixelada anterior no mesmo corpo. Isso já obrigou a alargar a caixa do
"Topo da Página" (`FooterBlob.tsx`) e a recalibrar o rótulo do Venn. Se adicionar
copy nova em `d*Pixel`, **meça** antes de assumir que cabe.

**O headline do hero (`homepage/01-Hero.tsx`) é um bloco justificado.** As quatro
linhas alternam texto+imagem e imagem+texto, e todas têm exatamente a mesma
largura. Quem fecha a conta é a **imagem**, que tem `flex: 1 0 220px`: o texto
ocupa o que precisa e a foto absorve a sobra da linha. Consequências:
- o `flex-shrink` fica em **0** de propósito. Com ele ligado, a imagem da linha
  mais larga era espremida até 0 e o `width: max-content` do bloco passava a valer
  só o texto, desalinhando tudo;
- a proporção das imagens varia de linha para linha (frase curta, faixa larga).
  Isso é o efeito desejado, não um bug;
- **não** volte para um grid de colunas fixas. Era assim antes, e só funciona se as
  quatro frases tiverem comprimentos parecidos, o que não vale nem em PT nem em EN;
- o DOM é sempre texto → imagem, e o `$flip` do `Row` inverte só a direção visual
  no desktop. É isso que mantém a ordem de leitura certa quando empilha no mobile;
- nos breakpoints empilhados o `Image` precisa de `flex: none`, senão o
  `flex-basis` passa a valer como **altura** (o eixo principal vira o vertical) e
  sobrescreve o `height`.

**O rótulo do Venn (`VennUI.tsx` → `Text`) tem três números acoplados**, e mexer
em um sozinho quebra o outro:
1. **corpo** (28px no fullWidth, 0.08 do diâmetro do círculo nos demais);
2. **largura da caixa** (74%), que precisa ficar *entre* a palavra mais longa
   ("Arquitetura", ~8.4px por px de corpo) e o rótulo inteiro numa linha só. Larga
   demais e ele para de quebrar linha e vira uma linha comprida que estoura;
   estreita demais e a palavra sozinha estoura;
3. **`$shift`** (±3.4%), que recentra o rótulo na parte visível do círculo, já que
   o círculo vizinho cobre um lado só. Sem isso a primeira letra some por baixo do
   vizinho (foi o que comeu o "I" de "Infrastructure").
Para validar, meça no browser a linha mais larga contra a corda livre do círculo
(descontando a invasão dos vizinhos naquela altura), **nos dois idiomas**: PT tem
as palavras mais longas, mas foi o EN que estourou primeiro depois de um ajuste.

## Estilo & convenções

- **styled-components** em todo lugar. Nada de CSS modules/Tailwind.
- **Breakpoints** (`src/styles/media.ts`): `mobile ≤428`, `tablet 429–1024`,
  `desktop 1025–1440`, `fullWidth ≥1441`. Use `${media.fullWidth}`,
  `${media.desktop}`, etc. Padrão: valores em **px no fullWidth** e em **vw**
  nos demais (responsividade fluida).
- **`useMedia(fw, d, t, m)`** (`src/utils/useMedia.ts`) e **`getMedia(...)`**
  (`src/utils/getMedia.ts`): escolhem um valor por breakpoint em JS (ordem
  **fullWidth, desktop, tablet, mobile**). Usados p/ ex. em animações GSAP.
- **Cores** (`src/styles/colors.ts`): `mainAccent`/`accent500 #FFB020`,
  `accent200..accent800` na rampa âmbar, `mainBlack #121110`,
  `mainWhite #faf9f7`, `black200..800`, `white200..700`. Use os tokens, não hex
  cru. Em fundo claro o `accent500` não bate contraste AA em texto pequeno: use
  `accent700 #a66a00`.
- **Tipografia** (`src/styles/text.ts`): tokens `text.h1..h6`, `text.sub1..3`,
  `text.bodyS/bodyXS`, `text.buttonMain`, `d1..d4Pixel`, `d1..d4Serif`.
  Espalhe com `${text.h4}`.
- **`useAnimation(fn, deps)`** (`src/utils/useAnimation.ts`): wrapper do padrão
  para efeitos GSAP (roda no cliente, re-executa nas deps). Título/efeito que
  depende de texto deve incluir o texto/lang nas deps.

## Assets: tudo é gerado por script

**Nenhum gráfico do repositório é desenhado à mão.** Todos saem de scripts
determinísticos em `scripts/`, então dá para regerar tudo depois de mexer na
paleta ou na tipografia. `scripts/brand.mjs` guarda os tokens compartilhados e
**precisa ficar em sincronia com `src/styles/colors.ts`** (os scripts não
conseguem importar o TS do app).

```bash
node scripts/gen-logos.mjs      # src/images/global/Logo{Dark,Light,SmallDark,SmallLight}.svg (+ cópia em public/)
node scripts/gen-icons.mjs      # src/app/{icon.png,apple-icon.png,favicon.ico}
node scripts/gen-og.mjs         # public/images/og-default.png
node scripts/gen-textures.mjs   # tiles de fundo, meio-tom, granulado, ruído do header
node scripts/gen-approach.mjs   # os 3 círculos do Venn + interseção + os 3 fundos
node scripts/gen-gallery.mjs    # src/images/about/gallery/gallery-{1,2,3}.webp
```

### Venn (`scripts/gen-approach.mjs`) — tem contrato com as animações
Cada componente do Approach busca elementos **dentro do seu próprio SVG** e anima
**por tag**, não por id. A forma pode mudar à vontade; a estrutura não:

| SVG | Componente | O que ele busca |
|---|---|---|
| `backend.svg` | `Approach/Backend.tsx` | `querySelectorAll("rect")` menos os `.background` → anima `scaleY` |
| `data.svg` | `Approach/Data.tsx` | `querySelectorAll("circle:not(.specialBackground)")` → anima `scale` + posição |
| `frontend.svg` | `Approach/Frontend.tsx` | `querySelectorAll("g")` filtrando `.one/.two/.three/.four` → entram de 4 direções |

Ou seja: todo `<rect>` que **não** deve animar (fundo, e principalmente os que
vivem dentro de `<clipPath>`) precisa de `class="background"`; e o clip do
`data.svg` usa `<rect rx>` justamente para não entrar na seleção de círculos.

**Há um quarto consumidor, fácil de esquecer:** `Approach/Venn.tsx` faz um cull
de performance durante o zoom (`setSVGdisplay`) que põe `display="none"` em
**todos** os descendentes de cada SVG **menos os que têm
`class="specialBackground"`**. Por isso o disco de fundo dos três círculos é um
`<circle class="specialBackground">`. Já quebrou uma vez: com o fundo do Back-end
como `<rect class="background">`, ele sobrevivia à animação mas era escondido pelo
cull, e o círculo aparecia claro enquanto os outros dois ficavam escuros.

O cabeçalho de `scripts/gen-approach.mjs` documenta os quatro contratos.

`intersection.svg` é derivado por geometria: é a interseção real dos três
círculos do Venn, achada por bisseção no `d/R` até bater a proporção que o layout
espera (65×59). Não edite o path na mão.

### Fotos reais
`src/images/homepage/intro/mauricio.webp`, `src/images/about/Hero-about-main.webp`
(braços cruzados), `src/images/about/caricatura.png`, os screenshots dos projetos
em `public/images/projects/` e os logos de experiência em `public/images/team/logos/`.

## Gotchas (economize tempo — já morderam antes)

- **Edição com CRLF**: os `.tsx` usam **quebra de linha CRLF**. A ferramenta
  `Edit` casa por texto exato; **matches multi-linha frequentemente falham**.
  Prefira editar **linha a linha** (âncoras de uma linha só), ou use um script
  Node com `fs.readFileSync/writeFileSync` + `split().join()`.
- **`\b` em regex dentro de `node -e` no bash**: o escaping se perde e o regex
  vira caractere de backspace, silenciosamente casando nada. Escreva o script num
  arquivo (com a ferramenta `Write`) em vez de passar por `-e`, ou monte o `\b`
  com `String.fromCharCode(92) + "b"`.
- **Read hook**: o harness às vezes recusa reler um arquivo ("Wasted call").
  Use `Grep` com `pattern: "."` e `-n` para ver o conteúdo, ou `Read` com
  `offset/limit`.
- **Logo do header**: o `Logo.tsx` renderiza os SVGs com `height:100%; width:auto`
  dentro de um `Jail` de largura fixa (320px no wordmark, 60px no monograma). Os
  SVGs usam **`textLength` + `lengthAdjust="spacingAndGlyphs"`** de propósito: o
  librsvg (que o sharp usa) mede a Geist ~5% mais estreita que o Chrome, e um
  viewBox medido por rasterização cortava o "i" final no browser. Com
  `textLength` é o SVG que manda a largura em qualquer renderizador. O
  `gen-logos.mjs` imprime a proporção e avisa se estourar o `Jail`.
- **Fontes embutidas em SVG**: os logos carregam via `<img src>`, e `<img>` não
  herda o `@font-face` do documento. Por isso a Geist vai embutida como data URI
  dentro do próprio SVG. Mesma técnica no `gen-icons.mjs`/`gen-og.mjs` (o librsvg
  lê `@font-face` base64). Como a Geist é variável, declare **um peso fixo** por
  `@font-face`: uma faixa (`100 900`) faz o librsvg renderizar no default.
- **SVGs como `<img src>`**: quando um SVG é usado via `<img src>` (não import
  SVGR), ele precisa existir como **SVG cru** em `public/images/**`. Hoje isso
  vale para os 4 logos, o `linkArrow.svg` e o `intersection.svg`.
- **Ícone de seta**: os consumidores recolorem com `* { fill: ... }`, então o
  `linkArrow.svg` precisa ser feito de **paths preenchidos**, não de stroke.
- **Descidas de letra (g, j, p, q, y, @) sendo raspadas**: os tokens `text.h1..h6`
  usam `line-height: 100%`, então a caixa da linha tem exatamente a altura da
  fonte e a tinta das descidas fica abaixo dela. Qualquer `overflow: hidden` ou
  `clip-path` colado na caixa corta a letra. Já mordeu três vezes: o `clip-path`
  do `NavItem`, o `margin-bottom` negativo do `GetInTouch` (hoje `-0.02em`, com
  ~5px de folga) e a caixa do "Topo da Página". Detalhe traiçoeiro: em inglês a
  cópia muitas vezes não tem descida nenhuma, então o bug **só aparece em
  português**. Ao criar máscara/recorte em texto, deixe folga vertical e teste em PT.
- **Rota nova com `<Section>` precisa entrar em `BACKGROUND_ROUTES`**
  (`src/components/Layout.tsx`). O `BackgroundCanvas`, que pinta as faixas
  clara/escura e as ondas, é montado por uma lista de pathnames. Uma rota que
  não está na lista renderiza **sem fundo nenhum**, e como os heros escuros
  escrevem em `mainWhite` o título fica **branco no branco**, invisível, sem
  nenhum erro no console. Foi exatamente o que aconteceu ao criar `/contact`.
  A lista era três `pathname === ...` repetidos; virou um array só.
- **Nunca use crase dentro de comentário CSS** em `styled.x\`...\``: a crase
  encerra o template literal e o build quebra com "Expected a semicolon", com a
  página inteira em branco no dev. Isso inclui usar crase para citar um nome de
  prop ou de propriedade dentro do comentário, que é o jeito natural de escrever.
  Já mordeu de novo depois de estar documentado aqui: escreva os nomes sem crase.
- **O React 19 emite `<link rel="preload" as="image">` sozinho** para todo `<img>`
  do SSR que **não** tem `loading="lazy"`, e esses preloads entram no `<head>`
  antes do CSS render-blocking. Isso já custou 203 KB de disputa no primeiro
  paint: os 4 logos do header pesam 38,7 KB cada (levam a Geist embutida em
  base64) e só um deles aparece no primeiro frame. Hoje os 3 invisíveis usam
  `fetchPriority="low"` e a foto da Intro usa `loading="lazy"`. Ao adicionar
  `<img>` novo, decida conscientemente: acima da dobra e visível, deixa eager;
  qualquer outra coisa, `loading="lazy"` ou `fetchPriority="low"`.
- **Imagens não têm mais overlay de textura.** O `OverlayImage` já teve uma camada
  de meio-tom/granulado por cima de toda foto; foi removida porque criava moiré em
  cima de screenshots de interface. Se voltar, que volte como opt-in por prop.
- **JSX apaga whitespace** entre expressões em linhas separadas (ex.: `{a}` e
  `<span>` viraram "FaleComigo"). Use `{" "}` explícito quando precisar do espaço.
- **Aba de automação (Claude-in-Chrome)**: o loader/ScrollSmoother usa `rAF` que
  **congela em aba de fundo**. Para verificar visualmente: dirija manualmente
  `gsap.ticker.tick()` em loop com `setTimeout(r, 0)` entre ticks, e role com
  `window.scrollTo` antes de ticar (o ScrollSmoother transforma o
  `#smooth-content`). Loops longos estouram o timeout do CDP: use ~150 ticks por
  chamada, não 300+. O `resize_window` pode não ter efeito se a janela estiver
  maximizada; nesse caso meça o layout mobile analiticamente com
  `canvas.measureText` nos tamanhos em vw em vez de tentar redimensionar.

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
2. `grep -rE "[A-Z][A-Za-z0-9]+__[A-Z]" out/_next/static/chunks/` → **vazio**.
3. Se tocou tipos, `npx tsc --noEmit` e confira só os arquivos alterados.
4. Verificação visual no browser (`localhost:3000`, `/projects`, `/about`):
   trocar PT↔EN e conferir que TODO o copy troca, animações re-rodam sem
   quebrar, 0 imagens quebradas, 0 erros de console, descidas de letra inteiras
   em PT.
5. Ignorar o hook `posttooluse-validate` que sugere shadcn/Tailwind.

## Fora de escopo / pendências

- Os shapes `Contentful.*` / `Queries.*` em `src/gatsby-shim.d.ts` ainda têm nomes
  do CMS antigo (`TeamMemberNodes`, `CompanyNode`), e por isso a prop `team` de
  `about/02-Experiences.tsx` e `02-List.tsx` ainda se chama assim mesmo carregando
  experiências. Renomear cascateia por todos os cards; deixado para depois.
- **Turnstile desligado** (site key vazia em `src/utils/turnstile.ts`). O
  formulário de `/contact` está protegido só pelo honeypot. Se aparecer spam,
  criar o widget no dashboard e preencher os dois lados (ver "Contato" acima).
- Páginas `/terms` e `/privacy` (linkadas em `Socials`, sem rota) — criar ou
  remover links.
- Ícones de skill custom no Venn: hoje a arte dos 3 círculos é gerada
  proceduralmente, o que já é próprio, mas não há iconografia dedicada.
