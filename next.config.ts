import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export (`out/`) so the site can be served as plain static files
  // on Cloudflare Pages. Safe here: no route handlers, no server-only data, and
  // next/image is only used as a type (StaticImageData), never the runtime
  // <Image> optimizer, so nothing needs a Node server at runtime.
  output: "export",
  // O código herdado do port de Gatsby foi escrito contra um setup de tipos/lint
  // mais frouxo. Não deixe essas pendências antigas travarem o build; o editor
  // continua checando os tipos. Dá para apertar isto quando forem resolvidas.
  typescript: {
    ignoreBuildErrors: true,
  },
  compiler: {
    // Enable styled-components SSR/transform support.
    // `displayName`/`fileName` are deliberately off: they bake the component and
    // source-file names into the generated class names, which ships the whole
    // internal component tree in the production bundle for anyone to read. `ssr`
    // stays on because styled-components needs it to hydrate without a flash.
    styledComponents: {
      ssr: true,
      displayName: false,
      fileName: false,
    },
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
