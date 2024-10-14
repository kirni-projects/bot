import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'src/renderWidget.jsx'),  // Entry point for your widget
      output: {
        format: 'iife',  // Format for embedding in the browser
        name: 'RenderWidgetBundle',
        dir: 'dist/widget',
        entryFileNames: 'renderWidget.js',
      },
    },
    outDir: 'dist/widget',  // Output directory
  },
});
