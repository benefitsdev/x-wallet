import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { crx } from '@crxjs/vite-plugin'
import path from 'path'
import fs from 'fs'
import manifest from './manifest.json'

const customPlaceholderHtml = fs.readFileSync(
  path.resolve(__dirname, 'dev-placeholder.html'),
  'utf-8',
)

export default defineConfig({
  server: {
    host: '0.0.0.0',
  },
  plugins: [
    react(),
    tailwindcss(),
    crx({ manifest }),
    {
      name: 'custom-crx-placeholder',
      enforce: 'post',
      generateBundle(_, bundle) {
        for (const [fileName, chunk] of Object.entries(bundle)) {
          if (chunk.type !== 'asset') continue
          if (!fileName.endsWith('.html')) continue
          const src = chunk.source as string
          if (!src.includes('CRXJS') && !src.includes('loading-page')) continue
          chunk.source = customPlaceholderHtml
        }
        for (const assetName of Object.keys(bundle)) {
          if (assetName.includes('loading-page')) delete bundle[assetName]
        }
      },
    },
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        popup: path.resolve(__dirname, 'popup.html'),
      },
    },
  },
})
