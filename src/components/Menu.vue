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
      direction: rtl ? 'rtl' : 'ltr',
      paddingTop: paddingTop
    }"
    style="overflow: hidden"
    @[mouseEnterEvent]="onEnter"
    @[mouseLeaveEvent]="onLeave"
  >
    <div
      @[menuScrollEvent]="onMenuScroll"
      class="menu-wraper"
      :class="{
        miniCoolapseMenu: miniMenuRef,
        compeleteCoolapseMenu: isCollapsed
      }"
      :style="{
        width: sidebarMenuWidth
      }"
    >
      <slot name="header" />
      <template v-for="(item, index) in menu" :key="index">
        <MenuItem
          v-if="!item?.header && !item?.LineShow"
          :item="item"
          :depth="0"
          :smallMenu="smallMenu"
          :siblingsHaveIconProp="siblingsHaveIcon"
        />
        <HeaderItem v-else-if="item?.header && !miniMenuRef" :data="item" />
        <Menuline v-else-if="item?.LineShow" :data="item" />
      </template>
      <div class="vas-footer">
        <div class="footer-wrapper"></div>
        <slot name="footer" />
      </div>
    </div>
    <div v-if="BottomMiniMenuBtn" class="bottomBtn" @click="toggleMiniCollapse">
      <div
        v-if="!$slots?.BottomMiniMenuBtn"
        class="icons bottomBtnIcon"
        :class="{ ssdSpin: !miniMenuRef }"
      ></div>
      <slot v-else name="BottomMiniMenuBtn" :miniMenu="miniMenuRef" />
    </div>
  </aside>
  <Transition name="vas-fade">
    <div v-if="overLayer" class="vas-over-layer"></div>
  </Transition>
</template>

<script>
import HeaderItem from './HeaderItem.vue'
import MenuItem from './MenuItem.vue'
import Menuline from './Menuline.vue'
import { initAwsomeSideBar } from '../hooks/useAwseomeSideBar'
import { useClickOutSide, useAutoCollapse } from '../hooks/useClickOutSide'
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
      default: 300
    },
    width: {
      type: String,
      default: '290px'
    },
    widthMiniMenu: {
      type: String,
      default: '65px'
    },
    autoCollapse: {
      type: Number,
      default: null
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
    childrenOpenAnimation: {
      type: Boolean,
      default: true
    },
    position: {
      type: String,
      default: 'fixed'
    },
    keepChildrenOpen: {
      type: Boolean,
      default: false
    },
    ChildrenOpenActiveRoute: {
      type: Boolean,
      default: true
    },
    checkButtonActive: {
      type: Boolean,
      default: true
    },
    vueRouterEnabel: {
      type: Boolean,
      default: false
    },
    BottomMiniMenuBtn: {
      type: Boolean,
      default: true
    },
    paddingTop: {
      type: String,
      default: '0px'
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
      return !!(typeof collapsed === 'boolean')
    },
    'update:miniMenu'(collapsed) {
      return !!(typeof collapsed === 'boolean')
    }
  },
  data: () => ({
    smallMenu: false,
    siblingsHaveIcon: false
  }),

  components: {
    MenuItem,
    HeaderItem,
    Menuline
  },
  mounted() {
    this.checkSiblingsForIcon()
    // USAGE
    window.addEventListener(
      'hashchange',
      () => {
        this.updateCurrentRoute(window.location)
      },
      false
    )
  },
  watch: {
    async $route() {
      this.updateCurrentRoute(window.location)
    },
    miniMenuRef() {
      if (this.miniMenuRef) {
        this.updateMenuHover(true)
      }
    }
  },
  computed: {
    menuScrollEvent() {
      return this.miniMenuRef ? 'scroll' : null
    },
    mouseEnterEvent() {
      return this.miniMenuRef ? 'mouseenter' : null
    },
    mouseLeaveEvent() {
      return this.miniMenuRef ? 'mouseleave' : null
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
      const x = !this.miniMenuRef
      this.updateminiMenu(x)
      this.$emit('update:miniMenu', x)
    }
  },
  setup(props, context) {
    const {
      getIsCollapsed: isCollapsed,
      getIsminiMenu: miniMenuRef,
      updateMenuScroll,
      updateMenuHover,
      updateminiMenu,
      menuDirection,
      updateIsCollapsed
    } = initAwsomeSideBar(props, context)
    const { updateCurrentRoute } = initAwsomeRouter(props, context)

    const sidebarmen = ref(null)
    const overLayer = ref(props.overLayerOnOpen)

    const { removeSideBarListner, addSideBarListner } = useClickOutSide(
      sidebarmen,
      () => {
        updateIsCollapsed(!isCollapsed.value)
      },
      isCollapsed
    )
    if (props.closeOnClickOutSide) {
      addSideBarListner()
    }
    watch(
      () => isCollapsed.value,
      (currentCollapsed) => {
        context.emit('update:collapsed', currentCollapsed)
        if (props.overLayerOnOpen) {
          overLayer.value = !currentCollapsed
        }
        if (props.closeOnClickOutSide) {
          currentCollapsed ? removeSideBarListner() : addSideBarListner()
        }
      }
    )
    watch(
      () => props.collapsed,
      (val) => {
        updateIsCollapsed(val)
      }
    )
    watch(
      () => props.closeOnClickOutSide,
      (val) => {
        val ? addSideBarListner() : removeSideBarListner()
      }
    )
    watch(
      () => props.miniMenu,
      (val) => {
        updateminiMenu(val)
      }
    )
    watch(
      () => props.overLayerOnOpen,
      (val) => {
        if (val) {
          overLayer.value = !isCollapsed.value
        } else {
          overLayer.value = false
        }
      }
    )
    const sidebarMenuWidth = computed(() => {
      return miniMenuRef.value ? props.widthMiniMenu : props.width
    })

    const sidebarClass = computed(() => {
      const theme = props.dark ? 'dark' : 'white'
      return [
        `${theme}-theme`,
        props.rtl ? 'rtl' : 'ltr'
        //isCollapsed.value ? 'compelete-coolapse-menu' : '',
      ]
    })
    useAutoCollapse(props.autoCollapse, updateIsCollapsed)
    if (props.overLayerOnOpen) {
      overLayer.value = !isCollapsed.value
    }
    return {
      sidebarMenuWidth,
      updateMenuScroll,
      sidebarClass,
      sidebarmen,
      updateCurrentRoute,
      updateMenuHover,
      overLayer,
      isCollapsed,
      updateminiMenu,
      miniMenuRef,
      menuDirection
    }
  }
}
</script>

<style lang="scss">
@use '../scss/vue-awesome-sidebar.scss';
</style>
