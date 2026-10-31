import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const isE2E = env.VITE_E2E === 'true';
  const e2eApiProxyTarget = env.E2E_API_PROXY_TARGET ?? 'http://api-e2e:3333';

  return {
    plugins: [react()],
    server: isE2E
      ? {
          proxy: {
            '^/(admin|announcements|auth|me|members|reports|tchat-discussions)(/.*)?$':
              {
                changeOrigin: true,
                secure: false,
                target: e2eApiProxyTarget,
              },
          },
        }
      : undefined,
  };
});
