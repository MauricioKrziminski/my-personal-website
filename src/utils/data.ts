/**
 * Static, bilingual portfolio data. Replaces the original Contentful GraphQL
 * sources. Each `get*(lang)` builds the array in the requested language, reusing
 * the ambient `Contentful.*` / `Queries.*` shapes so the card components render
 * unchanged. Swap URLs / add real project logos later.
 */

import type { Language } from "utils/i18n/LanguageContext"

type L = Record<Language, string>

// Placeholder logo/thumb until real project images are dropped in.
const placeholderLogoUrl = "example.com/images/global/LogoLight.svg"

// ---------------------------------------------------------------------------
// Projects (homepage "featured" + /portfolio grid), reuses Contentful.CompanyNode
// ---------------------------------------------------------------------------
const makeProject = (
  name: string,
  url: string,
  description: string,
  image: string | null,
  tech: readonly string[]
): Contentful.CompanyNode => ({
  name,
  url,
  description: { description },
  // Browser-framed screenshot preview (public/ path); falls back to the tinted
  // placeholder logo when no screenshot exists yet.
  image,
  tech,
  logo: {
    description: `${name}`,
    file: {
      url: placeholderLogoUrl,
      details: { image: { width: 500, height: 150 } },
    },
  },
})

const PROJECTS: {
  name: string
  url: string
  description: L
  image: string | null
  tech: readonly string[]
}[] = [
  {
    name: "ProOps",
    url: "https://proops.com.br/",
    image: "/images/projects/proops.webp",
    tech: ["Next.js", "TypeScript", "Firebase", "Cloud Run"],
    description: {
      pt: "SaaS multi-tenant de gestão comercial e operacional, construído em dupla: propostas com PDF, CRM em kanban, financeiro e pagamentos integrados.",
      en: "Multi-tenant SaaS for sales and operations management, built with a partner: PDF proposals, kanban CRM, finance and integrated payments.",
    },
  },
  {
    name: "SoftCode",
    url: "https://softcodedev.com.br/",
    image: "/images/projects/softcode.webp",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    description: {
      pt: "Landing page da minha software house, com design moderno, animações e foco em performance.",
      en: "Landing page for my software house, a modern, animated design focused on performance.",
    },
  },
  {
    name: "Barbalog",
    url: "https://www.barbalog.com.br/",
    image: "/images/projects/barbalog.webp",
    tech: ["Next.js", "TypeScript", "Tailwind"],
    description: {
      pt: "Site institucional para uma consultoria em logística e supply chain, entregue pela SoftCode.",
      en: "Institutional site for a logistics and supply-chain consultancy, delivered by SoftCode.",
    },
  },
  {
    name: "Confeitaria GE",
    url: "https://confeitaria-ge.vercel.app/",
    image: "/images/projects/confeitaria-ge.webp",
    tech: ["Next.js", "Tailwind", "Vercel"],
    description: {
      pt: "Plataforma web para uma confeitaria artesanal, com catálogo de produtos interativo e design responsivo.",
      en: "Web platform for an artisanal bakery, with an interactive product catalog and a responsive design.",
    },
  },
  {
    name: "LyftConnect",
    url: "https://lyftconnect.com.br/",
    image: "/images/projects/lyftconnect.webp",
    tech: ["Next.js", "React", "Tailwind"],
    description: {
      pt: "Site para uma empresa de automação residencial, apresentando serviços de casa inteligente com visual moderno.",
      en: "Site for a home-automation company, showcasing smart-home services with a modern look.",
    },
  },
]

export const getProjects = (lang: Language): Contentful.CompanyNodes =>
  PROJECTS.map(p =>
    makeProject(p.name, p.url, p.description[lang], p.image, p.tech)
  )

// ---------------------------------------------------------------------------
// Experience (the /about page + its cards), reuses Contentful.TeamMemberNode
// ---------------------------------------------------------------------------
const makeExperience = (
  name: string,
  title: string,
  description: string,
  link: string,
  logo: string,
  logoCover: boolean
): Contentful.TeamMemberNode => ({
  name,
  title,
  linkedin: link,
  headshot: null, // Card skips the <img> when null
  description: { description },
  logo,
  logoCover,
})

const EXPERIENCES: {
  name: string
  title: L
  description: L
  link: string
  logo: string
  logoCover: boolean
}[] = [
  {
    name: "ProOps",
    title: {
      pt: "Sócio e Desenvolvedor Full-stack · desde 2025",
      en: "Partner and Full-stack Developer · since 2025",
    },
    description: {
      pt: "Produto próprio, tocado em sociedade com outro desenvolvedor: arquitetura, front-end, back-end, infraestrutura e CI/CD. Next.js, TypeScript, Firebase, Cloud Run e integrações de pagamento.",
      en: "A product of our own, run in partnership with another developer: architecture, front-end, back-end, infrastructure and CI/CD. Next.js, TypeScript, Firebase, Cloud Run and payment integrations.",
    },
    link: "https://proops.com.br/",
    logo: "/images/team/logos/proops.webp",
    logoCover: false,
  },
  {
    name: "Banrisul",
    title: {
      pt: "Desenvolvedor de Sistemas · desde 2024",
      en: "Systems Developer · since 2024",
    },
    description: {
      pt: "Modernização e reestruturação do aplicativo bancário: novas funcionalidades, melhoria de fluxos e otimização de processos. C#, .NET, JavaScript, jQuery, IBM Db2 e Oracle.",
      en: "Modernizing and restructuring the banking app: new features, improved flows and process optimization. C#, .NET, JavaScript, jQuery, IBM Db2 and Oracle.",
    },
    link: "https://www.linkedin.com/in/mauriciokrziminski/",
    logo: "/images/team/logos/banrisul.webp",
    logoCover: false,
  },
  {
    name: "Freelancer",
    title: {
      pt: "Desenvolvedor Full-stack",
      en: "Full-stack Developer",
    },
    description: {
      pt: "Projetos web sob demanda (Confeitaria GE, LyftConnect), da arquitetura à interface. Next.js, React, Tailwind e deploy em Vercel/Cloudflare.",
      en: "On-demand web projects (Confeitaria GE, LyftConnect), from architecture to interface. Next.js, React, Tailwind and Vercel/Cloudflare deploys.",
    },
    link: "https://github.com/MauricioKrziminski",
    logo: "/images/team/logos/freelancer.webp",
    logoCover: true,
  },
  {
    name: "Hackatona Tecnopuc",
    title: {
      pt: "3º Lugar · 2025",
      en: "3rd Place · 2025",
    },
    description: {
      pt: "Equipe Thinking Heads: app mobile em Swift e back-end em Go para resolver um desafio real, com foco em performance e UX.",
      en: "Team Thinking Heads: a Swift mobile app and a Go back-end solving a real-world challenge, focused on performance and UX.",
    },
    link: "https://github.com/MauricioKrziminski",
    logo: "/images/team/logos/hackatona.webp",
    logoCover: false,
  },
  {
    name: "PUC-RS",
    title: {
      pt: "Eng. de Software · 2022 a 2026",
      en: "Software Engineering · 2022 to 2026",
    },
    description: {
      pt: "Bacharelado em Engenharia de Software: arquitetura de sistemas, bancos de dados, desenvolvimento web/mobile e metodologias ágeis.",
      en: "Bachelor's in Software Engineering: system architecture, databases, web/mobile development and agile methodologies.",
    },
    link: "https://www.linkedin.com/in/mauriciokrziminski/",
    logo: "/images/team/logos/pucrs.webp",
    logoCover: false,
  },
]

export const getExperiences = (lang: Language): Contentful.TeamMemberNodes =>
  EXPERIENCES.map(e =>
    makeExperience(
      e.name,
      e.title[lang],
      e.description[lang],
      e.link,
      e.logo,
      e.logoCover
    )
  )

// ---------------------------------------------------------------------------
// Stats (homepage Quotes cards), reuses Queries.FactNode (stat + description)
// ---------------------------------------------------------------------------
const STATS: { id: string; stat: L; description: L }[] = [
  {
    id: "1",
    stat: { pt: "3º", en: "3rd" },
    description: {
      pt: "lugar na Hackatona Tecnopuc",
      en: "place at the Tecnopuc Hackathon",
    },
  },
  {
    id: "2",
    stat: { pt: "2024", en: "2024" },
    description: {
      pt: "Desenvolvedor de Sistemas no Banrisul",
      en: "Systems Developer at Banrisul",
    },
  },
  {
    id: "3",
    stat: { pt: "1", en: "1" },
    description: {
      pt: "SaaS próprio em produção",
      en: "SaaS product of my own in production",
    },
  },
]

export const getStats = (lang: Language): Queries.FactNode[] =>
  STATS.map(s => ({
    id: s.id,
    fullFact: null,
    stat: s.stat[lang],
    statisticDescription: s.description[lang],
  }))
