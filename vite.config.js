import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { resolve, dirname } from 'node:path'

// https://vitejs.dev/config/
export default defineConfig({
  base:'/hiking-friends/',
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~bootstrap': resolve(
        dirname(fileURLToPath(import.meta.url)),
        'node_modules/bootstrap',
      ),
    }
  },
  build:{
    chunkSizeWarningLimit: 1500,
  }
})
