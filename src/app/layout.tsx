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
    images: [siteMetadata.image],
  },
  twitter: {
    card: "summary",
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
