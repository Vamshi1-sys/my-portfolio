import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwind from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tanstackStart(), cloudflare(), tailwind(), tsconfigPaths(), react()],
  optimizeDeps: {
    noDiscovery: true,
  },
});
