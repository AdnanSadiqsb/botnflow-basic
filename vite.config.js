import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import Inspect from 'vite-plugin-inspect'

import openInEditor from 'vite-plugin-open-in-editor';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    Inspect(),
    openInEditor(),
  ],
})

