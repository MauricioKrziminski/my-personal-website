import type { Metadata } from "next"

import Portfolio from "components/portfolio/Portfolio"

// Replaces the Gatsby page's `Head`/`<SEO>` export. The root layout supplies the
// `%s | New Form` title template, so `title` here is just the page name.
export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Projetos que construí de ponta a ponta — do back-end à interface. Next.js, React, TypeScript e mais.",
  alternates: {
    canonical: "/portfolio",
  },
}

export default function Page() {
  return <Portfolio />
}
