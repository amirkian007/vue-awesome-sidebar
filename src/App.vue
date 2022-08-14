<script setup lang="ts">
import { ref } from 'vue'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Menu from './components/Menu.vue'

const testmENU: any = [
  {
    name: 'Getting Started',
    icon: { text: 'home' },
    children: [
      {
        name: 'level 1.1',
        icon: { text: 'home' },
        children: [
          {
            name: 'level 1.1.1',
            children: [
              {
                name: 'level 1.1.1.1',
                children: [
                  {
                    name: 'level 1.1.1.1'
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        name: 'level 1.2'
      }
    ]
  },
  {
    name: 'Dashboard',
    icon: { text: 'dashboard' },
    children: [
      {
        name: 'level 2.1'
      },
      {
        name: 'level 2.2'
      },
      {
        name: 'level 2.3'
      }
    ]
  },
  {
    name: 'Settings',
    icon: { text: 'settings' }
  },
  {
    name: 'Settings',
    icon: { text: 'settings' }
  },
  {
    name: 'Settings',
    icon: { text: 'settings' }
  },
  {
    name: 'Settings',
    icon: { text: 'settings' }
  },
  {
    name: 'Settings',
    icon: { text: 'settings' }
  },
  {
    name: 'Settings',
    icon: { text: 'settings' }
  },
  {
    name: 'Settings',
    icon: { text: 'settings' }
  },
  {
    name: 'Settings',
    icon: { text: 'settings' }
  },
  {
    name: 'Settings',
    icon: { text: 'settings' }
  },
  {
    name: 'Settings',
    icon: { text: 'settings' }
  },
  {
    name: 'Settings',
    icon: { text: 'settings' }
  },
  {
    name: 'Settings',
    icon: { text: 'settings' }
  },
  {
    name: 'Settings',
    icon: { text: 'settings' }
  },
  {
    name: 'Settings',
    icon: { text: 'settings' }
  },
  {
    name: 'Settings',
    icon: { text: 'settings' }
  }
]

const collapsed = ref(false)

const update = () => {
  collapsed.value = !collapsed.value
}
</script>

<template>
  <!-- <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div> -->
  <div class="hello" @click="update">close</div>
  <Menu :menu="testmENU" :collapsed="collapsed">
    <template #header>
      <p>Here's some contact info</p>
    </template>
  </Menu>
</template>

<style lang="scss" scoped>
.hello {
  position: absolute;
  left: 50%;
}
</style>
