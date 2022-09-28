<template>
  <aside
    class="vas-menu"
    ref="sidebarmen"
    :class="sidebarClass"
    :style="{
      width: sidebarMenuWidth,
      position: position,
      [menuDirection]: isCollapsed
        ? `calc(-1*(${sidebarMenuWidth} + 2px))`
        : '0px',
      transition: `${transition} 0.3s ease-in-out`,
      direction: direction
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
        v-if="!item?.header && !item?.line"
        :item="item"
        :depth="0"
        :smallMenu="smallMenu"
        :siblingsHaveIconProp="siblingsHaveIcon"
      />
      <HeaderItem v-else-if="item?.header && !miniCollapsed" :data="item" />
      <hr v-else-if="item?.line" />
    </template>

    <!-- <div class="footer-slot">footer</div> -->
    <slot name="footer" />
    <!-- <i @click="smallMenu = !smallMenu" class="material-icons">
      <v-icon color="green darken-2"> mdi-menu-open </v-icon></i
    > -->
  </aside>
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
    removeIconSpace: {
      type: Boolean,
      default: false
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
    'item-click'(item) {
      return !!item
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
    transition: 'left',
    siblingsHaveIcon: false
  }),

  components: {
    MenuItem,
    HeaderItem
  },
  mounted() {
    this.checkSiblingsForIcon()
    // USAGE
  },
  watch: {
    async $route() {
      this.updateCurrentRoute(window.location)
    },
    isCollapsed() {
      if (this.miniCollapsed && this.isCollapsed) {
        setTimeout(() => {
          this.transition = 'none'
        }, 300)
      } else {
        this.transition = this.menuDirection
      }
    },
    miniCollapsed() {
      if (this.miniCollapsed) {
        this.updateMenuHover(true)
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
  },
  methods: {
    onMenuScroll() {
      this.updateMenuScroll()
    },
    onEnter() {
      this.updateMenuHover(true)
    },
    onLeave() {
      this.updateMenuHover(false)
    },
    checkSiblingsForIcon() {
      if (!this.removeIconSpace && this.menuType == 'fully') return
      for (var i = 0; i < this.menu.length; i++) {
        if (this.menu[i]?.icon) {
          this.siblingsHaveIcon = true
          break
        }
      }
    }
  },
  setup(props, context) {
    const {
      getIsCollapsed: isCollapsed,
      getIsMiniCollapsed: miniCollapsed,
      updateMenuScroll,
      updateMenuHover,
      menuDirection
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
