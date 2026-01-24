import { defineConfig } from "vite";
import { resolve } from "path";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(), svgr({ svgrOptions: { icon: true } })],
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@/app": resolve(__dirname, "./src/app"),
    },
  },
});
