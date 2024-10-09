import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: path.resolve(__dirname, 'src/renderWidget.jsx'),  // Widget build
      output: {
        format: 'iife',  // IIFE format for embedding
        name: 'RenderWidgetBundle',  // Name of the global object for widget
        dir: 'dist/widget',  // Output directory for the widget build
        entryFileNames: 'renderWidget.js',  // File name for the widget
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
      },
    },
    outDir: 'dist/widget',  // Output directory for the widget
  },
});
