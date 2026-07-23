"use client"

import React, { useState } from "react"

import isPropValid from "@emotion/is-prop-valid"
import { useServerInsertedHTML } from "next/navigation"
import { ServerStyleSheet, StyleSheetManager } from "styled-components"

/**
 * Collects styled-components styles generated during SSR and injects them into
 * the document <head>, preventing a flash of unstyled content on first paint.
 * Ported from the original Gatsby site (which handled this via gatsby-plugin-styled-components).
 * See: https://nextjs.org/docs/app/guides/css-in-js#styled-components
 *
 * Also filters non-standard props (isDark, navIsOpen, …) so they aren't
 * forwarded to the DOM — the ported components rely on plain boolean/string
 * props rather than transient ($-prefixed) ones.
 */

// Forward a prop to the underlying DOM element only if it's a valid HTML
// attribute; always forward when the styled target is a React component.
const shouldForwardProp = (propName: string, target: unknown) =>
  typeof target === "string" ? isPropValid(propName) : true

export default function StyledComponentsRegistry({
  children,
}: {
  children: React.ReactNode
}) {
  const [styledComponentsStyleSheet] = useState(() => new ServerStyleSheet())

  useServerInsertedHTML(() => {
    const styles = styledComponentsStyleSheet.getStyleElement()
    styledComponentsStyleSheet.instance.clearTag()
    return <>{styles}</>
  })

  // On the client, styled-components manages its own sheet; we still apply the
  // StyleSheetManager so shouldForwardProp runs there too.
  if (typeof window !== "undefined") {
    return (
      <StyleSheetManager shouldForwardProp={shouldForwardProp}>
        {children}
      </StyleSheetManager>
    )
  }

  return (
    <StyleSheetManager
      sheet={styledComponentsStyleSheet.instance}
      shouldForwardProp={shouldForwardProp}
    >
      {children}
    </StyleSheetManager>
  )
}
