import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { Server } from "https";

export default defineConfig({
  server:{
    proxy:{
      '/openmrs': "https://dev3.openmrs.org/"
    },
  },
  plugins: [react()],
  test: {
    globals:true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
  },
  // setupFiles: './tests/setup.ts'
});
