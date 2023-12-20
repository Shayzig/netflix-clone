import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build', // Set the desired output directory
  },
  plugins: [react()],
  server: {
    port: 3000
  },
  base: "/netflix-clone",
})
