// frontend/vite.config.widget.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'src/renderWidget.jsx'),  // Path to your widget entry file
      output: {
        format: 'iife',  // IIFE format for embedding
        name: 'RenderWidgetBundle',  // Name of the global object for the widget
        dir: 'dist/widget',  // Output directory for the widget build
        entryFileNames: 'renderWidget.js',  // Output file name
      },
    },
    outDir: 'dist/widget',  // Ensure the output is in 'dist/widget'
  },
});