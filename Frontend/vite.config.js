import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: '../backend/public', // Set the desired output directory
    emptyOutDir: true,
  },
  plugins: [react()],
  server: {
    port: 3000
  },
})
