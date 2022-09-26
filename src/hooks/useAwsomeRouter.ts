import { ref, computed, inject, watch, provide, reactive, toRefs } from 'vue'
//import { useRoute } from 'vue-router';

export const initAwsomeRouter = (props: any, context: any) => {
  const { autoCollapse, collapsed, relative, width, widthCollapsed, rtl } =
    toRefs(props)
  const currentRoute = ref(window.location)

  function isSameUrl(url: any, location = currentRoute.value) {
    return (
      location.href === location.origin + url ||
      location.pathname + location.hash === url ||
      location.pathname + location.search === url ||
      location.href === url ||
      location.hash === url
    )
  }

  function extractChildrenRoutes(obj: any, keyToFind: any): any {
    if (!obj) return
    return Object.entries(obj).reduce(
      (acc: any, [key, value]: any) =>
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

  const updateCurrentRoute = (val: any) => {
    currentRoute.value = { ...val }
  }

  provide('currentRoute', currentRoute)
  provide('updateCurrentRoute', updateCurrentRoute)
  provide('isSameUrl', isSameUrl)
  provide('extractChildrenRoutes', extractChildrenRoutes)
  return {
    isSameUrl,
    extractChildrenRoutes,
    currentRoute,
    updateCurrentRoute
  }
}
