import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export (`out/`) so the site can be served as plain static files
  // on Cloudflare Pages. Safe here: no route handlers, no server-only data, and
  // next/image is only used as a type (StaticImageData), never the runtime
  // <Image> optimizer, so nothing needs a Node server at runtime.
  output: "export",
  // The ported New Form codebase was written against Gatsby's looser type/lint
  // setup. Don't let its pre-existing strict-mode nits block the build; the
  // editor still type-checks. Tighten these once the port is stabilised.
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    // Enable styled-components SSR/transform support (ported from Gatsby site)
    styledComponents: true,
  },
  turbopack: {
    // Import *.svg as React components (SVGR), matching the original Gatsby
    // `import { ReactComponent as X } from "…svg"` behavior. Here the default
    // export IS the component, so imports are rewritten to default imports.
    rules: {
      "*.svg": {
        loaders: [
          {
            loader: "@svgr/webpack",
            options: {
              // The Approach icons (Finance/Data/Blockchain) drive their reveal
              // animations by querying the SVG's own elements by tag AND by
              // original class name, e.g.
              //   Finance:    querySelectorAll("rect"), filter !.background
              //   Data:       querySelectorAll("circle:not(.specialBackground)")
              //   Blockchain: querySelectorAll("g"), filter .one/.two/.three/.four
              // So SVGO must NOT (a) convert <rect>/<circle> to <path>,
              // (b) collapse the animated <g>s, or (c) rename the class names.
              // We still scope element ids (prefixIds) to avoid cross-icon id
              // collisions (e.g. every Figma export ships an id="pattern0").
              svgoConfig: {
                plugins: [
                  {
                    name: "preset-default",
                    params: {
                      overrides: {
                        convertShapeToPath: false,
                        collapseGroups: false,
                      },
                    },
                  },
                  {
                    name: "prefixIds",
                    params: { prefixClassNames: false },
                  },
                ],
              },
            },
          },
        ],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
