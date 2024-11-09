import {defineConfig} from "vite";
import dts from "vite-plugin-dts";
import { externalizeDeps } from "vite-plugin-externalize-deps";

export default defineConfig({
  plugins: [dts(), externalizeDeps()],
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"], // Just export ES6 modules
      fileName: "index",
    },
  },
})
