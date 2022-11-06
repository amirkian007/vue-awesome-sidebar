// This is where the package installs.
import type { App } from 'vue'
import VueAwesomeSideBar from './components/Menu.vue'

export default {
  install: (app: App) => {
    app.component('VueAwesomeSideBar', VueAwesomeSideBar)
  }
}

export { VueAwesomeSideBar }
