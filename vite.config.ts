import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_BACKEND_URL),
    },
    plugins: [react()],
    build: {
      outDir: 'dist',
    },
  }
})

// type ViteMode = 'dev' | 'prod' | string;

// export default ({ mode }: { mode: ViteMode }) => {
//   return defineConfig({
//     plugins: [react()],
//     server: {
//       proxy: {
//         '/api': {
//           target: JSON.stringify(loadEnv(mode, process.cwd()).VITE_APP_BACKEND_URL),
//           changeOrigin: true,
//         },
//       },
//     },
//   });
// };
