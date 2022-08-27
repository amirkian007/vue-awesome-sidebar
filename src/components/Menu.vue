<template>
  <div
    class="menu"
    ref="sidebarmen"
    :class="sidebarClass"
    :style="{ width: sidebarMenuWidth }"
    @scroll="onMenuScroll"
    @mouseenter="()=>{updateMenuHover(true)}"
    @mouseleave="()=>{updateMenuHover(false)}"
  >
    <!-- <div class="menu" :class="{ 'small-menu': smallMenu }" > -->
    <slot name="header" />
    <div v-if="!$slots.header">deafult slot</div>
    <MenuItem
      v-for="(item, index) in menu"
      :key="index"
      :data="item.children"
      :name="item.name"
      :icon="item.icon"
      :href="item.href"
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
import { initAwsomeSideBar } from '../hooks/useAwseomeSideBar'
import { useClickOutSide } from '../hooks/useClickOutSide'
import { initAwsomeRouter } from '../hooks/useAwsomeRouter'
import { ref, computed, watch } from 'vue'

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
    miniCollapsed: {
      type: Boolean,
      default: true
    },
    animationDuration: {
      type: Number,
      default: 290
    },
    //autoCollapse: {
    //   type: String||Boolean,
    //   default: true
    // },
    width: {
      type: String,
      default: '290px'
    },
    widthMiniCollapsed: {
      type: String,
      default: '65px'
    },
    collapseBreakPoint: {
      type: String,
      default: '65px'
    },
    theme: {
      type: String,
      default: 'white'
    },
    closeOnClickOutSide: {
      type: Boolean,
      default: false
    },
    rtl: {
      type: Boolean,
      default: false
    },
    overLayer: {
      type: Boolean,
      default: false
    },
    overLayerColor: {
      type: Boolean,
      default: false
    },
    position:{
      type:String,
      default: 'fixed'
    }
  },
  emits: {
    'item-click'(event, item) {
      return !!(event && item)
    },
    'update:collapsed'(collapsed) {
      //return collapsed
      return !!(typeof collapsed === 'boolean')
    },
    'update:miniCollapsed'(collapsed) {
      //return collapsed
      return !!(typeof collapsed === 'boolean')
    }
  },
  data: () => ({
    smallMenu: false
  }),

  components: {
    MenuItem
  },
  mounted() {
    // USAGE
  },
  watch: {
    $route(to) {
      this.updateCurrentRoute(window.location)
      //console.log("routeChnage",to)
    }
  },
  methods: {
    onMenuScroll() {
      this.updateMenuScroll()
      //console.log("scrolled")
    }
  },
  setup(props, context) {
    const {
      getIsCollapsed: isCollapsed,
      getIsMiniCollapsed: miniCollapsed,
      updateIsCollapsed,
      getSlotByName,
      updateMenuScroll,
      updateMenuHover
      // unsetMobileItem,
      // updateCurrentRoute
    } = initAwsomeSideBar(props, context)
    console.log(miniCollapsed)
    const { updateCurrentRoute } = initAwsomeRouter(props, context)

    const sidebarmen = ref(null)
    const { removeSideBarListner, addSideBarListner } = useClickOutSide(
      sidebarmen,
      () => {
        context.emit('update:collapsed', !isCollapsed.value)
      },
      isCollapsed
    )

    const sidebarMenuWidth = computed(() => {
      return miniCollapsed.value ? props.widthMiniCollapsed : props.width
    })

    watch(
      () => props.collapsed,
      (currentCollapsed) => {
        // updateIsCollapsed(currentCollapsed)
        if (currentCollapsed) {
          removeSideBarListner()
        } else {
          addSideBarListner()
        }
      }
    )

    const sidebarClass = computed(() => {
      return [
        props.theme === 'white' || props.theme === 'dark'
          ? `${props.theme}-theme`
          : 'white-theme',
        isCollapsed.value ? 'compelete-coolapse-menu' : '',
        miniCollapsed.value && !isCollapsed?.value ? 'mini-coolapse-menu' : ''
      ]
    })

    return {
      sidebarMenuWidth,
      updateMenuScroll,
      sidebarClass,
      sidebarmen,
      updateCurrentRoute,
      updateMenuHover
    }
  }
}
</script>

<style lang="scss">
@import '../scss/vue-awesome-sidebar.scss';
</style>
