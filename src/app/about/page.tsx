import type { Metadata } from "next"

import About from "components/about/About"

// Replaces the Gatsby page's `Head`/`<SEO>` export. The root layout supplies the
// `%s | Mauricio Krziminski` title template, so `title` here is just the page name.
export const metadata: Metadata = {
  title: "Sobre",
  description:
    "Desenvolvedor de Software Full-stack, formado em Engenharia de Software na PUC-RS. Minha trajetória, experiências e o que construo.",
  alternates: {
    canonical: "/about",
  },
}

export default function Page() {
  return <About />
}
