import type { Metadata } from "next"

import Contact from "components/contact/Contact"

// Replaces the Gatsby page's `Head`/`<SEO>` export. The root layout supplies the
// `%s | Mauricio Krziminski` title template, so `title` here is just the page name.
export const metadata: Metadata = {
  title: "Contato",
  description:
    "Fale comigo sobre seu projeto, seu time, ou uma ideia que você quer tirar do papel. Formulário, WhatsApp, email e LinkedIn.",
  alternates: {
    canonical: "/contact",
  },
}

export default function Page() {
  return <Contact />
}
