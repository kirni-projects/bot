// vite.config.widget.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';

export default defineConfig({
  plugins: [react(), cssInjectedByJsPlugin()],
  build: {
    outDir: 'dist-widget',
    lib: {
      entry: path.resolve(__dirname, 'src/widget.js'),
      name: 'Widget',
      formats: ['iife'],
      fileName: 'widget',
    },
    rollupOptions: {
      output: {
        entryFileNames: 'widget.js',
        assetFileNames: 'assets/[name].[ext]',
      },
    },
  },
});
