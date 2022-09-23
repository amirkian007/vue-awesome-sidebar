import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { terser } from 'rollup-plugin-terser'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {},
  build: {
    lib: {
      entry: './src/VueAwesomeSiderbar.ts',
      formats: ['es', 'cjs'],
      name: 'VueAwesomeSiderbar',
      fileName: (format) => (format === 'es' ? 'index.js' : 'index.cjs')
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      },
      plugins: [terser()]
    }
  }
})
