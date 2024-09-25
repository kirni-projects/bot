// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html'),
        widget: path.resolve(__dirname, 'public/widget.jsx'),  // Updated to .jsx
        chatbotLogic: path.resolve(__dirname, 'public/chatbotLogic.jsx'),  // Updated to .jsx
      },
      output: {
        entryFileNames: 'assets/[name]-[hash].js',  // Ensure correct output format
      },
    },
    outDir: 'dist',
  },
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',  // Adjust to your backend server
        changeOrigin: true,
      },
    },
  },
});
