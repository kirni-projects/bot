import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';


export default defineConfig(({ mode }) => {
  // Load env variables based on the current mode (e.g., development, production)
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          chatbotLogic: path.resolve(__dirname, 'dist/chatbotLogic.js'), // Ensure this script is built
        },
        output: {
          entryFileNames: 'assets/[name]-[hash].js', // Ensure correct output
        },
      },
      outDir: 'dist',
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_PRODUCTION_URL || 'http://localhost:5000', // Default to localhost if not in production
          changeOrigin: true,
        },
      },
    },
    
  };
});
