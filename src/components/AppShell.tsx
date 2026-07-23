"use client"

import React from "react"

import Layout from "components/Layout"
import Providers from "components/Providers"

// Side-effect import: registers GSAP plugins before the tree mounts.
import "@/lib/registerGsap"

/**
 * Client boundary that reproduces the Gatsby `wrapPageElement` wrapping
 * (<Providers><Layout>…</Layout></Providers>). Because this file carries the
 * "use client" directive, every component it pulls in (Providers, Layout,
 * Header, Scroll, Transition, and their descendants) joins the client bundle
 * automatically — so the ported leaf components don't each need the directive.
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <Layout>{children}</Layout>
    </Providers>
  )
}
