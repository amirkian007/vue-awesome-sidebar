import { ref, computed, inject, provide, reactive, toRefs } from 'vue'

export const initAwsomeRouter = (props: any, context: any) => {
  const { autoCollapse, collapsed, relative, width, widthCollapsed, rtl } =
    toRefs(props)
  const currentRoute = ref(window.location)
  window.addEventListener('hashchange', function () {
    currentRoute.value = window.location
    //console.log( window.location.pathname + window.location.search + window.location.hash)
  })

  function isSameUrl(url, location = currentRoute.value) {
    var path = function (s) {
      return s.replace(/\?.*$/, '').replace(/\#.*$/, '')
    }
    return (
      path(location.href) == url ||
      path(location.pathname + location.hash) == url ||
      location.hash == url
    )
  }
  function extractChildrenRoutes(obj, keyToFind) {
    if (!obj) return
    return Object.entries(obj).reduce(
      (acc, [key, value]) =>
        key === keyToFind
          ? acc.concat(value)
          : typeof value === 'object'
          ? acc.concat(extractChildrenRoutes(value, keyToFind))
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

  provide('currentRoute', currentRoute)
  provide('isSameUrl', isSameUrl)
  provide('extractChildrenRoutes', extractChildrenRoutes)
  return {
    isSameUrl,
    extractChildrenRoutes,
    currentRoute
  }
}
