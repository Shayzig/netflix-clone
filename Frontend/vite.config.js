import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './build/check', // Set the desired output directory
    emptyOutDir: true,
    assetsDir: './assets'
  },
  plugins: [react()],
  server: {
    port: 3000
  },
  base: "/netflix-clone",
})
