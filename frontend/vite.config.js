import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        widget: path.resolve(__dirname, 'public/widget.js'),
        chatbotLogic: path.resolve(__dirname, 'public/chatbotLogic.jsx'), // Ensure chatbotLogic is part of the build
      },
      output: {
        entryFileNames: '[name].js', // No hash, use '[name].js' for consistent file naming
      },
    },
    outDir: 'dist',
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: process.env.VITE_PRODUCTION_URL || 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
