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
      entry: './src/VueAwesomeSidebar.ts',
      formats: ['es', 'cjs'],
      name: 'VueAwesomeSidebar',
      fileName: 'vue-awesome-sidebar'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name == 'style.css') return 'vue-awesome-sidebar.css'
          return assetInfo.name
        }
      }
    }
  }
})
