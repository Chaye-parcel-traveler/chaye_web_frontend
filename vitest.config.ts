import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      include: ['src/**/*.{ts,tsx}'],
      provider: 'v8',
      reporter: ['text', 'html'],
    },
    environment: 'jsdom',
    environmentOptions: {
      jsdom: {
        url: 'http://localhost:5173/',
      },
    },
    exclude: ['e2e/**', 'node_modules/**', 'dist/**'],
    globals: false,
    setupFiles: ['src/test/setup.ts'],
  },
});
