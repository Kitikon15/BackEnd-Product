import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import events from 'events'

events.EventEmitter.defaultMaxListeners = 30

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['lucide-react'],
    force: true
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.js'],
    css: false,
  }
})
