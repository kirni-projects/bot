import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Load environment variables based on the mode (development or production)
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],

    // Build configuration
    build: {
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'), // Main entry point for the app
          widget: path.resolve(__dirname, 'public/widget.js'), // Widget entry point for embedding
        },
        output: {
          entryFileNames: 'assets/[name]-[hash].js', // Ensure output files have unique names with a hash
        },
      },
      outDir: 'dist', // Directory where the built files will be output
    },

    // Development server configuration
    server: {
      port: 3000, // The port where the dev server runs
      proxy: {
        '/api': {
          target: env.VITE_PRODUCTION_URL || 'http://localhost:5000', // Proxy API calls to backend server
          changeOrigin: true, // Handle CORS issues
        },
      },
    },

    // Resolve configuration for importing files and modules
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'), // Alias for src directory
      },
    },
  };
});
