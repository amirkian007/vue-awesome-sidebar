import { onBeforeUnmount, ref, onMounted, watch } from 'vue'

export function useAwsemoeItem(target: any, callBack: any, isCollapsed: any) {
  const currentRoute = ref(
    window.location.pathname + window.location.search + window.location.hash
  )

  const itemShow = ref(false)
  const itemHover = ref(false)
}
