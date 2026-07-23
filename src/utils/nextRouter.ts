/**
 * Bridge that exposes Next's App Router `push` imperatively, outside of React.
 *
 * The ported transition engine (utils/Loader/TransitionUtils.ts) calls
 * `navigate()` from plain module code — it has no access to the `useRouter`
 * hook. Gatsby solved this with `gatsby-link`'s standalone `navigate`. In the
 * App Router there is no equivalent, so we capture `router.push` from a mounted
 * client component (see components/RouterBridge.tsx) and store it here.
 */

type PushFn = (href: string) => void

let routerPush: PushFn | null = null

/**
 * Called once by <RouterBridge/> to register the live router push function.
 */
export const setRouterPush = (push: PushFn) => {
  routerPush = push
}

/**
 * Imperatively navigate to an internal route using the Next router.
 * Falls back to a hard location change if the bridge hasn't mounted yet.
 */
export const routerNavigate = (to: string) => {
  if (routerPush) routerPush(to)
  else if (typeof window !== "undefined") window.location.assign(to)
}
