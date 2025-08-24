import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
  },
  server: {
    // Ensure correct MIME types for .js and .min.js files
    mimeTypes: {
      'application/javascript': ['js', 'min.js'],
    },
    // Allow access to files in node_modules and public directories
    fs: {
      allow: ['.'],
    },
  },
  // Exclude pdfjs-dist from dependency optimization to prevent module processing
  optimizeDeps: {
    exclude: ['pdfjs-dist'],
  },
});