import { defineConfig } from 'vite';
import tailwind from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwind()],
  build: {
    outDir: '../../webroot',
    emptyOutDir: false,
    sourcemap: true,
    chunkSizeWarningLimit: 1500,
  },
});