import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          widget: path.resolve(__dirname, 'public/widget.js'),
          chatbotLogic: path.resolve(__dirname, 'public/chatbotLogic.js'),  // Ensure chatbot logic is included
        },
        output: {
          entryFileNames: 'assets/[name]-[hash].js',
        },
      },
      outDir: 'dist',
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_PRODUCTION_URL || 'http://localhost:5000', // Proxy to the backend
          changeOrigin: true,
        },
      },
    },
  };
});
