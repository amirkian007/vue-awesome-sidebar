<template>
  <div class="menu-item2" :class="{ opened: expanded }">

    <div
      class="label "
      :class="{ icooons: dataClose ,opened: expanded }"
      @click="toggleMenu()"
      
    >
      <div class="left">
        <i class="material-icons-outlined">
          {{icon}}
        </i>
        <span v-if="showLabel">{{ name }}</span>
      </div>
      <!-- <div v-if="data" class="right ">
        <a class="icons" :class="{ opened: expanded }"></a >
      </div> -->
    </div>
    <div
      v-show="showChildren"
      class="items-container"
      :class="{ 'small-menu': smallMenu }"
      :style="{ height: containerHeight }"
      ref="container"
    >
    <!-- <div
      v-show="showChildren"
      :class="{ 'small-menu': smallMenu }"
      class="items-container"
      :style="{ height: containerHeight }"
      ref="container"
    > -->
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
</template>

<script>
export default {
  name: 'menu-item',
  data: () => ({
    showChildren: false,
    expanded: false,
    containerHeight: 0,
    closeChild:false
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
      type: String
    },
    depth: {
      type: Number
    },
    smallMenu: {
      type: Boolean
    }
  },
  watch:{
    close(){
      this.closeChildren()
    }
  },
  
  computed: {
    showLabel() {
      return this.smallMenu ? this.depth > 0 : true
    },
    dataClose(){
      return this.data
    }
    ,
    expandClose(){
      return this.expanded
    }
  },
  methods: {
    closeChildren(){
      if(this.close){
        this.expanded = false
        this.closeChild = true
        this.showChildren = false
        this.closeMenu()
      }else{
        this.closeChild = false
      }
    },
    toggleMenu() {
      this.closeChild = !this.closeChild
      this.expanded = !this.expanded
      if (!this.showChildren) {
        this.openChildrenMenu()
      } else {
        this.closeMenu()
      }
    },
    closeMenu(){
      this.containerHeight = this.$refs['container'].scrollHeight + 'px'
        this.$refs['container'].style.overflow = 'hidden'
        setTimeout(() => {
          this.containerHeight = 0 + 'px'
        }, 10)
        setTimeout(() => {
          this.showChildren = false
        }, 300)
    },
    openChildrenMenu(){
      this.showChildren = true
        this.$nextTick(() => {
          this.containerHeight = this.$refs['container'].scrollHeight + 'px'
          setTimeout(() => {
            this.containerHeight = 'fit-content'
            if (navigator.userAgent.indexOf('Firefox') != -1)
              this.containerHeight = '-moz-max-content'
            this.$refs['container'].style.overflow = 'visible'
          }, 300)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.icooons::after {
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24"><path fill="rgba(0,0,0,0.5)" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path></svg>') 50%/2rem 2rem;
  content: "";
  -webkit-filter: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24"><path fill="rgba(0,0,0,0.5)" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path></svg>');
  filter: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24"><path fill="rgba(0,0,0,0.5)" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"></path></svg>');
  height: 1.25rem;
  margin-left: auto;
  min-width: 1.25rem;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
  transition: -webkit-transform 200ms linear;
  transition: transform 200ms linear;
  transition: transform 200ms linear,-webkit-transform 200ms linear;
  
  width: 1.25rem;
}
.icooons.opened::after {
  -webkit-transform: rotate(180deg) !important;
  transform: rotate(180deg) !important;
}
.menu-item2{
  width: 97%;
  float: right;
  //background-color: rgb(230, 230, 230);
  align-self: center;
  margin-top:3px;
  border-radius:4px;
  position: relative;
  
  // padding:12px 16px
  // text-decoration-color:
   .label {
    flex-direction: row;
    justify-content: space-between;
    white-space: nowrap;
    padding:6px 12px;
    width: 100%;
    border-radius:4px;
    display: flex;
    height: 32px;
    align-items: center;
    user-select: none;
    box-sizing: border-box;
    transition: all 0.3s ease;
    font-family:"Inter";
    font-size: 16px;
    font-weight: 400;
    color:#363636;
    > div {
      display: flex;
      align-items: center;
    }
    
    &:hover {
      background:rgb(230, 230, 230);
      cursor: pointer;
    }
   }
   i{
    font-size: 20px;
   }
   .left{
     display: flex;
     justify-content: center;
     align-items: center;
     
     span{
      padding-left:8px;
      padding-bottom: 1.5px;
     }
   }
   .items-container {
    width: 100%;
    left: calc(100% + 6px);
    transition: height 0.3s ease;
    overflow: hidden;
    &.small-menu {
      width: fit-content;
      position: absolute;
      background: #fff;
      box-shadow: 0 0 10px #ebebeb;
      top: 0;
      .label {
        width: 100% !important;
        padding-left: 20px !important;
      }
    }
  }
  
}



.menu-item {
  position: relative;
  width: 100%;
  .label {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    white-space: nowrap;
    user-select: none;
    height: 50px;
    padding: 0 20px;
    box-sizing: border-box;
    font-size: 14px;
    color: #6a6a6a;
    transition: all 0.3s ease;
    > div {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    i {
      font-size: 20px;
      color: #6e6e6e;
      transition: all 0.3s ease;
      &.expand {
        font-size: 16px;
        color: #cacaca;
        &.opened {
          transform: rotate(180deg);
        }
      }
    }
    &.small-item {
      width: fit-content;
    }
    &:hover {
      background: #deedff;
      cursor: pointer;
    }
  }
  .items-container {
    width: 100%;
    left: calc(100% + 6px);
    transition: height 0.3s ease;
    overflow: hidden;
    float: right;
    &.small-menu {
      width: fit-content;
      position: absolute;
      background: #fff;
      box-shadow: 0 0 10px #ebebeb;
      top: 0;
      .label {
        width: 100% !important;
        padding-left: 20px !important;
      }
    }
  }
}
</style>
