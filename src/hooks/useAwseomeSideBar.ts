import { ref, computed, inject, provide, reactive, toRefs } from 'vue'

export const initAwsomeSideBar = (props, context) => {
    const {autoCollapse, collapsed, relative, width, widthCollapsed, rtl } = toRefs(props)
    const isCollapsed = ref(collapsed.value)
    const currentRoute = ref(window.location.pathname + window.location.search + window.location.hash)

 
//  if(autoCollapse.value){
//  }

 const updateIsCollapsed =(val:boolean)=>{
    isCollapsed.value = val
 }

 const updateCurrentRoute = () => {
    currentRoute.value = window.location.pathname + window.location.search + window.location.hash
}

  const onItemClick = (event, item) => {
    context.emit('item-click', event, item)
  }
  return {
    getIsCollapsed: isCollapsed,
    updateIsCollapsed,
  }

}