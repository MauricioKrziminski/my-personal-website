"use client"

import { useEffect } from "react"

import { useRouter } from "next/navigation"

import { setRouterPush } from "utils/nextRouter"

/**
 * Mounts once at the app root and hands the App Router's `push` to the
 * module-level bridge so non-React code (the transition engine) can navigate.
 * Renders nothing.
 */
export default function RouterBridge() {
  const router = useRouter()

  useEffect(() => {
    setRouterPush((href: string) => router.push(href))
  }, [router])

  return null
}
