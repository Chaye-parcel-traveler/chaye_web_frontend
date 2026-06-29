import { defineConfig } from 'vitest/config';
import { transformWithOxc } from 'vite';
import react from '@vitejs/plugin-react';

const treatSourceJavaScriptAsJsx = () => ({
  name: 'treat-source-javascript-as-jsx',
  enforce: 'pre' as const,
  async transform(code: string, id: string) {
    const filePath = id.split('?')[0];

    if (!filePath.includes('/src/') || !filePath.endsWith('.js')) {
      return null;
    }

    return transformWithOxc(code, filePath, {
      lang: 'jsx',
      jsx: {
        runtime: 'automatic',
      },
      sourcemap: true,
    });
  },
});

export default defineConfig({
  plugins: [treatSourceJavaScriptAsJsx(), react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
  },
  optimizeDeps: {
    rolldownOptions: {
      moduleTypes: {
        '.js': 'jsx',
      },
    },
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
});
