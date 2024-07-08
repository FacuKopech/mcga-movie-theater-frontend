import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

type ViteMode = 'dev' | 'prod' | string;

export default ({ mode }: { mode: ViteMode }) => {
  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: JSON.stringify(loadEnv(mode, process.cwd()).VITE_BACK_END_URL),
          changeOrigin: true,
        },
      },
    },
  });
};
