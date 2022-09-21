<template>
  <div
    :class="menuItemClass"
    ref="menuItem"
    class="menu-item-base"
    :style="{
      float: miniCollapsed && depth === 1 ? menuDirection : menuDirectionOposite
    }"
  >
    <!-- ========================= -->
    <!-- 1 this is basiclly the menu btn  -->
        <!-- hoverClass: MiniCollapsemainItemHover -->
        <!-- menuexpand2: miniCollapsed && showChildren && depth === 0, -->
    <!-- ========================= -->

    <div
      v-if="!menuitemSlut"
      class="label"
      @[shouldMouseEnterEvent]="this.hover = true"
      @[shouldMouseLeaveEvent]="this.hover = false"
      :class="{
        menuexpand: showChildren,
        activeClass: active,
        miniActive: miniActive,
      }"
      @[labelPressEvent]="toggleMenu"
      :style="{
        opacity: miniCollapsed && depth === 0 && showChildren ? '0' : '1'
      }"
    >
      <div class="left" :class="{ marginAuto: miniCollapsed && depth === 0 }">
        <template v-if=" !removeIconSpace|| removeIconSpace&&siblingsHaveIconProp">
          <MenuItemIconVue v-if="!menuitemion" :icon="item?.icon" />
          <!-- !!! slot for menuitem icon-->
          <component
            v-else-if="menuitemion"
            :is="menuitemion"
            :iconData="item?.icon"
          ></component>
        </template>

        <span v-if="labelName">{{ labelName }}</span>
      </div>
      <template v-if="(miniCollapsed && depth != 0) || !miniCollapsed">
        <div
          v-if="data && !iconSlut"
          class="icons"
          :class="{ opened: showChildren, postIconOpenAnima: openAnimation }"
        ></div>
        <!-- !!!  slot for menuitem prepand icon-->
        <div v-if="data && iconSlut">
          <component
            v-if="iconSlut"
            :icon="item?.icon"
            :isMenuOpen="openAnimation"
            :is="iconSlut"
          >
          </component>
        </div>
      </template>
    </div>

    <!-- ========================= -->
    <!-- 1.5 this is the slot for menu btn  -->
    <!-- ========================= -->

    <div
      v-else
      @[shouldMouseEnterEvent]="this.hover = true"
      @[shouldMouseLeaveEvent]="this.hover = false"
      @[labelPressEvent]="toggleMenu"
      :class="{ menuexpand: expanded }"
      :style="{
        opacity: miniCollapsed && depth === 0 && showChildren ? '0' : '1'
      }"
    >
      <component
        :isActive="active"
        :isminiActive="miniActive"
        :isChildrenExpanded="expanded"
        :depth="depth"
        :menuItemData="menuItemSlotData"
        :is="menuitemSlut"
        :isSmallMenu="miniCollapsed"
      >
      </component>
    </div>
    <!-- ========================= -->
    <!--2 this container is for when menu full width -->
    <!-- ========================= -->
    <div v-if="!miniCollapsed">
      <div
        class="items-container"
        :class="{ 'small-menu': smallMenu }"
        :style="{ maxHeight: heifth, transition: transitionTime }"
        ref="container"
        v-if="data"
      >
        <template v-if="renderChildren">
          <menu-item
            v-for="(item, index) in data"
            :siblingsHaveIconProp="siblingsHaveIcon"
            :isParentFlat="siblingsHaveIconProp"
            :key="index"
            :data="item.children"
            :name="item.name"
            :item="item"
            :icon="item.icon"
            :href="item.href"
            :depth="depth + 1"
            :smallMenu="smallMenu"
            :close="closeChild"
          />
        </template>
      </div>
    </div>

    <!-- ========================= -->
    <!--3  this container is for when menu is not mini -->
    <!-- ========================= -->

    <div
      @mouseenter="MiniCollapseContainerHover = true"
      @mouseleave="MiniCollapseContainerHover = false"
      v-if="miniCollapsed"
      v-show="showChildren || depth != 0"
      :class="{ topContainer: depth == 0 }"
      :style="{
        top: ContainerOffsetYConputed,
        [menuDirection]: `calc(${widthMiniCollapsed})`
      }"
    >
      <div
        @mouseenter="MiniCollapsemainItemHover = true"
        @mouseleave="MiniCollapsemainItemHover = false"
        @click="miniLabelClick"
        v-if="depth === 0"
        :class="{
          miniActive: !menuitemSlut && miniActive,
          activeClass: !menuitemSlut && active,
          labelMini: !menuitemSlut
        }"
        :style="{
          position: 'fixed',
          whiteSpace: 'nowrap',
          [menuDirection]:
            menuDirection === 'left'
              ? miniMenuOffsetXLeft + 'px'
              : miniMenuOffsetXRight + 'px',
          height: miniMenuOffsetHeight + 'px',
          width: expanded
            ? `calc(${widthMiniCollapsed}/2 - ${$refs['menuItem'].clientWidth}px/2 + ${$refs['menuItem'].clientWidth}px + 250px)`
            : `${$refs['menuItem'].clientWidth}px`
        }"
      >
        <!--main menu btn-->
        <div
          v-if="!menuitemSlut"
          class="left"
          :class="{ marginAuto: miniCollapsed && depth === 0 }"
        >
          <MenuItemIconVue v-if="!menuitemion" :icon="item?.icon" />
          <!--slot for menuitem icon-->
          <component v-else :is="menuitemion" :iconData="item?.icon"></component>

          <span style="padding-left: 15px; padding-right: 15px">{{
            name
          }}</span>
        </div>

        <!--slot fot menu item-->
        <div
          v-else
          @[shouldMouseEnterEvent]="this.hover = true"
          @[shouldMouseLeaveEvent]="this.hover = false"
          @keypress="miniLabelClick"
        >
          <component
            :isActive="active"
            :isminiActive="miniActive"
            :isChildrenExpanded="expanded"
            :depth="depth"
            :menuItemData="menuItemSlotData"
            :is="menuitemSlut"
            :isSmallMenu="miniCollapsed"
          >
          </component>
        </div>
      </div>
      <div v-if="depth == 0" :style="`height: ${miniMenuOffsetHeight}px`"></div>
      <div
        class="items-container"
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
            v-for="(item, index) in data"
            :siblingsHaveIconProp="siblingsHaveIcon"
            :isParentFlat="siblingsHaveIconProp"
            :key="index"
            :item="item"
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
    miniMenuOffsetXLeft: 50,
    miniMenuOffsetXRight: 50,
    menuexpandcOMPLETE: false,
    MiniCollapsemainItemHover: false,
    miniMenuOffsetHeight: 0,
    siblingsHaveIcon: false
  }),
  props: [
    'data',
    'smallMenu',
    'close',
    'header',
    'name',
    'icon',
    'depth',
    'siblingsHaveIconProp',
    'isParentFlat',
    'item'
  ],
  watch: {
    currentRoute() {
      this.checkActive()
    },
    hover() {
      //TODO :MAKE THIS MORE EFFICEANT
      if (this.miniCollapsed && this.hover) {
        this.setItemOffsetHeight()
      }

      if (!this.id) {
        this.id = this.getRandomUid()
      }
      if (this.hover) {
        // this.kirkhar = `calc(${this.widthMiniCollapsed/2}px + ${this.$refs['menuItem'].clientWidth} + 250px)`
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
      this.setItemOffsetHeight()
    },
    miniCollapsed() {
      if (this.miniCollapsed) {
        this.closeItemChildren()
        this.alignStart = false
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
    this.checkSiblingsForIcon()
    //console.log( this.$refs['menuItem2'])
    this.setItemOffsetHeight()
  },
  computed: {
    menuDirectionOposite() {
      return this.menuDirection === 'right' ? 'left' : 'right'
    },
    labelName() {
      if (this.miniCollapsed) {
        return this.depth != 0 ? this.name : false
      }
      return this.name
    },
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
        icon: { icon: this.item?.icon || {}, name: this.name }
      }
    },
    shouldMouseEnterEvent() {
      return this.miniCollapsed && this.depth == 0 ? 'mouseenter' : null
    },
    labelPressEvent() {
      return this.miniCollapsed && this.depth == 0 ? 'keypress' : 'click'
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
        MenuItemWidthOnMiniCollapse: this.miniCollapsed && this.depth != 0,
        alignStart: this.alignStart,
        alignCenter: true,
        noIconWidth:
        this.removeIconSpace&&
          !this.miniCollapsed &&
          !this.siblingsHaveIconProp &&
          this.isParentFlat,
        noIconWidthMiniMenu:
        this.removeIconSpace&&
          this.miniCollapsed &&
          this.depth != 0 &&
          !this.siblingsHaveIconProp &&
          this.isParentFlat,
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
    const animationDurationTime = computed(() => {
      return animationDuration
    })
    let iconSlut = getSlots('icons')
    let menuitemion = getSlots('menuitemion')
    let menuitemSlut = getSlots('menuitem')
    return {
      menuCollapsed,
      iconSlut,
      emitOnItemClick,
      menuDirection,
      menuitemion,
      updateCurranContainerHover,
      animationDurationTime,
      userAgentHeight,
      menuitemSlut,
      isSameUrl,
      menuType,
      removeIconSpace,
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
    miniLabelClick() {
      this.emitOnItemClick(this.item)
      if (this.item?.href) this.$router.push(this.item?.href)
    },
    toggleMenu() {
      this.emitOnItemClick(this.item)
      if (this.item?.href) this.$router.push(this.item?.href)
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
      this.$nextTick(() => {
        this.expanded = val
      })
      this.showChildren = val
    },
    checkSiblingsForIcon() {
      if(!this.removeIconSpace)return
      if (!this.data) return
      for (var i = 0; i < this.data.length; i++) {
        if (this.data[i]?.icon) {
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
      if (this.miniCollapsed && this.depth === 0) {
        this.showChildren = false
        this.$nextTick(() => {
          this.expanded = false
        })
      }
      if (!this.data) return
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
        this.openAnimation ? this.animationDurationTime : 0
      )
    },
    setItemOffsetHeight() {
      if (this.depth == 0) {
        const x = this.$refs['menuItem'].getBoundingClientRect()
        this.ContainerOffsetY = x.top + window.scrollY
        // this.miniMenuOffsetXLeft = x.width + x.left
        this.miniMenuOffsetXLeft = x[this.menuDirection]
        this.miniMenuOffsetXRight = window.innerWidth - x[this.menuDirection]
        this.miniMenuOffsetHeight = x.height
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@use '../scss/menu-item.scss';
.alignCenter {
  align-self: center;
}
</style>
