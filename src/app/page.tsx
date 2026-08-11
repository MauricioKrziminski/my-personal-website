import type { Metadata } from "next"

import Home from "components/homepage/Home"
import { siteMetadata } from "utils/siteMetadata"

// A aba da home mostrava só "Mauricio Krziminski" porque, sem `title` aqui, valia
// o `title.default` do layout. E o título vai escrito por extenso de propósito:
// o `title.template` (`%s | ...`) do layout **não** se aplica ao page.tsx do mesmo
// segmento de rota, só a segmentos filhos (/projects, /about). Está na doc do
// Next: "title.template defined in layout.js will not apply to a title defined in
// a page.js of the same route segment".
export const metadata: Metadata = {
  title: `Home | ${siteMetadata.title}`,
  alternates: {
    canonical: "/",
  },
}

export default function Page() {
  return <Home />
}
