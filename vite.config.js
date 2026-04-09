import { defineConfig } from 'vite'
import path from 'path'

export default defineConfig({
    server: {
        port: 3000,
        open: true,
    },
    
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: true, // генерация source maps для отладки
    },
    
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
            '@components': path.resolve(__dirname, './src/components'),
            '@view': path.resolve(__dirname, './src/view'),
        }
    },

    optimizeDeps: {
        include: [],
    },
})