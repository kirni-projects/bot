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
            main: path.resolve(__dirname, 'index.html'),  // Main app
          },
          output: {
            format: 'es',  // ES module format for main app (supports code-splitting)
            dir: 'dist',  // Output directory for main build
          },
        },
      },
      server: {
        port: 3000,
        proxy: {
          '/api': {
            target: process.env.VITE_PRODUCTION_URL || 'http://localhost:5000',
            changeOrigin: true,
            secure: false
          },
        },
      },
    };
  });








  // //frontend/vite-cpnfig.js
  // import { defineConfig, loadEnv } from 'vite';
  // import react from '@vitejs/plugin-react';
  // import path from 'path';

  // export default defineConfig(({ mode }) => {
  //   // Load env variables based on the current mode (e.g., development, production)
  //   const env = loadEnv(mode, process.cwd());

  //   return {
  //     plugins: [react()],   
  //     build: {
  //       rollupOptions: {
  //         input: {
  //           main: path.resolve(__dirname, 'index.html'),  // Main app
  //           renderWidget: path.resolve(__dirname, 'src/renderWidget.jsx'),  // Widget build
  //         },
  //         output: {
  //           format: 'iife',  // Immediately Invoked Function Expression, for use in the browser
  //           name: 'RenderWidgetBundle',  // Name of the global object
  //           inlineDynamicImports: false,  // Set this to false
  //         },
  //       },
  //     },
  //     server: {
  //       port: 3000,
  //       proxy: {
  //         '/api': {
  //           target: env.VITE_PRODUCTION_URL || 'http://localhost:5000', // Default to localhost if not in production
  //           changeOrigin: true,
  //         },
  //       },
  //     },
  //   };
  // });