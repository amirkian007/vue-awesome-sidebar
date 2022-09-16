import { createApp } from 'vue'
import App from './App.vue'
import 'material-icons/iconfont/material-icons.css'
import { createRouter, createWebHistory } from 'vue-router'

import MenuItemIcon from './components/MenuItemIcon.vue'
import ComA from './ComA.vue'
import CompB from './CompB.vue'
import ComC from './ComC.vue'

// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: ComA },
  { path: '/a', component: CompB },
  { path: '/a/b', component: ComC },
  { path: '/a/b/c', component: ComA },
  { path: '/a/b/c/d', component: CompB },
  { path: '/k', component: ComC }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  strict: true,
  history: createWebHistory(''),
  routes // short for `routes: routes`
})

console.log(App)
console.log(App.setup)
createApp(App).use(router).mount('#app')
