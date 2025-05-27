import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/",
  plugins: [react()],
  preview: {
  port: 3000,
  strictPort: true,
 },
  server: {
    port: 3000,
    strictPort: true,
    host: true,
    proxy:{
      '/api':{
        target: 'http://127.0.0.1:3001',
        changeOrigin: true      }
    }
  }
})
