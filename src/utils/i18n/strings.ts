/**
 * Bilingual copy dictionary (PT/EN) for the personal-portfolio site.
 *
 * Nearly all user-facing copy lives here so the language toggle can swap the
 * whole site at once. Components read it via `useT()` (current language) and
 * data arrays are built per-language by the `get*` helpers in utils/data.ts.
 *
 * `en` is the reference shape; `pt` is typed against it so a missing key in
 * either language is a compile error.
 */

const en = {
  nav: {
    home: "Home",
    projects: "Projects",
    about: "About",
    contact: "Contact",
  },
  header: {
    menu: "Menu",
    close: "Close",
  },
  common: {
    scroll: "Scroll",
    loading: "Loading...",
    getInTouchTop: "Get in", // large marquee CTA: "Get in" + "Touch"
    getInTouchBottom: "Touch",
    viewProjects: "View projects",
    getInTouch: "Get in touch",
    visitSite: "Visit site",
    visit: "Visit",
    viewMore: "View",
    linkedin: "LinkedIn",
    github: "GitHub",
    email: "Email",
    terms: "Terms",
    privacy: "Privacy Policy",
  },
  storiesInvite: {
    title: "My Projects",
    body: "See what I've been building, from idea to production.",
  },
  hero: {
    line1: "Building",
    line2: "Robust Software",
    line3: "and Modern",
    line4: "Experiences",
    alt: "abstract technology visual",
  },
  intro: {
    greeting: "Hi, I'm Mauricio",
    role: "Full-stack Software Developer · Software Engineering graduate, PUC-RS",
    body: "I turn ideas into complete products, from a solid back-end to a polished interface. Whether it's building something from scratch as a freelancer or joining your team, let's talk.",
    aboutCta: "About me",
    cvCta: "Download CV",
    contactCta: "Get in touch",
    alt: "Mauricio Krziminski",
  },
  stories: {
    one: "I build robust, scalable back-ends.",
    two: "I craft modern, responsive interfaces.",
    three: "From database to UI, full products.",
    altOne: "source code on a dark editor",
    altTwo: "a modern app interface on a phone",
    altThree: "a developer workspace",
  },
  marqueeTop: {
    lineOne: "TypeScript · React · Next.js",
    lineTwo: "Clean Architecture · Docker · SQL",
    altOne: "code on a dark monitor",
    altTwo: "server equipment racks in a dark room",
  },
  marqueeBottom: {
    lineOne: "From Idea",
    lineTwo: "To Production",
    altOne: "glowing incandescent bulbs in the dark",
    altTwo: "metrics dashboard of a system in production",
  },
  featuredProjects: {
    titleOne: "Real problems",
    titleTwo: "solved with",
    titleThree: "modern code",
    description:
      "A selection of products I've designed and built end to end, from architecture to interface.",
    cta: "View projects",
  },
  skills: {
    heading: "How I Work",
    description:
      "I work across the full stack, from robust back-end services and databases to fast, modern front-ends.",
    cta: "Get in touch",
    backend: "Back-end Architecture",
    backendShort: "Back-end",
    frontend: "Modern Front-end",
    frontendShort: "Front-end",
    data: "Data & Infrastructure",
    dataShort: "Data & Infra",
  },
  quotes: {
    // rendered as one clipped headline; the hyphen slot is unused now (kept for
    // shape parity), the tagline wraps naturally at word boundaries
    titleA: "Turning ideas into robust, scalable software since 2022.",
    titleHyphen: "",
    titleB: "",
    sub: "Full-stack Software Developer and Software Engineering graduate from PUC-RS, focused on clean architecture and building things that last.",
    cta: "About me",
  },
  projectsPage: {
    title: "Projects",
    description:
      "Products I've built end to end, from data model and back-end to a responsive, modern interface.",
    imageAlt: "the ProOps app on a phone screen",
    cta: "View projects",
  },
  aboutPage: {
    title: "About",
    description:
      "I'm a full-stack software developer and Software Engineering graduate from PUC-RS. I like pairing solid fundamentals with clean, scalable code, building complete products from back-end to interface.",
    cta: "Get in touch",
    heroCta: "My journey",
    experienceTitle: "My journey",
    experienceIntro: "Where I come from and what I've been building along the way.",
    office: "Where I work",
    officeName: "Porto Alegre",
    officeDescription:
      "Based in Porto Alegre, RS, Brazil, building software with a focus on architecture, performance and developer experience.",
    gallery1Alt: "abstract graphic of stacked blocks rising from a baseline",
    gallery2Alt: "abstract graphic of a dot field condensing toward the center",
    gallery3Alt: "abstract graphic of an interface wireframe",
  },
  contactPage: {
    title: "Let's talk",
    description:
      "Tell me about your project, your team, or an idea you want to get off the ground. The form goes straight to my inbox.",
    nameLabel: "Name",
    namePlaceholder: "Your name",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    messageLabel: "Message",
    messagePlaceholder: "What would you like to build?",
    submit: "Send message",
    sending: "Sending...",
    success: "Message sent. Thanks for reaching out, I'll reply to this email.",
    errorName: "Please enter your name.",
    errorEmail: "Please enter a valid email address.",
    errorMessage: "Your message is a little short, tell me a bit more.",
    errorCaptcha: "We could not verify that you are human. Please try again.",
    errorGeneric:
      "Something went wrong on our side. Try again, or reach me directly below.",
    directTitle: "or reach me directly",
    whatsapp: "WhatsApp",
    waMessage: "Hi Mauricio, I came from your website.",
  },
  footer: {
    legal: "© Mauricio Krziminski 2026",
    address: "Porto Alegre, RS, Brazil",
    topOfPage: "Top of Page",
  },
} as const

type Strings = typeof en

const pt: Strings = {
  nav: {
    home: "Início",
    projects: "Projetos",
    about: "Sobre",
    contact: "Contato",
  },
  header: {
    menu: "Menu",
    close: "Fechar",
  },
  common: {
    scroll: "Rolar",
    loading: "Carregando...",
    getInTouchTop: "Fale",
    getInTouchBottom: "Comigo",
    viewProjects: "Ver projetos",
    getInTouch: "Entrar em contato",
    visitSite: "Visitar site",
    visit: "Visitar",
    viewMore: "Ver",
    linkedin: "LinkedIn",
    github: "GitHub",
    email: "Email",
    terms: "Termos",
    privacy: "Privacidade",
  },
  storiesInvite: {
    title: "Meus Projetos",
    body: "Veja o que venho construindo, da ideia à produção.",
  },
  hero: {
    line1: "Construindo",
    line2: "Software Robusto",
    line3: "e Experiências",
    line4: "Modernas",
    alt: "visual abstrato de tecnologia",
  },
  intro: {
    greeting: "Oi, eu sou o Mauricio",
    role: "Desenvolvedor de Software Full-stack · Formado em Engenharia de Software na PUC-RS",
    body: "Transformo ideias em produtos completos, do back-end sólido à interface bem-acabada. Seja pra construir algo do zero como freelancer, ou pra somar no seu time, vamos conversar.",
    aboutCta: "Sobre mim",
    cvCta: "Baixar CV",
    contactCta: "Entrar em contato",
    alt: "Mauricio Krziminski",
  },
  stories: {
    one: "Construo back-ends sólidos e escaláveis.",
    two: "Crio interfaces modernas e responsivas.",
    three: "Do banco à interface, produtos completos.",
    altOne: "código-fonte em um editor escuro",
    altTwo: "interface de app moderna em um celular",
    altThree: "um ambiente de desenvolvimento",
  },
  marqueeTop: {
    lineOne: "TypeScript · React · Next.js",
    lineTwo: "Clean Architecture · Docker · SQL",
    altOne: "código em um monitor escuro",
    altTwo: "racks de servidores em uma sala escura",
  },
  marqueeBottom: {
    lineOne: "Da Ideia",
    lineTwo: "À Produção",
    altOne: "lâmpadas incandescentes acesas no escuro",
    altTwo: "painel de métricas de um sistema em produção",
  },
  featuredProjects: {
    titleOne: "Problemas reais",
    titleTwo: "resolvidos com",
    titleThree: "código moderno",
    description:
      "Uma seleção de produtos que projetei e construí de ponta a ponta, da arquitetura à interface.",
    cta: "Ver projetos",
  },
  skills: {
    heading: "Como eu trabalho",
    description:
      "Atuo em toda a stack, de serviços de back-end e bancos de dados robustos a front-ends rápidos e modernos.",
    cta: "Entrar em contato",
    backend: "Arquitetura Back-end",
    backendShort: "Back-end",
    frontend: "Front-end Moderno",
    frontendShort: "Front-end",
    data: "Dados & Infraestrutura",
    dataShort: "Dados & Infra",
  },
  quotes: {
    titleA: "Transformando ideias em software robusto e escalável desde 2022.",
    titleHyphen: "",
    titleB: "",
    sub: "Desenvolvedor de Software Full-stack e formado em Engenharia de Software na PUC-RS, com foco em arquitetura limpa e em construir coisas que duram.",
    cta: "Sobre mim",
  },
  projectsPage: {
    title: "Projetos",
    description:
      "Produtos que construí de ponta a ponta, do modelo de dados e back-end a uma interface moderna e responsiva.",
    imageAlt: "o app ProOps na tela de um celular",
    cta: "Ver projetos",
  },
  aboutPage: {
    title: "Sobre",
    description:
      "Sou desenvolvedor de software full-stack, formado em Engenharia de Software na PUC-RS. Gosto de unir fundamentos sólidos a código limpo e escalável, construindo produtos completos, do back-end à interface.",
    cta: "Entrar em contato",
    heroCta: "Minha trajetória",
    experienceTitle: "Minha trajetória",
    experienceIntro: "De onde venho e o que venho construindo até aqui.",
    office: "Onde eu trabalho",
    officeName: "Porto Alegre",
    officeDescription:
      "Baseado em Porto Alegre, RS, Brasil, construindo software com foco em arquitetura, performance e experiência de desenvolvimento.",
    gallery1Alt: "gráfico abstrato de blocos empilhados subindo a partir da base",
    gallery2Alt: "gráfico abstrato de um campo de pontos adensando em direção ao centro",
    gallery3Alt: "gráfico abstrato de um wireframe de interface",
  },
  contactPage: {
    title: "Vamos conversar",
    description:
      "Me conte sobre seu projeto, seu time, ou uma ideia que você quer tirar do papel. O formulário cai direto na minha caixa de entrada.",
    nameLabel: "Nome",
    namePlaceholder: "Seu nome",
    emailLabel: "Email",
    emailPlaceholder: "voce@exemplo.com",
    messageLabel: "Mensagem",
    messagePlaceholder: "O que você quer construir?",
    submit: "Enviar mensagem",
    sending: "Enviando...",
    success: "Mensagem enviada. Obrigado pelo contato, respondo neste email.",
    errorName: "Por favor, informe seu nome.",
    errorEmail: "Por favor, informe um email válido.",
    errorMessage: "Sua mensagem ficou curta, me conte um pouco mais.",
    errorCaptcha: "Não conseguimos confirmar que você é humano. Tente de novo.",
    errorGeneric:
      "Algo deu errado do nosso lado. Tente de novo, ou fale comigo direto pelos canais abaixo.",
    directTitle: "ou fale comigo direto",
    whatsapp: "WhatsApp",
    waMessage: "Oi Mauricio, vim pelo seu site.",
  },
  footer: {
    legal: "© Mauricio Krziminski 2026",
    address: "Porto Alegre, RS, Brasil",
    topOfPage: "Topo da Página",
  },
}

export const strings = { en, pt }
export type { Strings }
