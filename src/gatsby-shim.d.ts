/**
 * Ambient type shims replacing Gatsby's auto-generated `Queries.*` namespace and
 * the project's `Contentful.*` types. The original site sourced these from
 * Contentful via GraphQL; here they describe the shape of the static stub data
 * in utils/data.ts so the ported components type-check unchanged.
 */

declare namespace Contentful {
  interface CompanyImage {
    width: number | null
    height: number | null
  }

  interface CompanyFile {
    url: string | null
    details: { image: CompanyImage | null } | null
  }

  interface CompanyLogo {
    description: string | null
    file: CompanyFile | null
  }

  interface CompanyNode {
    name: string | null
    url: string | null
    description: { description: string | null } | null
    logo: CompanyLogo | null
    /**
     * Optional local (public/) path to a browser-framed screenshot preview.
     * When present the portfolio card renders this full-bleed instead of the
     * small tinted logo. Added for the personal-portfolio remap.
     */
    image?: string | null
    /** Optional tech-stack tags shown on the card reveal. */
    tech?: readonly string[] | null
  }

  type CompanyNodes = CompanyNode[]

  interface TeamMemberNode {
    name: string | null
    title: string | null
    linkedin: string | null
    /** structurally identical to a company logo (file + details + description) */
    headshot: CompanyLogo | null
    description: { description: string | null } | null
    /** optional local (public/) logo or image shown on the experience card */
    logo?: string | null
    /** true = fill the frame (a photo); false/undefined = contain on a white chip (a logo) */
    logoCover?: boolean
  }

  type TeamMemberNodes = TeamMemberNode[]
}

declare namespace Queries {
  /** Matches the FeaturedCompany GraphQL fragment (url + logo). */
  type FeaturedCompanyFragment = Contentful.CompanyNode

  interface FactNode {
    id: string
    fullFact: string | null
    stat: string | null
    statisticDescription: string | null
  }

  interface FactsQuery {
    allContentfulFact: {
      edges: { node: FactNode }[]
    }
  }
}
