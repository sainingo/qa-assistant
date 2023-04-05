import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    proxy: {
      "/openmrs": {
        target: "http://localhost:8089/",
        changeOrigin: true,
        secure: false,
      },
    },
  },
  plugins: [react()],
  // test: {
  //   globals:true,
  //   environment: 'jsdom',
  //   setupFiles: './tests/setup.ts',
  // },
});
