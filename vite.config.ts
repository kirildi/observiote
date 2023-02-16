import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/iotpp/rest/": "http://localhost:8285"
    }
  },
  plugins: [vue()],
})
