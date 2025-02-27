import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const mockCryptoPlugin = () => {
  return {
    name: 'mock-crypto',
    enforce: 'pre',
    transform(code, id) {
      if (id.includes('node_modules') && code.includes('crypto.getRandomValues')) {
        console.log(`Found crypto.getRandomValues in ${id}`);
        return code.replace(/crypto\.getRandomValues/g, '(() => { throw new Error("crypto.getRandomValues is not supported"); })');
      }
      return code;
    }
  };
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});