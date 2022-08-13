<template>
  <div class="menu" :class="{ 'small-menu': sidebarMenuWidth }" >
  <!-- <div class="menu" :class="{ 'small-menu': smallMenu }" > -->
   <slot name="header"/>
    <MenuItem
      v-for="(item, index) in menu"
      :key="index"
      :data="item.children"
      :name="item.name"
      :icon="item.icon"
      :depth="0"
      :smallMenu="smallMenu"
      :close="true"
    />

   <div class="footer-slot">footer</div>
    <!-- <i @click="smallMenu = !smallMenu" class="material-icons">
      <v-icon color="green darken-2"> mdi-menu-open </v-icon></i
    > -->
  </div>
</template>

<script>
import MenuItem from './MenuItem.vue'
export default {
  name: 'recursive-menu',
   props: {
    menu: {
      type: Array,
      required: true
    },
    menuType: {
      type: String,
      default: 'simple'
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    //autoCollapse: {
    //   type: String||Boolean,
    //   default: true
    // },
    width: {
      type: String,
      default: '290px'
    },
    widthCollapsed: {
      type: String,
      default: '65px'
    },
    collapseBreakPoint:{
      type: String,
      default: '65px'
    },
    theme: {
      type: String,
      default: 'white'
    },
    rtl: {
      type: Boolean,
      default: false
    },
    
  },
  emits: {
    'item-click' (event, item) {
      return !!(event && item)
    },
    'update:collapsed' (collapsed) {
      return !!(typeof collapsed === 'boolean')
    }
  },
  data: () => ({
    smallMenu: false,
  }),
  created(){
    //console.log(MenuItem.render())
  },
  components: {
    MenuItem
  },
  setup (props, context) {
      const sidebarMenuWidth = computed(() => {
      return isCollapsed.value ? props.widthCollapsed : '0px'
    })
  }
}
</script>

<style lang="scss">
@import '../scss/vue-awesome-sidebar.scss'
</style>