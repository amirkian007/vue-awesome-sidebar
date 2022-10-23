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
  const {
    menu,
    menuType,
    miniMenu: miniMenuProp,
    collapsed,
    animationDuration,
    width,
    widthMiniMenu,
    removeIconSpace,
    closeOnClickOutSide,
    overLayerOnOpen,
    childrenOpenAnimation,
    position,
    collapseBreakPoint,
    dark,
    vueRouterEnabel,
    keepChildrenOpen,
    checkButtonActive,
    ChildrenOpenActiveRoute,
    rtl
  } = toRefs(props)
  const isCollapsed = ref(collapsed.value)
  const slots = ref(context.slots)
  const menuMounted = ref(false)
  const MenuScroll = ref(false)
  const miniMenu = ref(miniMenuProp.value)
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
    return rtl.value ? 'right' : 'left'
  })
  const emitOut = (event: any, item: any) => {
    context.emit(event, item)
  }
  const updateminiMenu = (val: boolean) => {
    miniMenu.value = val
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
    collapsed: isCollapsed,
    miniMenu,
    animationDuration,
    width,
    widthMiniMenu,
    removeIconSpace,
    closeOnClickOutSide,
    overLayerOnOpen,
    childrenOpenAnimation,
    position,
    collapseBreakPoint,
    vueRouterEnabel,
    checkButtonActive,
    ChildrenOpenActiveRoute,
    keepChildrenOpen,
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
  provide('menuDirection', menuDirection)
  provide('emitOut', emitOut)
  return {
    getIsCollapsed: isCollapsed,
    getIsminiMenu: miniMenu,
    updateIsCollapsed,
    getSlotByName,
    updateminiMenu,
    menuMounted,
    updateMenuScroll,
    updateMenuHover,
    menuDirection
  }
}
