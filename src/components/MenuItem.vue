<template>
  <div  class="menu-item-type-simple-icon" :class="{ opened: expanded }">
    <div class="label" :class="{ opened: expanded }" @click="toggleMenu()">
      <div class="left" >
        <MenuItemIconVue v-if="!menuitemion" :icon="icon" />
        <component v-else :is="menuitemion" :iconData="icon"></component>
        <span v-if="showLabel">{{ name }}</span>
      </div>
      <div
        v-if="dataClose && !iconSlut"
        class="icons"
        :class="{ opened: showChildren }"
      ></div>
      <div
        v-if="dataClose && iconSlut"
        class="openAnima"
        :class="{ open: showChildren }"
      >
        <!-- <component :class="'ss'" :is="iconSlut"> </component> -->
          <component v-if="iconSlut" :icon="icon" :is="iconSlut"> </component>
        <!-- <slot class="'ss'" name="icons">
        </slot> -->
      </div>
    </div>
    <div
      class="items-container menuOpenAnimation"
      :class="{ 'small-menu': smallMenu }"
      :style="{ maxHeight: containerHeight }"
      ref="container"
    >
     <div v-if="renderChildren">
       <menu-item
        :class="{ opened: showChildren }"
        v-for="(item, index) in data"
        :key="index"
        :data="item.children"
        :name="item.name"
        :icon="item.icon"
        :depth="depth + 1"
        :smallMenu="smallMenu"
        :close="closeChild"
      />
     </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, inject, provide, reactive, toRefs, watch, nextTick } from 'vue'
import MenuItemIconVue from './MenuItemIcon.vue'

export default {
  name: 'menu-item',
  components: { MenuItemIconVue },
  data: () => ({
    showChildren: false,
    expanded: false,
    containerHeight: '0px',
    closeChild: false,
    iconOpen: false,
    menuTimeout: null,
    renderTimeOut: null,
    renderChild:false,
    renderChildren:false
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
    }
  },
  watch: {
    close() {
      this.closeChildren()
    }
  },
  mounted() {
    //console.log(this.showChildren)
    // this.$refs.divtest.addEventListener('transitionend', () => {
    //     	console.log("transition end")
    //       //this.containerHeight = 'fit-content'
    //     })
  },
  onErrorCaptured() {
    console.log('error')
  },

  computed: {
    showLabel() {
      return this.smallMenu ? this.depth > 0 : true
    },
    dataClose() {
      return this.data
    },
    heifth() {
      return this.showChildren ? this.containerHeight + 'px' : '0px'
      //  return this.showChildren ? this.$refs['container']?.scrollHeight +'px' : '0px'
    },
    data2(){
      return this.expanded ? this.data :[]
    }
  },
  setup(props, context) {
    const foo = inject('getSlotByName')
    let iconSlut = foo('icons')
    let menuitemion = foo('menuitemion')
    //console.log(iconSlut)
    return { iconSlut,menuitemion }
  },
  methods: {
    closeChildren() {
      if (this.close) {
         this.closeChild = true
         this.expanded = false
         this.showChildren = false
         this.containerHeight = this.$refs['container']?.scrollHeight + 'px'
        setTimeout(() => {
          //this line must be pushed to top of call stack
          this.containerHeight = '0px'
        }, 0)
      } else {
        //  this.closeChild = false
      }
    },
    toggleMenu() {
      clearTimeout(this.menuTimeout)
      clearTimeout(this.renderTimeOut)
      this.expanded = !this.expanded
      this.showChildren = !this.showChildren
      this.closeChild = !this.expanded
      if (this.showChildren) {
        this.renderChildren = true
        this.containerHeight = this.data.length * 35 + 'px'
        this.menuTimeout = setTimeout(() => {
          this.containerHeight = 'fit-content'
        }, 250)
      } else {
        this.containerHeight = this.$refs['container']?.scrollHeight + 'px'
        setTimeout(() => {
          //this line must be pushed to top of call stack
          this.containerHeight = '0px'
        }, 0)
       this.renderTimeOut= setTimeout(() => {
          //console.log("stop render")
          this.renderChildren = false
        }, 250);
      }
    }
   
  }
}
</script>

<style lang="scss" scoped>
@import '../scss/menu-item.scss'; // .menu-item {
</style>
