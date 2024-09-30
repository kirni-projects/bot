import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode (e.g., development, production)
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
          widget: path.resolve(__dirname, 'src/widget.jsx'),  // Ensure correct path for widget.js
        },
        output: {
          entryFileNames: 'assets/[name]-[hash].js',  // Ensure the output has a unique hash for caching
        },
      },
      outDir: 'dist',  // Output directory for production build
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: env.VITE_PRODUCTION_URL || 'http://localhost:5000', // Backend API server
          changeOrigin: true,
        },
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),  // Alias for clean imports
      },
    },
    esbuild: {
      jsxInject: `import React from 'react'`, // Automatically inject React where necessary
    },
    define: {
      'process.env': {
        VITE_PRODUCTION_URL: JSON.stringify(env.VITE_PRODUCTION_URL),
      },
    },
  };
});
