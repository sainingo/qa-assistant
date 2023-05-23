/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  server: {
    proxy: {
      '/ws': {
        target: 'https://staging.ampath.or.ke/amrs',
        changeOrigin: true,
        secure: false,
      },
      '/api': {
        target: 'http://0.0.0.0:5081',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
  },
});
