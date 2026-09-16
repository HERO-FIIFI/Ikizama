import { copyFileSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ponytail: static SPA with two routes (/ and /path). Set `base: '/<repo>/'` for a GitHub Pages project site.
export default defineConfig({
  appType: 'spa',
  plugins: [
    react(),
    {
      // GitHub Pages has no rewrite rules; serving index.html as 404.html keeps /path reachable on refresh.
      name: 'spa-404-fallback',
      closeBundle: () => copyFileSync('dist/index.html', 'dist/404.html'),
    },
  ],
  build: { target: 'es2022', cssMinify: true },
})
