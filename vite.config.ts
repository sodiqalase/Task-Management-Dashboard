/// <reference types="vitest" />
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vite.dev/config/
export default defineConfig({
    plugins: [vue()],
    test: {
        globals: true,
        environment: "jsdom", // Simulates a browser environment
        setupFiles: "./vitest.setup.ts", // Optional: Set up global mocks/stubs
        include: ["**/*.test.ts"], // Include test files
    },
});
