<template>
  <div class="menu-item-type-simple-icon">
    <div
      v-if="!menuitemSlut"
      class="label"
      :class="{
        menuexpand: expanded,
        activeClass: active,
        miniActive: miniActive
      }"
      @click="toggleMenu()"
    >
      <div class="left">
        <MenuItemIconVue v-if="!menuitemion" :icon="icon" />
        <!--slot for menuitem icon-->
        <component v-else :is="menuitemion" :iconData="icon"></component>
        <span v-if="showLabel">{{ name }}</span>
      </div>
      <div
        v-if="data && !iconSlut"
        class="icons"
        :class="{ opened: showChildren }"
      ></div>
      <!--slot for menuitem prepand icon-->
      <div
        v-if="data && iconSlut"
        class="openAnima"
        :class="{ open: showChildren }"
      >
        <component v-if="iconSlut" :icon="icon" :is="iconSlut"> </component>
      </div>
    </div>
    <!--slot for menu item-->
    <div v-else :class="{ menuexpand: expanded }" @click="toggleMenu()">
      <component :is="menuitemSlut" :data="menuItemSlotData"> </component>
    </div>
    <!-- children of the menuitem-->
    <div
      class="items-container menuOpenAnimation"
      :class="{ 'small-menu': smallMenu }"
      :style="{ maxHeight: heifth, transition: transitionTime }"
      ref="container"
      v-if="data"
    >
      <div v-if="renderChildren">
        <menu-item
          :class="{ opened: showChildren }"
          v-for="(item, index) in data"
          :key="index"
          :data="item.children"
          :name="item.name"
          :icon="item.icon"
          :href="item.href"
          :depth="depth + 1"
          :smallMenu="smallMenu"
          :close="closeChild"
        />
      </div>
    </div>
  </div>
</template>

<script>
import {
  ref,
  computed,
  inject,
  provide,
  reactive,
  toRefs,
  watch,
  nextTick
} from 'vue'
import MenuItemIconVue from './MenuItemIcon.vue'

export default {
  name: 'menu-item',
  components: { MenuItemIconVue },
  data: () => ({
    showChildren: false,
    expanded: false,
    containerHeight: '0',
    closeChild: false,
    iconOpen: false,
    hieghtTimeout: null,
    renderTimeOut: null,
    renderChild: false,
    renderChildren: false,
    cacheHieght: null,
    active: false,
    miniActive: false,
    menuMounted: false
  }),
  props: {
    data: {
      type: Array
    },
    close: {
      type: Boolean
    },
    name: {
      type: String
    },
    icon: {
      type: Object
    },
    depth: {
      type: Number
    },
    smallMenu: {
      type: Boolean
    },
    href: {
      type: String
    }
  },
  watch: {
    close() {
      this.closeChildren()
    },
    currentRoute() {
      this.checkActive()
    }
  },
  created() {
    this.checkActive()
  },
  computed: {
    showLabel() {
      return this.smallMenu ? this.depth > 0 : true
    },
    heifth() {
      return this.containerHeight === this.userAgentHeight
        ? this.containerHeight
        : this.containerHeight + 'px'
    },
    transitionTime() {
      return `all ${this.animationDurationTime / 1000}s ease-in-out`
    },
    menuItemSlotData() {
      return {
        icon: { icon: this.icon || {}, name: this.name }
      }
    }
  },
  setup(props, context) {
    const foo = inject('getSlotByName')
    const { animationDuration } = inject('sidebarProps')
    const { userAgentHeight } = inject('browserAgent')
    const currentRoute = inject('currentRoute')
    const isSameUrl = inject('isSameUrl')
    const extractChildrenRoutes = inject('extractChildrenRoutes')
    const menuMounted = inject('menuMounted')
    const animationDurationTime = computed(() => {
      return animationDuration
    })
    let iconSlut = foo('icons')
    let menuitemion = foo('menuitemion')
    let menuitemSlut = foo('menuitem')
    return {
      iconSlut,
      menuitemion,
      animationDurationTime,
      userAgentHeight,
      menuitemSlut,
      isSameUrl,
      extractChildrenRoutes,
      menuMounted
    }
  },
  methods: {
    checkActive() {
      if (!this?.href) return
      if (this.isSameUrl(this?.href)) {
        //console.log(this.href,this.name)
        this.active = true
      } else {
        if (!this.data) return
        let x = this.extractChildrenRoutes(this.data, 'href') || []
        for (var i = 0; i < x.length; i++) {
          if (this.isSameUrl(x[i])) {
            clearTimeout(this.hieghtTimeout)
            clearTimeout(this.renderTimeOut)
            this.miniActive = true
            if (this.menuMounted) break
            this.expanded = true
            this.showChildren = true
            this.openItemCildren()
            break
          }
        }
      }
    },
    closeChildren() {
      if (this.close) {
        this.closeChild = true
        this.expanded = false
        this.showChildren = false
        setTimeout(() => {
          //   this line must be pushed to top of call stack
          this.containerHeight = 0
        }, 0)
      } else {
        //  this.closeChild = false
      }
    },
    toggleMenu() {
      console.log('menuMounted', this.menuMounted)
      if (!this.data) return
      clearTimeout(this.hieghtTimeout)
      clearTimeout(this.renderTimeOut)
      this.expanded = !this.expanded
      this.showChildren = !this.showChildren
      // this.closeChild = !this.expanded
      if (this.showChildren) {
        this.openItemCildren()
      } else {
        this.closeItemChildren()
      }
    },
    openItemCildren() {
      this.renderChildren = true
      if (this.cacheHieght) {
        this.containerHeight = this.cacheHieght
      } else {
        this.containerHeight = this.menuMounted
          ? this.data.length * 35
          : this.userAgentHeight
      }
      this.cacheHieght = null
      if (!this.menuMounted) return
      this.hieghtTimeout = setTimeout(() => {
        this.containerHeight = this.userAgentHeight
      }, this.animationDurationTime)
    },
    closeItemChildren() {
      if (!this.cacheHieght) {
        this.cacheHieght = this.$refs['container']?.offsetHeight
      }
      this.containerHeight = this.$refs['container']?.offsetHeight
      setTimeout(() => {
        this.containerHeight = 0
        //this line must be pushed to top of call stack
      }, 0)
      this.renderTimeOut = setTimeout(() => {
        this.cacheHieght = null
        this.renderChildren = false
      }, this.animationDurationTime)
    }
  }
}
</script>

<style lang="scss" scoped>
//slot for menu item
//make props actually work

@import '../scss/menu-item.scss'; // .menu-item {
</style>
