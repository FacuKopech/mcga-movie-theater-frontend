import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

type ViteMode = 'dev' | 'prod' | string;

export default ({ mode }: { mode: ViteMode }) => {
  return defineConfig({
    plugins: [react()],
    define:{
      'process.env.VITE_APP_BACKEND_URL': JSON.stringify(process.env.VITE_APP_BACKEND_URL)
    },
    server: {
      proxy: {
        '/api': {
          target: JSON.stringify(process.env.VITE_APP_BACKEND_URL),
          changeOrigin: true,
        },
      },
    },
  });
};
