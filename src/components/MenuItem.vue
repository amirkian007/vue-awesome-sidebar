<template>
  <div
    :class="menuItemClass"
    ref="menuItem"
    class="menu-item-base"
    :style="{ float: miniCollapsed && depth === 1 ? 'left' : '' }"
  >
    <div
      lang
      v-if="!menuitemSlut"
      class="label"
      @[shouldMouseEnterEvent]="this.hover = true"
      @[shouldMouseLeaveEvent]="this.hover = false"
      :class="{
        menuexpand: expanded,
        menuexpand2: miniCollapsed && expanded,
        activeClass: active,
        miniActive: miniActive,
        hoverClass: MiniCollapsemainItemHover
      }"
      @click="toggleMenu()"
    >
      <div class="left" :class="{ marginAuto: miniCollapsed && depth === 0 }">
        <MenuItemIconVue v-if="!menuitemion" :icon="icon" />
        <!--slot for menuitem icon-->
        <component v-else :is="menuitemion" :iconData="icon"></component>

        <span v-if="(showLabel && alignStart) || !miniCollapsed">{{
          name
        }}</span>
      </div>
      <template v-if="(miniCollapsed && depth != 0) || !miniCollapsed">
        <div
          v-if="data && !iconSlut"
          class="icons"
          :class="{ opened: showChildren, openAnima: openAnimation }"
        ></div>
        <!--slot for menuitem prepand icon-->
        <div
          v-if="data && iconSlut"
          :class="{ open: showChildren, openAnima: openAnimation }"
        >
          <component v-if="iconSlut" :icon="icon" :is="iconSlut"> </component>
        </div>
      </template>
    </div>
    <!--slot for menu item-->
    <div v-else :class="{ menuexpand: expanded }" @click="toggleMenu()">
      <component :is="menuitemSlut" :data="menuItemSlotData"> </component>
    </div>
    <!-- children of the menuitem-->
    <!-- :class="{ topContainer: miniCollapsed && depth == 0 }" -->
    <div v-if="!miniCollapsed">
      <div
        class="items-container menuOpenAnimation"
        :class="{ 'small-menu': smallMenu }"
        :style="{ maxHeight: heifth, transition: transitionTime }"
        ref="container"
        v-if="data"
      >
        <template v-if="renderChildren">
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
        </template>
      </div>
    </div>
    <!-- -->
    <div
      class="parent"
      @mouseenter="MiniCollapseContainerHover = true"
      @mouseleave="MiniCollapseContainerHover = false"
      v-if="miniCollapsed"
      v-show="showChildren || depth != 0"
      :class="{ topContainer: depth == 0 }"
      :style="{ top: ContainerOffsetYConputed, left: widthMiniCollapsed }"
    >
      <div
        @mouseenter="MiniCollapsemainItemHover = true"
        @mouseleave="MiniCollapsemainItemHover = false"
        v-if="depth === 0"
        class="labelMini"
        :class="{
          miniActive: miniActive,
          activeClass: active,
          fadeee: expanded,
          fadeeeOut: !hover && !MiniCollapsemainItemHover
        }"
        :style="{
          left: miniMenuOffsetX + 'px',
          height: miniMenuOffsetHeight + 'px'
        }"
      >
        <span>
          {{ name }}
        </span>
      </div>
      <div v-if="depth == 0" style="height: 32px"></div>
      <div
        class="items-container menuOpenAnimation"
        :class="{ 'small-menu': smallMenu }"
        :style="{
          maxHeight: heifth,
          transition: transitionTime
        }"
        ref="container"
        v-if="data"
      >
        <template v-if="renderChildren">
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
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, inject } from 'vue'
import MenuItemIconVue from './MenuItemIcon.vue'
import { useRouter } from 'vue-router'
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
    menuMounted: false,
    eventname: null,
    miniCollapsedItemIconHover: false,
    miniCollapsedItemContainerHover: false,
    hover: false,
    ContainerOffsetY: 0,
    id: null,
    MiniCollapseContainerHover: false,
    alignStart: true,
    showText: true,
    miniMenuOffsetX: 50,
    menuexpandcOMPLETE: false,
    MiniCollapsemainItemHover: false
  }),
  props: ['data', 'smallMenu', 'close', 'name', 'icon', 'depth', 'href'],
  watch: {
    close() {
      //this.closeChildren()
    },
    currentRoute() {
      this.checkActive()
    },
    hover() {
      if (!this.id) {
        this.id = this.getRandomUid()
      }
      if (this.hover) {
        this.updateCurrantItemHover(this.id)
        this.openItemCildren()
      } else {
        if (this.CurrantItemHover === this.id && this.MenuHover) {
        } else {
          this.closeItemChildren()
        }
      }
    },
    MenuHover() {
      if (!this.MenuHover) {
        //  this.showChildren = false
        // if(this?.href && this.isSameUrl(this?.href)){
        //   this.miniActive = false
        // }else{
        // }
        this.closeItemChildren()
      } else {
      }
    },
    CurrantItemHover() {
      //   this.miniActive =this.CurrantItemHover != this.id
      if (this.CurrantItemHover != this.id) {
        //this.miniActive = false
        this.closeItemChildren()
      } else {
        // this.miniActive = true
      }
    },
    MenuScroll() {
      this.setItemOffsetHeight()
    },
    miniCollapsed() {
      if (this.miniCollapsed) {
        this.closeItemChildren()
        this.alignStart = false

        setTimeout(() => {}, 300)
      }
      this.$nextTick(() => {
        this.setItemOffsetHeight()
      })
    },
    MiniCollapseContainerHover() {
      //this.miniActive = this.MiniCollapseContainerHover
    }
  },
  created() {
    this.checkActive()
  },
  mounted() {
    //console.log( this.$refs['menuItem2'])
    this.setItemOffsetHeight()
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
    },
    shouldMouseEnterEvent() {
      return this.miniCollapsed && this.depth == 0 ? 'mouseenter' : null
    },
    shouldMouseLeaveEvent() {
      return this.miniCollapsed && this.depth == 0 ? 'mouseleave' : null
    },
    ContainerOffsetYConputed() {
      return `${this.ContainerOffsetY - 3}px`
    },
    menuItemClass() {
      let obj = {}
      obj[`menu-item-type-${this.menuType}`] = true
      return {
        miniCollapseIconWidth: this.miniCollapsed && this.depth == 0,
        miniCollapseitemWidth: this.miniCollapsed && this.depth != 0,
        alignStart: this.alignStart,
        alignCenter: !this.alignStart,
        ...obj
      }
      // return `menu-item-type-${this.menuType}`
    },
    showOnMiniCollapse() {
      showText && miniCollapsed && depth != 0
    }
  },
  setup() {
    const router = useRouter()
    const getSlots = inject('getSlotByName')
    const {
      animationDuration,
      menuType,
      widthMiniCollapsed,
      openAnimation,
      collapsed: menuCollapsed
    } = inject('sidebarProps')
    const { userAgentHeight } = inject('browserAgent')
    const currentRoute = inject('currentRoute')
    const isSameUrl = inject('isSameUrl')
    const extractChildrenRoutes = inject('extractChildrenRoutes')
    const menuMounted = inject('menuMounted')
    const miniCollapsed = inject('miniCollapsed')
    const MenuScroll = inject('MenuScroll')
    const MenuHover = inject('MenuHover')
    const getRandomUid = inject('getRandomUid')
    const updateCurrantItemHover = inject('updateCurrantItemHover')
    const updateCurranContainerHover = inject('updateCurranContainerHover')
    const CurrantItemHover = inject('CurrantItemHover')
    const animationDurationTime = computed(() => {
      return animationDuration
    })
    let iconSlut = getSlots('icons')
    let menuitemion = getSlots('menuitemion')
    let menuitemSlut = getSlots('menuitem')
    return {
      menuCollapsed,
      iconSlut,
      menuitemion,
      updateCurranContainerHover,
      animationDurationTime,
      userAgentHeight,
      menuitemSlut,
      isSameUrl,
      menuType,
      widthMiniCollapsed,
      extractChildrenRoutes,
      menuMounted,
      currentRoute,
      router,
      miniCollapsed,
      MenuScroll,
      MenuHover,
      getRandomUid,
      updateCurrantItemHover,
      CurrantItemHover,
      openAnimation
    }
  },
  methods: {
    checkActive() {
      if (this?.href && this.isSameUrl(this?.href)) {
        this.active = true
      } else {
        this.active = false
        if (!this.data) return
        let hasFound = false
        let x = this.extractChildrenRoutes(this.data, 'href') || []
        for (var i = 0; i < x.length; i++) {
          if (this.isSameUrl(x[i])) {
            hasFound = true
            // clearTimeout(this.hieghtTimeout)
            // clearTimeout(this.renderTimeOut)
            this.miniActive = true
            if (this.menuMounted || this.miniCollapsed) break
            this.openItemCildren()
            break
          }
        }
        //console.log("hasFound")
        this.miniActive = hasFound
      }
    },
    toggleMenu() {
      if (this?.href) this.$router.push(this.href)
      if (!this.data) return
      clearTimeout(this.hieghtTimeout)
      clearTimeout(this.renderTimeOut)
      if (this.showChildren) {
        this.closeItemChildren()
      } else {
        this.openItemCildren()
      }
      // this.showChildren ? this.openItemCildren() : this.closeItemChildren()
    },
    setSmallMenuDataForToggle(val) {
      clearTimeout(this.hieghtTimeout)
      clearTimeout(this.renderTimeOut)
      this.expanded = val
      this.showChildren = val
    },
    openItemCildren() {
      if (!this.data) return
      if (this.expanded) return
      this.setSmallMenuDataForToggle(true)
      this.renderChildren = true
      if (this.cacheHieght) {
        this.containerHeight = this.cacheHieght
      } else {
        this.containerHeight = this.menuMounted
          ? this.data.length * this.$refs['menuItem']?.offsetHeight + 3
          : this.userAgentHeight
      }
      this.cacheHieght = null
      //if manue is not maounted remove a
      if (!this.menuMounted) return
      if (this.miniCollapsed && this.depth === 0) {
        this.containerHeight = this.userAgentHeight
      }
      //add animation
      this.hieghtTimeout = setTimeout(
        () => {
          this.containerHeight = this.userAgentHeight
        },
        this.openAnimation ? this.animationDurationTime : 0
      )
      this.$nextTick(() => {
        this.menuexpandcOMPLETE = this.expanded
      })
    },
    closeItemChildren() {
      if (!this.data) return
      this.setSmallMenuDataForToggle(false)
      if (!this.cacheHieght) {
        this.cacheHieght = this.$refs['container']?.offsetHeight
      }
      this.containerHeight = this.$refs['container']?.offsetHeight
      //this line must be pushed to top of call stack
      setTimeout(() => {
        this.containerHeight = 0
      }, 0)
      //return if keepchildren open
      this.renderTimeOut = setTimeout(
        () => {
          this.renderChildren = false
          this.cacheHieght = null
        },
        this.openAnimation ? this.animationDurationTime : 0
      )
    },
    setItemOffsetHeight() {
      if (this.depth == 0) {
        const x = this.$refs['menuItem'].getBoundingClientRect()
        this.ContainerOffsetY = x.top + window.scrollY
        this.miniMenuOffsetX = x.width + x.left
        this.miniMenuOffsetHeight = x.height
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@use '../scss/menu-item.scss';
.alignStart {
  align-self: flex-start;
}
.alignCenter {
  align-self: center;
}

// .fade-enter-from {
//    background-color: none;

// }
// .fade-enter-to{
//    background-color:  rgba(0, 0, 0, 0.05);

// }
// remove space from left side
// .menu-item {
</style>
