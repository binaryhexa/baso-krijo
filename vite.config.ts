import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// const urlMenuApi = process.env.VITE_URL_MENU_API;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: urlMenuApi,
  //       changeOrigin: true,
  //       // rewrite: (path) => path.replace(/^\/api/, ''),
  //       secure: false,
  //     },
  //   },
  // },
  resolve: {
    alias: [
      {
        find: '@/home',
        replacement: resolve(__dirname, './src/home'),
      },
      {
        find: '@/assets',
        replacement: resolve(__dirname, './src/assets'),
      },
      {
        find: '@/components',
        replacement: resolve(__dirname, './src/components'),
      },
      {
        find: '@/context',
        replacement: resolve(__dirname, './src/context'),
      },
      {
        find: '@/fonts',
        replacement: resolve(__dirname, './src/fonts'),
      },
      {
        find: '@/pages',
        replacement: resolve(__dirname, './src/pages'),
      },
      {
        find: '@/utils',
        replacement: resolve(__dirname, './src/utils'),
      },
    ],
  },
})
