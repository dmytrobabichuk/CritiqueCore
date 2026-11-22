import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';
export default defineConfig(({ mode }) => ({
  plugins: [react()],
  server: {
    port: 5177,
    strictPort: true,
    proxy: {
      '/api': {
        target:
          process.env.API_PROXY_TARGET ||
          loadEnv(mode, process.cwd(), 'API_').API_PROXY_TARGET ||
          'http://127.0.0.1:3007',
        changeOrigin: true,
      },
    },
  },
}));
