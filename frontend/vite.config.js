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
          widget: path.resolve(__dirname, 'src/widget.jsx'),  // Ensure widget.jsx is correctly pointed
        },
        output: {
          entryFileNames: (chunkInfo) => {
            // For widget.jsx, ensure the output is always named widget.js
            if (chunkInfo.name === 'widget') {
              return 'assets/widget.js';
            }
            return 'assets/[name].js';
          },
        },
      },
      outDir: 'dist',
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_PRODUCTION_URL || 'http://localhost:5000',
          changeOrigin: true,
        },
      },
    },
  };
});
