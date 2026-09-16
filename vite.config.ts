import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ponytail: static SPA. Set `base: '/<repo>/'` if deploying to a GitHub Pages project site.
export default defineConfig({
  plugins: [react()],
  build: { target: 'es2022', cssMinify: true },
})
