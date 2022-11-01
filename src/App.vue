<script setup lang="ts">
import { ref } from 'vue'
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import Menu from './components/Menu.vue'

const testmENU: any = [
  {
    name: 'Getting Started',
    href: '/a',
    icon: { class: 'material-icons-outlined', text: 'home' },
    children: [
      {
        name: 'level 1.1',
        icon: { class: 'material-icons-outlined', text: 'home' },
        children: [
          {
            name: 'level 1.1.1',

            children: [
              {
                name: 'level 1.1.1.1',
                children: [
                  {
                    icon: { class: 'material-icons-outlined', text: 'home' },
                    href: '/a/b/c/d',
                    name: 'level 1.1.1.1'
                  }
                ]
              }
            ]
          },
          {
            href: '/a/b',
            name: 'level 1.2'
          }
        ]
      },
      {
        name: 'level 1.2'
      }
    ],
    class: 'titab'
    //  miniActiveClass:"ahh"
  },
  {
    name: 'Dashboard',
    href: '/b',

    icon: { class: 'material-icons-outlined', text: 'dashboard' },
    children: [
      {
        href: { path: '/styles', hash: '#sass-varibles' },
        name: 'level 2.1'
      },
      {
        href: { path: '/styles', hash: '#csss-varibles' },
        name: 'level 2.2'
      },
      {
        href: { path: '/styles', hash: '#www-varibles' },
        name: 'level 2.3'
      }
    ]
  },
  {
    href: '/c',

    name: 'Settings',
    icon: { text: 'settings', class: 'material-icons-outlined' }
  },
  {
    header: 'Getting Started'
  },
  {
    href: '/f',
    name: 'Settings',
    icon: { text: 'settings', class: 'material-icons-outlined' }
  },
  {
    LineShow: true,
    class: 'titab'
  },
  {
    name: 'Settings',
    icon: { text: 'settings', class: 'material-icons-outlined' }
  },

  {
    name: 'Settings',
    icon: { text: 'settings', class: 'material-icons-outlined' }
  },
  {
    name: 'Settings',
    icon: { text: 'settings', class: 'material-icons-outlined' },
    children: [
      {
        name: 'level 2.1'
      },
      {
        name: 'level 2.2'
      },
      {
        name: 'level 2.3',
        children: [
          {
            name: 'level 2.1'
          },
          {
            name: 'level 2.2'
          },
          {
            name: 'level 2.3',
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
          }
        ]
      }
    ]
  },
  {
    name: 'Settings',
    icon: { text: 'settings', class: 'material-icons-outlined' },
    children: [
      {
        name: 'level 2.1'
      },
      {
        name: 'level 2.2'
      },
      {
        name: 'level 2.2'
      }
    ]
  },
  {
    name: 'Settings',
    icon: { text: 'settings', class: 'material-icons-outlined' }
  },
  {
    name: 'Settings',
    icon: { text: 'settings', class: 'material-icons-outlined' }
  },

  {
    name: 'Settings',
    icon: { text: 'home', class: 'material-icons-outlined' },
    children: [
      {
        name: 'level 2.1',
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
        name: 'level 2.2'
      },
      {
        name: 'level 2.3'
      }
    ]
  }
]

const collapsed = ref(false)
const miniMenu = ref(false)

const update = () => {
  collapsed.value = !collapsed.value
}
const hanc = (ww: any) => {
  console.log(ww)
}

const updateminiMenu = () => {
  miniMenu.value = !miniMenu.value
}
const type = ref('simple')

const updateType = () => {
  type.value = 'fully'
}
</script>

<template>
  <div class="hello" @click="update">close</div>
  <div class="hello2" @click="updateminiMenu">updateminiMenu</div>
  <Menu
    :menu="testmENU"
    v-model:miniMenu="miniMenu"
    v-model:collapsed="collapsed"
    @item-click="hanc"
    vueRouterEnabel
    dark
    :autoCollapse="600"
    menuType="fully"
  >
  </Menu>
  {{ miniMenu }}
  <router-view></router-view>
</template>

<style lang="scss">
.hello {
  position: absolute;
  left: 50%;
}
.hello2 {
  position: absolute;
  left: 60%;
}
* {
  font-family: 'Inter';
}
body {
  //background-color: #242526;
  margin: 0;
}
</style>
