import { useMemo } from "react"

import { usePathname } from "next/navigation"

/**
 * Drop-in replacement for @reach/router's `useLocation`, used by the ported
 * Gatsby components (Layout, Scroll). Returns a location-like object whose
 * identity only changes when the pathname changes — this matters because Scroll
 * lists `location` in an effect dependency array to recreate ScrollSmoother on
 * navigation, and a fresh object every render would thrash it.
 */
export const useLocation = () => {
  const pathname = usePathname()

  return useMemo(() => {
    const search =
      typeof window !== "undefined" ? window.location.search : ""
    const hash = typeof window !== "undefined" ? window.location.hash : ""
    return {
      pathname: pathname ?? "/",
      search,
      hash,
      href: `${pathname ?? "/"}${search}${hash}`,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname])
}

export default useLocation
