import { onBeforeUnmount, ref, onMounted, watch } from 'vue'

export function useAwsemoeItem(target: any, callBack: any, isCollapsed: any) {
  const currentRoute = ref(
    window.location.pathname + window.location.search + window.location.hash
  )

  function isSameUrl(url, location=currentRoute) {
    location = location || document.location;
    var match = url.match(/^([^:\/?#]+:)?(?:\/\/([^\/?#]+))?([^?#]+)?(\?[^#]*)?(#.*)?/);
    if (typeof match[1] === "string" && match[1].length > 0 && match[1].toLowerCase() !== location.protocol) return false;
    if (typeof match[2] === "string" && match[2].length > 0 && match[2].replace(new RegExp(":("+{"http:":80,"https:":443}[location.protocol]+")?$"),"") !== location.host) return false;
    if (typeof match[3] === "string" && match[3].length > 0 && match[3] !== location.pathname) return false;
    if (typeof match[4] === "string" && match[4].length > 0 && match[4] !== location.search) return false;
    if (typeof match[5] === "string" && match[5].length > 0 && match[5] !== location.hash) return false;
    return true;
}
  const itemShow = ref(false)
  const itemHover = ref(false)
  return {isSameUrl}
}
