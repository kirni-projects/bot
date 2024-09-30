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
        chatbotLogic: path.resolve(__dirname, 'public/chatbotLogic.jsx'), // Correctly point to the src file
      },
      output: {
        entryFileNames: 'assets/[name].js'
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
