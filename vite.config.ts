import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]
  // build: {
  //   // cssCodeSplit: false,
  //   // lib: {
  //   //   entry: "./src/VueAwesomeSiderbar.ts",
  //   //   formats: ["es", "cjs"],
  //   //   name: "VueAwesomeSiderbar",
  //   //   fileName: (format) => (format === "es" ? "index.js" : "index.cjs"),
  //   // },
  //   // rollupOptions: {
  //   //   external: ["vue"],
  //   //   output: {
  //   //     globals: {
  //   //       vue: "Vue",
  //   //     },
  //   //   },
  //   // },
  // },
})
