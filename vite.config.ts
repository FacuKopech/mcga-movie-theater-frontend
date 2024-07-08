import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

type ViteMode = 'dev' | 'prod' | string;

export default ({ mode }: { mode: ViteMode }) => {
  
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};  
  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: process.env.VITE_BACK_END_URL,
          changeOrigin: true,
        },
      },
    },
  });
};
