import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { terser } from 'rollup-plugin-terser'
import typescript2 from 'rollup-plugin-typescript2'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {},
  build: {
    lib: {
      entry: './src/VueAwesomeSiderbar.ts',
      formats: ['es', 'cjs'],
      name: 'VueAwesomeSiderbar',
      fileName: (format) =>
        `vue-awesome-siderbar.${format === 'es' ? 'js' : 'cjs'}`
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
