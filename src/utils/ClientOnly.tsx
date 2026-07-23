import React, { useEffect, useState } from "react"

/**
 * Renders its children only after the component has mounted on the client.
 * The original Gatsby build used this to defer rendering of subtrees that
 * branch on client-only state (e.g. `screen.mobile`) so they never produce a
 * server/client markup mismatch. Kept for the same reason in the Next port.
 */
type Props = {
  children: React.ReactNode
}

export default function ClientOnly({ children }: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return <>{children}</>
}
