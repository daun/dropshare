import { defineConfig } from "vite"
import { ViteMinifyPlugin as minifyHtml } from "vite-plugin-minify"
import { viteSingleFile as inlineAssets } from "vite-plugin-singlefile"

export default defineConfig({
  plugins: [
    inlineAssets({
      // inlinePattern: ["*/**/*.js", "*/**/*.css"]
    }),
    minifyHtml({}),
  ],
  root: "src",
  build: {
    outDir: "../",
    emptyOutDir: false,
    terserOptions: {
      format: {
        comments: false
      }
    },
    rollupOptions: {
      external: [
        "highlight.js",
        "highlight.js/lib/languages/markdown",
        "highlight.js/lib/languages/xml",
        "highlight.js/lib/languages/css",
        "highlight.js/lib/languages/javascript",
        "highlight.js/lib/languages/typescript",
        "highlight.js/lib/languages/php",
        "highlight.js/styles/github.css",
        "highlight.js/styles/github-dark.css",
      ],
      output: {
        paths: {
          "highlight.js": "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/es/highlight.min.js",
          "highlight.js/lib/languages/markdown": "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/es/languages/markdown.min.js",
          "highlight.js/lib/languages/xml": "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/es/languages/xml.min.js",
          "highlight.js/lib/languages/css": "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/es/languages/css.min.js",
          "highlight.js/lib/languages/javascript": "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/es/languages/javascript.min.js",
          "highlight.js/lib/languages/typescript": "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/es/languages/typescript.min.js",
          "highlight.js/lib/languages/php": "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/es/languages/php.min.js",
          "highlight.js/styles/github.css": "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github.min.css",
          "highlight.js/styles/github-dark.css": "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/github-dark.min.css",
        }
      }
    }
  },
  esbuild: {
    legalComments: "none"
  }
})
