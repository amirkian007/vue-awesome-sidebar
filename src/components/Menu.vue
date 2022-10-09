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
      direction: rtl ? 'rtl' : 'ltr'
    }"
    @[menuScrollEvent]="onMenuScroll"
    @[mouseEnterEvent]="onEnter"
    @[mouseLeaveEvent]="onLeave"
  >
    <div
      class="menu-wraper"
      :style="{
        width: sidebarMenuWidth
      }"
    >
      <slot name="header" />

      <template v-for="(item, index) in menu" :key="index">
        <MenuItem
          v-if="!item?.header && !item?.line"
          :item="item"
          :depth="0"
          :smallMenu="smallMenu"
          :siblingsHaveIconProp="siblingsHaveIcon"
        />
        <HeaderItem v-else-if="item?.header && !miniMenu" :data="item" />
        <hr v-else-if="item?.line" />
      </template>

      <slot name="footer" />
      
      <div v-if="BottomMiniMenuBtn" class="bottomBtn" @click="toggleMiniCollapse">
        <div v-if="!$slots?.BottomMiniMenuBtn" class="icons bottomBtnIcon" :class="{ ssdSpin: !miniMenu }"></div>
        <slot v-else name="BottomMiniMenuBtn" :miniMenu="miniMenu" />
      </div>
    </div>
  </aside>
  <Transition>
    <div v-if="overLayer" class="vas-over-layer"></div>
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
    miniMenu: {
      type: Boolean,
      default: false
    },
    animationDuration: {
      type: Number,
      default: 290
    },
    vueRouterEnabel: {
      type: Boolean,
      default: false
    },
    width: {
      type: String,
      default: '290px'
    },
    widthMiniMenu: {
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
    },
    keepChildrenOpen: {
      type: Boolean,
      default: false
    },
    ChildrenOpenActiveRoute: {
      type: Boolean,
      default: false
    },
    BottomMiniMenuBtn: {
      type: Boolean,
      default: true
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
    'update:miniMenu'(collapsed) {
      //return collapsed
      return !!(typeof collapsed === 'boolean')
    }
  },
  data: () => ({
    smallMenu: false,
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
    miniMenu() {
      if (this.miniMenu) {
        this.updateMenuHover(true)
      }
    }
  },
  computed: {
    menuScrollEvent() {
      return this.miniMenu ? 'scroll' : null
    },
    mouseEnterEvent() {
      return this.miniMenu ? 'mouseenter' : null
    },
    mouseLeaveEvent() {
      return this.miniMenu ? 'mouseleave' : null
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
    },
    toggleMiniCollapse() {
      this.$emit('update:miniMenu', !this.miniMenu)
    }
  },
  setup(props, context) {
    const {
      getIsCollapsed: isCollapsed,
      getIsminiMenu: miniMenu,
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
      return miniMenu.value ? props.widthMiniMenu : props.width
    })

    const sidebarClass = computed(() => {
      const theme = props.dark ? 'dark' : 'white'
      return [
        `${theme}-theme`,
        props.rtl ? 'rtl' : 'ltr',
        //isCollapsed.value ? 'compelete-coolapse-menu' : '',
        miniMenu.value ? 'mini-coolapse-menu' : ''
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
