// frontend/vite.config.widget.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'src/renderWidget.jsx'),
      output: {
        format: 'iife', // IIFE format for embedding
        name: 'RenderWidgetBundle', // Global object for the widget
        dir: 'dist/widget',
        entryFileNames: 'renderWidget.js',
      },
    },
    outDir: 'dist/widget',
  },
});
