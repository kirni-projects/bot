import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load env variables based on the current mode (e.g., development, production)
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: env.PRODUCTION_URL || 'http://localhost:5000', // Default to localhost if not in production
          changeOrigin: true,
        },
      },
    },
  };
});
