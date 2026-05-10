import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import tailwind from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";

const tanstackStartInternalIds = new Set([
  "#tanstack-router-entry",
  "#tanstack-start-entry",
  "#tanstack-start-plugin-adapters",
  "tanstack-start-manifest:v",
  "tanstack-start-injected-head-scripts:v",
]);

const externalizeTanstackStartInternals = {
  name: "externalize-tanstack-start-internals",
  setup(build: any) {
    build.onResolve({ filter: /.*/ }, (args: { path: string }) => {
      if (tanstackStartInternalIds.has(args.path)) {
        return { path: args.path, external: true };
      }
      return null;
    });
  },
};

export default defineConfig({
  plugins: [tanstackStart(), cloudflare(), tailwind(), tsconfigPaths(), react()],
  environments: {
    tanstack_start_app: {
      optimizeDeps: {
        include: [],
        exclude: ["@tanstack/start-server-core"],
        noDiscovery: true,
        esbuildOptions: {
          plugins: [externalizeTanstackStartInternals],
        },
      },
    },
  },
});
