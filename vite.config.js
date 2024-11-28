import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
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
            {
                find: '@/services',
                replacement: resolve(__dirname, './src/services'),
            },
        ],
    },
});
