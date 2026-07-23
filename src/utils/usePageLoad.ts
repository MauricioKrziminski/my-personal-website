import { useLoaders } from "./Loader/TransitionUtils"
import { usePageReady } from "./pageReady"

export default function usePageLoad() {
  usePageReady()
  useLoaders()
}
