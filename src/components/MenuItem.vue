<template>
  <div
    :class="menuItemClass"
    ref="menuItem"
    class="menu-item-base alignCenter"
    :style="{
      float: miniCollapsed && depth === 1 ? menuDirection : menuDirectionOposite
    }"
  >
    <!-- ========================= -->
    <!-- 1 this is basiclly the menu btn  -->
    <!-- menuexpand2: miniCollapsed && showChildren && depth === 0, -->
    <!-- ========================= -->

    <div
      class="label"
      @[shouldMouseEnterEvent]="this.hover = true"
      @[shouldMouseLeaveEvent]="this.hover = false"
      :class="{
        menuexpand: showChildren,
        activeClass: active,
        miniActive: miniActive,
        labelHoverClass: (depth != 0 && miniCollapsed) || !miniCollapsed
      }"
      @click="labelClick"
      :style="{
        [menuDirection=='left' ? 'paddingLeft':'paddingRight']: menuType === 'fully' ? `${depth * 18}px` : ``,
        background: depth == 0 && active && miniCollapsed ? 'none' : '',
      }"
    >
      <div
        class="left"
        ref="labelRef"
        :class="{ marginAuto: miniCollapsed && depth === 0 }"
      >
        <template
          v-if="!removeIconSpace || (removeIconSpace && siblingsHaveIconProp)"
        >
          <MenuItemIconVue v-if="!prepandicon" :icon="item?.icon" />
          <!-- !!! slot for menuitem icon-->
          <component
            v-else-if="prepandicon"
            :is="prepandicon"
            :iconData="item?.icon"
            :active="active"
            :miniActive="miniActive"
          ></component>
        </template>
        <template v-if="labelName">
          <span v-if="!menuitemLabel">{{ labelName }}</span>
          <component v-else :labelName="labelName" :is="menuitemLabel" />
        </template>
      </div>
      <template v-if="(miniCollapsed && depth != 0) || !miniCollapsed">
        <div
          v-if="item.children && !apendIcon"
          class="icons"
          :class="{ opened: showChildren, postIconOpenAnima: openAnimation }"
        ></div>
        <!-- !!!  slot for menuitem prepand icon-->
        <div v-if="item.children && apendIcon">
          <component
            v-if="apendIcon"
            :icon="item?.icon"
            :isMenuOpen="openAnimation"
            :is="apendIcon"
          >
          </component>
        </div>
      </template>
    </div>

    <!-- ========================= -->
    <!--2 this container is for when menu full width -->
    <!-- ========================= -->
    <div v-if="!miniCollapsed || ((depth !=0)&&miniCollapsed)">
      <div
        class="items-container"
        :class="{ 'small-menu': smallMenu }"
        :style="{ maxHeight: heifOfContainer, transition: transitionTime }"
        ref="container"
        v-if="item.children"
      >
        <template v-if="renderChildren">
          <menu-item
            v-for="(item, index) in item.children"
            :siblingsHaveIconProp="siblingsHaveIcon"
            :isParentFlat="siblingsHaveIconProp"
            :key="index"
            :item="item"
            :depth="depth + 1"
            :smallMenu="smallMenu"
          />
        </template>
      </div>
    </div>

    <!-- ========================= -->
    <!--3  this container is for when menu is not mini -->
    <!-- ========================= -->

    <div v-if="miniCollapsed && (depth ===0)"
      :class="{ topContainer: depth == 0 }"
      ref="topContainerRef"
      :style="{
        [MakeSpace
          ? 'bottom'
          : 'top']: `calc(${ContainerOffsetYConputed} - 1px)`,
        [menuDirection]: `calc(${widthMiniCollapsed} - 1px)`,
        maxHeight: MakeSpace ? TopcontainerHiefht : '',
        width: (depth === 0 && showChildren) || depth !=0  ? '250px' : '0px',
          opacity: (depth === 0 && showChildren) ? '1' : '0'
       
      }"
    > 
      <div
       
        @click="miniLabelClick"
        @mousewheel="mousewheelop"
        class="labelMini"
        :class="{
          miniActive: miniActive,
          activeClass: active
        }"
        :style="{
          position: 'fixed',
          whiteSpace: 'nowrap',
          [menuDirection]: menuType === 'fully' ? '0px' : miniLabelDirection,
          width: miniLabelWidth,
          [MakeSpace ? 'bottom' : 'top']: ContainerOffsetYConputed,
          opacity: (depth === 0 && showChildren) ? '1' : '0'
          
        }"
      >
        <!--main menu btn-->
        <div
        v-if="showChildren"
          class="left"
          :class="{ marginAuto: miniCollapsed && depth === 0 }"
          :style="{
            [menuDirection]: widthMiniCollapsed,
            top: labelMiniYYofsset + 'px'
          }"
        >
          <span v-if="!menuitemLabel">{{ item?.name }}</span>
          <component v-else :labelName="item?.name" :is="menuitemLabel" />
        </div>
      </div>
      <div
        class="labelminiSub"
        v-if="depth == 0 && !MakeSpace && showChildren"
      ></div>
      <div
        class="items-container"
        :class="{ 'small-menu': smallMenu }"
        :style="{
          maxHeight: heifOfContainer,
          transition: transitionTime
        }"
        ref="container"
        v-if="item.children"
      >
        <template v-if="renderChildren">
          <menu-item
            v-for="(item, index) in item.children"
            :siblingsHaveIconProp="siblingsHaveIcon"
            :isParentFlat="siblingsHaveIconProp"
            :key="index"
            :item="item"
            :depth="depth + 1"
            :smallMenu="smallMenu"
          />
        </template>
      </div>
      <div
        class="labelminiSub"
        v-if="depth == 0 && MakeSpace && showChildren"
      ></div>
    </div>
  </div>
</template>

<script>
import MenuItemIconVue from './MenuItemIcon.vue'
import { inject } from 'vue'
export default {
  name: 'menu-item',
  components: { MenuItemIconVue },
  data: () => ({
    showChildren: false,
    expanded: false,
    containerHeight: '0',
    hieghtTimeout: null,
    renderTimeOut: null,
    renderChildren: false,
    cacheHieght: null,
    active: false,
    miniActive: false,
    hover: false,
    ContainerOffsetY: 0,
    id: null,
    siblingsHaveIcon: false,
    MakeSpace: false,
    TopcontainerHiefht: 0,
    labelMiniYofsset: 0,
    labelMiniYYofsset: 0,
    miniMenuOffset:50
  }),

  props: [
    'smallMenu',
    'header',
    'depth',
    'siblingsHaveIconProp',
    'isParentFlat',
    'item'
  ],
  setup() {
    const getSlots = inject('getSlotByName')
    const {
      animationDuration,
      menuType,
      widthMiniCollapsed,
      openAnimation,
      removeIconSpace,
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
    const menuDirection = inject('menuDirection')
    const emitOnItemClick = inject('emitOnItemClick')
    let apendIcon = getSlots('apendIcon')
    let prepandicon = getSlots('prepandicon')
    let menuitemLabel = getSlots('menuitemLabel')

    return {
      animationDuration,
      menuitemLabel,
      currentRoute,
      menuMounted,
      apendIcon,
      prepandicon,
      miniCollapsed,
      MenuScroll,
      MenuHover,
      emitOnItemClick,
      menuDirection,
      CurrantItemHover,
      updateCurranContainerHover,
      updateCurrantItemHover,
      getRandomUid,
      extractChildrenRoutes,
      isSameUrl,
      menuType,
      widthMiniCollapsed,
      openAnimation,
      removeIconSpace,
      collapsed: menuCollapsed,
      userAgentHeight
    }
  },
  watch: {
    currentRoute() {
      this.checkActive()
    },
    hover() {
      //TODO :MAKE THIS MORE EFFICEANT
      if (this.miniCollapsed && this.hover) {
        this.$nextTick(() => {
          this.setItemOffsetHeight()
          const y = this.$refs['labelRef'].getBoundingClientRect()
          this.labelMiniYofsset = y[this.menuDirection]
          this.labelMiniYYofsset = y.top
        })
      }

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
        this.closeItemChildren()
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
      if ('ontouchstart' in document.documentElement) {
        this.closeItemChildren()
      } else {
        this.setItemOffsetHeight()
        const y = this.$refs['labelRef'].getBoundingClientRect()
        this.labelMiniYofsset = y[this.menuDirection]
        this.labelMiniYYofsset = y.top
      }
    },
    miniCollapsed() {
      if (this.miniCollapsed) {
        this.closeItemChildren()
      }
      this.$nextTick(() => {
        this.setItemOffsetHeight()
      })
    }
  },
  created() {
    this.checkActive()
  },
  mounted() {
    this.checkSiblingsForIcon()
    this.setItemOffsetHeight()
  },
  computed: {
    menuDirectionOposite() {
      return this.menuDirection === 'right' ? 'left' : 'right'
    },
    labelName() {
      if (this.miniCollapsed) {
        return this.depth != 0 ? this.item?.name : false
      }
      return this.item?.name
    },
    heifOfContainer() {
      return this.containerHeight === this.userAgentHeight
        ? this.containerHeight
        : this.containerHeight + 'px'
    },
    transitionTime() {
      return `all ${this.animationDuration / 1000}s ease-in-out`
    },
    menuItemSlotData() {
      return {
        icon: { icon: this.item?.icon || {}, name: this.item?.name }
      }
    },
    shouldMouseEnterEvent() {
      return this.miniCollapsed && this.depth == 0 ? 'mouseenter' : null
    },
    labelPressEvent() {
      if (this.hover) {
        return 'click'
      }
      return this.miniCollapsed && this.depth == 0 ? 'keypress' : 'click'
    },
    shouldMouseLeaveEvent() {
      return this.miniCollapsed && this.depth == 0 ? 'mouseleave' : null
    },
    ContainerOffsetYConputed() {
      return `${this.ContainerOffsetY}px`
    },
    menuItemClass() {
      let obj = {}
      obj[`vas-${this.menuType}`] = true
      return {
        miniCollapseIconWidth: this.miniCollapsed && this.depth == 0,
        MenuItemWidthOnMiniCollapse: this.miniCollapsed && this.depth != 0,
        menuExpanded:
          this.menuType === 'fully' &&
          ((!this.miniCollapsed && this.expanded && this.depth == 0) ||
            (this.miniCollapsed && this.depth == 1 && this.expanded)),
        noIconWidth:
          this.removeIconSpace &&
          !this.miniCollapsed &&
          !this.siblingsHaveIconProp &&
          this.isParentFlat,
        noIconWidthMiniMenu:
          this.removeIconSpace &&
          this.miniCollapsed &&
          this.depth != 0 &&
          !this.siblingsHaveIconProp &&
          this.isParentFlat,
        ...obj
      }
      // return `menu-item-type-${this.menuType}`
    },
    miniLabelWidth() {
      const zarib = Number(this.menuType != 'fully')
      return this.expanded
        ? `calc(${this.widthMiniCollapsed}*${zarib}/2 - ${this.$refs['menuItem'].clientWidth}*${zarib}px/2 + ${this.$refs['menuItem'].clientWidth}px + 250px - 1.5px)`
        : `${this.$refs['menuItem']?.clientWidth || 35}px`
    },
    miniLabelDirection() {
      return `calc((${this.widthMiniCollapsed} - ${this.miniMenuOffset}px) / 2)`
    }
  },

  methods: {
    mousewheelop(w) {
      document.querySelector('.vas-menu').scrollBy(0, w.deltaY)
    },
    PushToTopOfCallStack(cb) {
      setTimeout(() => {
        cb()
      }, 0)
    },
    checkActive() {
      if (this.item?.href && this.isSameUrl(this.item?.href)) {
        this.active = true
      } else {
        this.active = false
        if (!this.item?.children) return
        let hasFound = false
        let x = this.extractChildrenRoutes(this.item?.children, 'href') || []
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
        this.miniActive = hasFound
      }
    },
    labelClick() {
      if (this.hover) {
        this.miniLabelClick()
      } else {
        this.toggleMenu()
      }
    },
    miniLabelClick() {
      this.emitOnItemClick(this.item)
      if (this.item?.href && this.$router && !this.vueRouterDisabel)
        this.$router?.push(this.item?.href)
    },
    toggleMenu() {
      this.emitOnItemClick(this.item)
      if (this.item?.href && this.$router && !this.vueRouterDisabel)
        this.$router?.push(this.item?.href)
      if (!this.item?.children) return
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
      this.$nextTick(() => {
        this.expanded = val
      })
      this.showChildren = val
    },
    checkSiblingsForIcon() {
      if (!this.removeIconSpace && this.menuType == 'fully') return
      if (!this.item?.children) return
      for (var i = 0; i < this.item?.children.length; i++) {
        if (this.item?.children[i]?.icon) {
          this.siblingsHaveIcon = true
          break
        }
      }
    },
    openItemCildren() {
      if (this.miniCollapsed && this.depth === 0) {
        this.showChildren = true

        this.$nextTick(() => {
          this.expanded = true
        })
      }
      if (!this.item?.children) return
      if (this.expanded) return
      this.setSmallMenuDataForToggle(true)
      this.renderChildren = true
      if (this.cacheHieght) {
        this.containerHeight = this.cacheHieght
      } else {
        this.containerHeight = this.menuMounted
          ? this.item?.children.length * this.$refs['menuItem']?.offsetHeight +
            3
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
        this.openAnimation ? this.animationDuration : 0
      )
    },
    closeItemChildren() {
      if (this.miniCollapsed && this.depth === 0) {
        this.showChildren = false
        this.$nextTick(() => {
          this.expanded = false
        })
      }
      if (!this.item?.children) return
      this.setSmallMenuDataForToggle(false)
      if (!this.cacheHieght) {
        this.cacheHieght = this.$refs['container']?.offsetHeight
      }
      this.containerHeight = this.$refs['container']?.offsetHeight
      //this line must be pushed to top of call stack
      this.PushToTopOfCallStack(() => {
        this.containerHeight = 0
      })
      //return if keepchildren open
      this.renderTimeOut = setTimeout(
        () => {
          this.renderChildren = false
          this.cacheHieght = null
        },
        this.openAnimation ? this.animationDuration : 0
      )
    },
    setItemOffsetHeight() {
      if (this.depth == 0) {
        const x = this.$refs['menuItem'].getBoundingClientRect()
        const x1 = this.$refs['topContainerRef']?.clientHeight

         if (x1 && x1 + x.top - 15 > innerHeight) {
           this.ContainerOffsetY = innerHeight - x.bottom
           this.TopcontainerHiefht = x1 + 8 + 'px'
           this.MakeSpace = true
         } else {
           this.ContainerOffsetY = x.top
           this.MakeSpace = false
           }
        this.miniMenuOffset = x.width
      }
    }
  }
}
</script>
