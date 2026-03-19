/// <reference types="vitest" />

import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), legacy()],
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) {
            return undefined;
          }

          if (id.includes('@ionic/core')) {
            return 'vendor-ionic-core';
          }

          if (id.includes('@ionic/vue-router')) {
            return 'vendor-ionic-vue-router';
          }

          if (id.includes('@ionic/vue')) {
            return 'vendor-ionic-vue';
          }

          if (id.includes('ionicons')) {
            return 'vendor-ionicons';
          }

          if (id.includes('vue-i18n')) {
            return 'vendor-vue-i18n';
          }

          if (id.includes('pinia')) {
            return 'vendor-pinia';
          }

          if (id.includes('vue-router')) {
            return 'vendor-vue-router';
          }

          if (id.includes('/vue/')) {
            return 'vendor-vue';
          }

          return undefined;
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        url: 'http://localhost/',
      },
    },
    setupFiles: ['tests/setup.ts'],
    include: ['tests/unit/**/*.spec.ts', 'tests/render/**/*.spec.ts'],
    exclude: ['tests/e2e/**', 'tests/e2e-playwright/**', 'dist/**'],
  },
});
