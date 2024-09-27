/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'

// https://vitejs.dev/config/
export default () =>
  defineConfig({
    plugins: [
      TanStackRouterVite(),
      react()
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      }
    },
    build: {
      assetsInlineLimit: 0,
      rollupOptions: {
        output: {
          entryFileNames: `[name].js`,
          chunkFileNames: `[name].js`,
          assetFileNames: `[name].[ext]`
        }
      }
    },
    server: {
      host: "localhost",
      port: 4000,
      strictPort: true,
      proxy: {
        '/hello': 'http://localhost:4001',
        '/addUrl': 'http://localhost:4001',
        '/allUrlStats': 'http://localhost:4001',
        '/stats': 'http://localhost:4001'

      }
    },
    test: {
      globals: true,
      environment: "jsdom",
      setupFiles: "./test/setup.ts",
      css: false,
      environmentOptions: {
        jsdom: {
          resources: "usable"
        }
      }
    }
  });
