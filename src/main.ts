import { createApp } from 'vue'
import App from './App.vue'
import 'material-icons/iconfont/material-icons.css'
import { createRouter, createWebHistory } from 'vue-router'

import MenuItemIcon from './components/MenuItemIcon.vue'
const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }
const test = { template: '<div>test</div>' }
const test2 = { template: '<div>test2</div>' }
const test3 = { template: '<div>test3</div>' }
const test4 = { template: '<div>test4</div>' }
// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  { path: '/', component: Home },
  { path: '/a', component: About },
  { path: '/a/b', component: test },
  { path: '/a/b/c', component: test2 },
  { path: '/a/b/c/d', component: test3 },
  { path: '/k', component: test4 }
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
