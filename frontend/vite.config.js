import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react(), tailwindcss()],
//     server: {
//     host: '192.168.14.19', // binds to local IP
//     port: 5173,
//     proxy: {
//       '/api': 'http://192.168.14.19:3000' // Proxy backend
//     }
//   }

// })

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
