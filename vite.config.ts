import { defineConfig } from 'vite';

export default defineConfig(() => {
  return {
    define: {
      __APP_ENV__: JSON.stringify(process.env.VITE_APP_BACKEND_URL),
    },
  };
});

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
