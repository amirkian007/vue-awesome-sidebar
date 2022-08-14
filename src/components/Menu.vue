<template>
  <div
    class="menu"
    :class="{ 'small-menu': getIsCollapsed }"
    :style="{ width: sidebarMenuWidth }"
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
import { ref, computed, inject, provide, reactive, toRefs, watch } from 'vue'

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
    //autoCollapse: {
    //   type: String||Boolean,
    //   default: true
    // },
    width: {
      type: String,
      default: '290px'
    },
    widthCollapsed: {
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
      return !!(typeof collapsed === 'boolean')
    }
  },
  data: () => ({
    smallMenu: false
  }),

  components: {
    MenuItem
  },
  created() {},

  computed: {
    hasSlots() {
      //console.log("change")
      return this.$slots
    }
  },
  setup(props, context) {
    console.log(props)
    const {
      getIsCollapsed: isCollapsed,
      updateIsCollapsed,
      getSlotByName
      // unsetMobileItem,
      // updateCurrentRoute
    } = initAwsomeSideBar(props, context)

    const sidebarMenuWidth = computed(() => {
      return props.width
    })
    const getIsCollapsed = computed(() => {
      return isCollapsed.value
    })
    watch(
      () => props.collapsed,
      (currentCollapsed) => {
        updateIsCollapsed(currentCollapsed)
      }
    )
    // console.log(isCollapsed.value)

    return { sidebarMenuWidth, getIsCollapsed }
  }
}
</script>

<style lang="scss">
@import '../scss/vue-awesome-sidebar.scss';
</style>
