import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:'5000'
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: "./src/main.jsx",
    },
  },
})
