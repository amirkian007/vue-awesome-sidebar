import { ref, computed, inject, watch, provide, reactive, toRefs } from 'vue'
//import { useRoute } from 'vue-router';

export const initAwsomeRouter = (props: any, context: any) => {
  const { autoCollapse, collapsed, relative, width, widthCollapsed, rtl } =
    toRefs(props)
  const currentRoute = ref(window.location)
  // const route = useRoute();
  // watch(route, (to) => {
  //   currentRoute.value = {...window.location}
  // }, {flush: 'pre', immediate: true, deep: true})
  // let previousUrl = "/";

  // const observer = new MutationObserver(() => {
  //   console.log(window.location.href)
  //   if (window.location.href !== previousUrl) {
  //     console.log(`URL changed from ${previousUrl} to ${window.location.href}`);
  //     previousUrl = window.location.href;
  //     // do your thing
  //   }
  // });
  // const config = { subtree: true, childList: true };

  // // start observing change
  // observer.observe(document, config);

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

  const updateCurrentRoute = (val: boolean) => {
    currentRoute.value = { ...val }
  }
  const updateSlots = (val: any) => {
    slots.value = val
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
