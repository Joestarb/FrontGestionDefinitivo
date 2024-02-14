import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https : {
      key: 'C:/Windows/System32/ca.key',
      cert: 'C:/Windows/System32/ca.crt',
    }
  },
  plugins: [react()],
})