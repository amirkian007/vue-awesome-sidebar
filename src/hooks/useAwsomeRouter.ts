import { ref, computed, inject, provide, reactive, toRefs } from 'vue'

export const initAwsomeSideBar = (props: any, context: any) => {
  const { autoCollapse, collapsed, relative, width, widthCollapsed, rtl } =
    toRefs(props)
  const isCollapsed = ref(collapsed.value)
  const slots = ref(context.slots)
  const currentRoute = ref(
    window.location.pathname + window.location.search + window.location.hash
  )

  function isSameUrl(url, location = currentRoute) {
    location = location || document.location
    var match = url.match(
      /^([^:\/?#]+:)?(?:\/\/([^\/?#]+))?([^?#]+)?(\?[^#]*)?(#.*)?/
    )
    if (
      typeof match[1] === 'string' &&
      match[1].length > 0 &&
      match[1].toLowerCase() !== location.protocol
    )
      return false
    if (
      typeof match[2] === 'string' &&
      match[2].length > 0 &&
      match[2].replace(
        new RegExp(
          ':(' + { 'http:': 80, 'https:': 443 }[location.protocol] + ')?$'
        ),
        ''
      ) !== location.host
    )
      return false
    if (
      typeof match[3] === 'string' &&
      match[3].length > 0 &&
      match[3] !== location.pathname
    )
      return false
    if (
      typeof match[4] === 'string' &&
      match[4].length > 0 &&
      match[4] !== location.search
    )
      return false
    if (
      typeof match[5] === 'string' &&
      match[5].length > 0 &&
      match[5] !== location.hash
    )
      return false
    return true
  }
  function extractChildrenRoutes(obj, keyToFind) {
    return Object.entries(obj).reduce(
      (acc, [key, value]) =>
        key === keyToFind
          ? acc.concat(value)
          : typeof value === 'object'
          ? acc.concat(findAllByKey(value, keyToFind))
          : acc,
      []
    )
  }
  //  if(autoCollapse.value){
  //  }

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
    isSameUrl,
    extractChildrenRoutes
  }
}
