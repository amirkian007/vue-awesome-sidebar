<template>
  <div
    class="menu"
    ref="sidebarmen"
    :class="sidebarClass"
    :style="{ width: sidebarMenuWidth }"
    @[menuScrollEvent]="onMenuScroll"
    @{mouseEnterEvent}="
      () => {
        updateMenuHover(true)
      }
    "
    @{mouseleaveEvent}="
      () => {
        updateMenuHover(false)
      }
    "
  >
    <!-- <div class="menu" :class="{ 'small-menu': smallMenu }" > -->
    <slot name="header" />
    <!-- <div v-if="!$slots.header">deafult slot</div> -->
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
  <div v-if="!overLayer" class="over-layer"></div>
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
    closeOnClickOutSide: {
      type: Boolean,
      default: true
    },
        overLayerOnOpen: {
          type: Boolean,
          default: true
        },
        overLayerColor: {
          type: Boolean,
          default: false
        },
      theme: {
        type: String,
        default: 'white'
      },
    rtl: {
      type: Boolean,
      default: false
    },
    position: {
      type: String,
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
    smallMenu: false,
    
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
  computed:{
    menuScrollEvent(){
      return this.miniCollapsed ? "scroll":null
    },
    mouseEnterEvent(){
      return this.miniCollapsed ? "mouseenter":null
    },
    mouseLeaveEvent(){
      return this.miniCollapsed ? "mouseleave":null
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
    const { updateCurrentRoute } = initAwsomeRouter(props, context)

    const sidebarmen = ref(null)
    const overLayer = ref(false)
    if(props.closeOnClickOutSide){
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
            if(props.overLayerOnOpen){
              overLayer.value = currentCollapsed
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
      updateMenuHover,
      overLayer
    }
  }
}
</script>

<style lang="scss">
@import '../scss/vue-awesome-sidebar.scss';
</style>
