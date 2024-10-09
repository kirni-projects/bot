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
          main: path.resolve(__dirname, 'index.html'),  // Main app
          renderWidget: path.resolve(__dirname, 'src/renderWidget.jsx'),  // Widget build
        },
        output: [
          {
            // For the main entry point, use the "es" format to support code splitting
            format: 'es',  // ES module format for the main application
            dir: 'dist',  // Output directory
            entryFileNames: '[name].js',  // Naming pattern for entry files
          },
          {
            // For the renderWidget entry point, use IIFE format (no code-splitting)
            format: 'iife',  // IIFE format for embedding
            name: 'RenderWidgetBundle',  // Name of the global object
            entryFileNames: 'renderWidget.js',  // File name for widget script
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
          }
        ],
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