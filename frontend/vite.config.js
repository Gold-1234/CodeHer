import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [

    react(),
    tailwindcss(),
  ],
  define: {
    global: "window",
  },
  base : '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: [
      "quill",
      "react-quilljs",
      "@google/model-viewer",
      "lit",
      "lit-html",
      "lit-element",
      ],
  },
   build: {
    commonjsOptions: {
      transformMixedEsModules: true
    },
  }
})

