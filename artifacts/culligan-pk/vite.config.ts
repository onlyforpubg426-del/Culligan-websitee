import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

const isReplit = Boolean(process.env.REPL_ID);
const isVercel = Boolean(process.env.VERCEL);

// On Replit dev/prod, PORT and BASE_PATH are always injected by the workflow.
// On Vercel (or any standalone build), fall back to safe defaults.
const rawPort = process.env.PORT;
const port = rawPort ? Number(rawPort) : 3000;
const basePath = process.env.BASE_PATH ?? "/";

async function loadReplitPlugins() {
  if (process.env.NODE_ENV !== "production" && isReplit) {
    const runtimeErrorModal = await import("@replit/vite-plugin-runtime-error-modal");
    const cartographer = await import("@replit/vite-plugin-cartographer");
    
    return [
      runtimeErrorModal.default(),
      cartographer.cartographer({
        root: path.resolve(import.meta.dirname, ".."),
      }),
    ];
  }
  return [];
}

export default defineConfig(async () => {
  const replitPlugins = await loadReplitPlugins();
  
  return {
    base: basePath,
    plugins: [react(), tailwindcss(), ...replitPlugins],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "src"),
      },
      dedupe: ["react", "react-dom"],
    },
    root: path.resolve(import.meta.dirname),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist/public"),
      emptyOutDir: true,
    },
    server: {
      port,
      strictPort: true,
      host: "0.0.0.0",
      allowedHosts: true,
      fs: { strict: true },
      proxy: {
        "/api": {
          target: "http://localhost:8080",
          changeOrigin: true,
        },
      },
    },
    preview: {
      port,
      host: "0.0.0.0",
      allowedHosts: true,
    },
  };
});
