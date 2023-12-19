import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import Icons from 'unplugin-icons/vite';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';

export default defineConfig({
  base: process.env.NODE_ENV === 'development' ? './' : '/',
  build: {
    outDir: '../../dist/euler',
  },
  resolve: {
    alias: {
      '@/': `${path.resolve(__dirname, './src')}/`,
    },
  },
  plugins: [
    vue(),
    Icons({
      compiler: 'vue3',
      customCollections: {
        app: FileSystemIconLoader('../shared/svg-icons'),
      },
    }),
  ],
  server: {
    proxy: {
      '/query': {
        target: 'https://dsapi.osinfra.cn/',
        changeOrigin: true,
      },
    },
  },
});
