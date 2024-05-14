import { defineConfig } from "vite"
import { ViteMinifyPlugin as minifyHtml } from "vite-plugin-minify"
import { viteSingleFile as inlineAssets } from "vite-plugin-singlefile"

export default defineConfig({
  plugins: [
    inlineAssets({ removeViteModuleLoader: true }),
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
    }
  },
  esbuild: {
    legalComments: "none"
  }
})
