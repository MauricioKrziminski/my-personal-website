/**
 * Static site metadata. Replaces the Gatsby `useStaticQuery(graphql\`…siteMetadata\`)`
 * lookup that the original Seo component used. Edit these values for the real site.
 */
export const siteMetadata = {
  title: "Mauricio Krziminski",
  description:
    "Desenvolvedor de Software Full-stack, formado em Engenharia de Software na PUC-RS, construindo back-ends robustos e interfaces modernas em toda a stack.",
  image: "/images/og-default.png",
  siteUrl: "https://mauriciokrziminski.com.br",
}

export type SiteMetadata = typeof siteMetadata
