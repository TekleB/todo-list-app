import { defineConfig as defineViteConfig, mergeConfig } from 'vite';
import { defineConfig as defineVitestConfig } from 'vitest/config';
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import tsconfigPaths from "vite-tsconfig-paths";
import path from "node:path";

const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: "jsdom",
    clearMocks: true,
    include: [
      "tests/unit/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}",
      "src/**/*.spec.tsx",
    ],
    setupFiles: ["./src/testSetup.ts"],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "html", "json"],
      include: ["!src/main.tsx", "src/**/*.{ts,tsx}"],
    },
  },
});

const viteConfig = defineViteConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    checker({
      vueTsc: {
        tsconfigPath: "./tsconfig.app.json",
      },
    }),
  ],
  resolve: {
    alias: [
      {
        find: "@/",
        replacement: `${path.resolve(__dirname, "./src")}/`,
      },
    ],
  },
  server: {
    port: 5000,
  },
});

export default mergeConfig(viteConfig, vitestConfig);

