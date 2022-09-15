<template>
  <div
    class="menu"
    ref="sidebarmen"
    :class="sidebarClass"
    :style="{
      width: sidebarMenuWidth,
      position: position,
      [menuDirection]: isCollapsed ? `calc(-1*(${sidebarMenuWidth} + 2px))` : '0px',
      transition: `${transition} 0.3s ease-in-out`,
      direction : direction
    }"
    @[menuScrollEvent]="onMenuScroll"
    @[mouseEnterEvent]="onEnter"
    @[mouseLeaveEvent]="onLeave"
  >
    <!-- <div class="menu" :class="{ 'small-menu': smallMenu }" > -->
    <slot name="header" />
    <!-- <div v-if="!$slots.header">deafult slot</div> -->
    <template v-for="(item, index) in menu" :key="index">
      <MenuItem
        v-if="!item?.header"
        :data="item.children"
        :name="item.name"
        :icon="item.icon"
        :href="item.href"
        :header="item.header"
        :depth="0"
        :smallMenu="smallMenu"
        :close="true"
        :siblingsHaveIcon="true"
      />
      <HeaderItem v-else-if="item?.header && !miniCollapsed" :data="item" />
    </template>

    <div class="footer-slot">footer</div>
    <!-- <i @click="smallMenu = !smallMenu" class="material-icons">
      <v-icon color="green darken-2"> mdi-menu-open </v-icon></i
    > -->
  </div>
  <Transition>
    <div
      v-if="overLayer"
      class="vas-over-layer"
      :style="{ backgroundColor: overLayerColor }"
    ></div>
  </Transition>
</template>

<script>
import HeaderItem from './HeaderItem.vue'
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
      default: 'simple-icon'
    },
    collapsed: {
      type: Boolean,
      default: false
    },
    miniCollapsed: {
      type: Boolean,
      default: false
    },
    animationDuration: {
      type: Number,
      default: 290
    },
    direction: {
      type: String,
      default: 'ltr'
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
    closeOnClickOutSide: {
      type: Boolean,
      default: false
    },
    overLayerOnOpen: {
      type: Boolean,
      default: false
    },
    overLayerColor: {
      type: String,
      default: 'rgba(0,0,0,.6)'
    },
    openAnimation: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'fixed'
    },
    collapseBreakPoint: {
      type: String,
      default: '65px'
    },
    dark: {
      type: Boolean
    },
    rtl: {
      type: Boolean,
      default: false
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
    smallMenu: false,
    transition: 'left'
  }),

  components: {
    MenuItem,
    HeaderItem
  },
  mounted() {
    // USAGE
  },
  watch: {
    $route(to) {
      this.updateCurrentRoute(window.location)
      //console.log("routeChnage",to)
    },
    isCollapsed() {
      if (this.miniCollapsed && this.isCollapsed) {
        setTimeout(() => {
          this.transition = 'none'
        }, 300)
      } else {
        this.transition = this.menuDirection
      }
    }
  },
  computed: {
    menuScrollEvent() {
      return this.miniCollapsed ? 'scroll' : null
    },
    mouseEnterEvent() {
      return this.miniCollapsed ? 'mouseenter' : null
    },
    mouseLeaveEvent() {
      return this.miniCollapsed ? 'mouseleave' : null
    }
    // menuDirection(){
    //   return this.direction ==='rtl' ? 'right':'left'
    // }
  },
  methods: {
    onMenuScroll() {
      this.updateMenuScroll()
      //console.log("scrolled")
    },
    onEnter() {
      this.updateMenuHover(true)
    },
    onLeave() {
      this.updateMenuHover(false)
    },
    getWidth(w) {}
  },
  setup(props, context) {
    const {
      getIsCollapsed: isCollapsed,
      getIsMiniCollapsed: miniCollapsed,
      updateIsCollapsed,
      getSlotByName,
      updateMenuScroll,
      updateMenuHover,
      menuDirection
      // unsetMobileItem,
      // updateCurrentRoute
    } = initAwsomeSideBar(props, context)
    const { updateCurrentRoute } = initAwsomeRouter(props, context)

    const sidebarmen = ref(null)
    const overLayer = ref(false)
    if (props.closeOnClickOutSide) {
      if (props.overLayerOnOpen) {
        overLayer.value = !props.collapsed
      }
      const { removeSideBarListner, addSideBarListner } = useClickOutSide(
        sidebarmen,
        () => {
          context.emit('update:collapsed', !isCollapsed.value)
        },
        isCollapsed
      )
      watch(
        () => props.collapsed,
        (currentCollapsed) => {
          // updateIsCollapsed(currentCollapsed)
          if (props.overLayerOnOpen) {
            overLayer.value = !currentCollapsed
          }
          if (currentCollapsed) {
            removeSideBarListner()
          } else {
            addSideBarListner()
          }
        }
      )
    }

    const sidebarMenuWidth = computed(() => {
      return miniCollapsed.value ? props.widthMiniCollapsed : props.width
    })

    const sidebarClass = computed(() => {
      const theme = props.dark ? 'dark' : 'white'
      return [
        `${theme}-theme`,
        props.direction,
        //isCollapsed.value ? 'compelete-coolapse-menu' : '',
        miniCollapsed.value ? 'mini-coolapse-menu' : ''
      ]
    })

    return {
      sidebarMenuWidth,
      updateMenuScroll,
      sidebarClass,
      sidebarmen,
      updateCurrentRoute,
      updateMenuHover,
      overLayer,
      isCollapsed,
      menuDirection
    }
  }
}
</script>

<style lang="scss">
@use '../scss/vue-awesome-sidebar.scss';
.v-enter-active,
.v-leave-active {
  transition: opacity 300ms ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
