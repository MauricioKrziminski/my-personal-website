import type { Metadata } from "next"

import AppShell from "components/AppShell"
import RouterBridge from "components/RouterBridge"
import { siteMetadata } from "utils/siteMetadata"

import StyledComponentsRegistry from "@/lib/StyledComponentsRegistry"
import "./globals.css"

export const metadata: Metadata = {
  title: {
    default: siteMetadata.title,
    template: `%s | ${siteMetadata.title}`,
  },
  description: siteMetadata.description,
  metadataBase: new URL(siteMetadata.siteUrl),
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: siteMetadata.image,
        width: 1200,
        height: 630,
        alt: `${siteMetadata.title}, Desenvolvedor de Software Full-stack`,
      },
    ],
  },
  twitter: {
    // a OG image é 1200x630, então o card grande (e não o "summary" quadrado)
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.image],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <StyledComponentsRegistry>
          <RouterBridge />
          <AppShell>{children}</AppShell>
        </StyledComponentsRegistry>
      </body>
    </html>
  )
}
