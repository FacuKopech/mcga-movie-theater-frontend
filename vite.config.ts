import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';

type ViteMode = 'dev' | 'prod' | string;

export default ({ mode }: { mode: ViteMode }) => {
  loadEnv(mode, process.cwd(), '');
  
  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: 'https://movie-theater-backend-ten.vercel.app',
          changeOrigin: true,
        },
      },
    },
  });
};
