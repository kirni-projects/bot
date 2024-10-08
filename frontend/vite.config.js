//frontend/vite-cpnfig.js
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
          main: path.resolve(__dirname, "index.html"),
          widget: path.resolve(__dirname, "public/widget.js"), // Add widget.js
          renderWidget: path.resolve(__dirname, 'src/renderWidget.jsx'),  // Add this for the widget build

        },
        output: {
          format: 'iife',  // Immediately Invoked Function Expression, for use in the browser
          name: 'RenderWidgetBundle',  // Name of the global object
        },
      },
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