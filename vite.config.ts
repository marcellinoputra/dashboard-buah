import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  // depending on your application, base can also be "/"
  base: '/',
  plugins: [react(), viteTsconfigPaths()]
  //   test: {
  //     globals: true,
  //     environment: 'jsdom',
  //     setupFiles: './src/setupTests.ts',
  //     css: true,
  //     reporters: ['verbose'],
  //     coverage: {
  //       reporter: ['text', 'json', 'html'],
  //       include: ['src/**/*'],
  //       exclude: []
  //     }
  //   }
});
