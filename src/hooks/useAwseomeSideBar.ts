import {
  ref,
  computed,
  inject,
  provide,
  onMounted,
  reactive,
  toRefs
} from 'vue'

export const initAwsomeSideBar = (props: any, context: any) => {
  //const { collapsed, miniMenu, direction } = toRefs(props)

  const {
    menu,
    menuType,
    collapsed,
    miniMenu,
    animationDuration,
    direction,
    width,
    widthMiniMenu,
    removeIconSpace,
    closeOnClickOutSide,
    overLayerOnOpen,
    overLayerColor,
    openAnimation,
    position,
    collapseBreakPoint,
    dark,
    rtl
  } = toRefs(props)
  const isCollapsed = ref(collapsed.value)
  const slots = ref(context.slots)
  const menuMounted = ref(false)
  const MenuScroll = ref(false)
  const MenuHover = ref(false)
  const CurrantItemHover = ref(null)
  const CurranContainerHover = ref(null)

  const getSlotByName = (slotName: any) => {
    return context.slots.hasOwnProperty(slotName)
      ? context.slots[slotName]
      : null
  }

  const updateIsCollapsed = (val: boolean) => {
    isCollapsed.value = val
  }
  const updateMenuScroll = () => {
    MenuScroll.value = !MenuScroll.value
  }
  const updateMenuHover = (val: any) => {
    MenuHover.value = val
  }
  const updateCurrantItemHover = (id: any) => {
    CurrantItemHover.value = id
  }
  const updateCurranContainerHover = (id: any) => {
    CurranContainerHover.value = id
  }
  const menuDirection = computed(() => {
    return direction.value === 'rtl' ? 'right' : 'left'
  })
  const menuDirection2 = computed(() => {
    return rtl.value ? 'right' : 'left'
  })
  const emitOnItemClick = (item: any) => {
    context.emit('item-click', item)
  }
  let userAgentHeight =
    navigator.userAgent.indexOf('Firefox') != -1
      ? '-moz-max-content'
      : 'fit-content'

  let id = 3

  const getRandomUid = () => {
    return id++
  }

  onMounted(() => {
    menuMounted.value = true
  })

  provide('sidebarProps', {
    menu,
    menuType,
    collapsed,
    miniMenu,
    animationDuration,
    direction,
    width,
    widthMiniMenu,
    removeIconSpace,
    closeOnClickOutSide,
    overLayerOnOpen,
    overLayerColor,
    openAnimation,
    position,
    collapseBreakPoint,
    dark,
    rtl
  })
  provide('getSlotByName', getSlotByName)
  provide('browserAgent', userAgentHeight)
  provide('menuMounted', menuMounted)
  provide('miniMenu', miniMenu)
  provide('MenuScroll', MenuScroll)
  provide('MenuHover', MenuHover)
  provide('getRandomUid', getRandomUid)
  provide('updateCurrantItemHover', updateCurrantItemHover)
  provide('updateCurranContainerHover', updateCurranContainerHover)
  provide('CurrantItemHover', CurrantItemHover)
  provide('CurranContainerHover', CurranContainerHover)
  provide('getIsCollapsed', collapsed)
  provide('menuDirection', menuDirection)
  provide('emitOnItemClick', emitOnItemClick)
  return {
    getIsCollapsed: collapsed,
    getIsminiMenu: miniMenu,
    updateIsCollapsed,
    getSlotByName,
    menuMounted,
    updateMenuScroll,
    updateMenuHover,
    menuDirection
  }
}
