/// <reference types="vitest" />

import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import * as path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  test: {
    setupFiles: "./setupTest.ts",
    environment: "jsdom",
    globals: true
  },
  server: {
    host: "0.0.0.0",
    port: 5173
  }
})
