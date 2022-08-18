import { ref, computed, inject, provide, reactive, toRefs } from 'vue'

export const initAwsomeSideBar = (props: any, context: any) => {
  const { autoCollapse, collapsed, relative, width, widthCollapsed, rtl } =
    toRefs(props)
  const isCollapsed = ref(collapsed.value)
  const slots = ref(context.slots)
  const currentRoute = ref(
    window.location.pathname + window.location.search + window.location.hash
  )

  //  if(autoCollapse.value){
  //  }

  const getSlotByName = (slotName: any) => {
    return context.slots.hasOwnProperty(slotName)
      ? context.slots[slotName]
      : null
  }

  const updateIsCollapsed = (val: boolean) => {
    isCollapsed.value = val
  }
  const updateSlots = (val: any) => {
    slots.value = val
  }

  const updateCurrentRoute = () => {
    currentRoute.value =
      window.location.pathname + window.location.search + window.location.hash
  }

  //   const onItemClick = (event, item) => {
  //     context.emit('item-click', event, item)
  //   }
  let userAgentHeight =
    navigator.userAgent.indexOf('Firefox') != -1
      ? '-moz-max-content'
      : 'fit-content'

  provide('sidebarProps', props)
  provide('getSlotByName', getSlotByName)
  provide('browserAgent', userAgentHeight)
  return {
    getIsCollapsed: isCollapsed,
    updateIsCollapsed,
    getSlotByName
  }
}
