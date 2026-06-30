import { defineConfig } from 'vite'
// Tailwind v4 uses PostCSS plugin, configured in postcss.config.js
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
})
