import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'build',
  },
  resolve: {
    dedupe: ['react', 'react-dom'],
    tsconfigPaths: true,
  },
  server: {
    port: 3000,
    strictPort: true,
    // proxy: {
    //   '/api': 'http://localhost:3001'
    // },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/setupTests.js', 'trace-canvas.js']
  },
})