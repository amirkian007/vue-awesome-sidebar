import { onBeforeUnmount, onMounted, watch } from 'vue'

export function useClickOutSide(target: any, callBack: any, isCollapsed: any) {
  if (!target) return

  const listner = (event: any) => {
    if (isCollapsed.value) {
      removeSideBarListner()
      return
    }
    if (
      event.target == target.value ||
      event.composedPath().includes(target.value)
    ) {
      return
    }
    callBack()
  }
  const removeSideBarListner = () => {
    window.removeEventListener('click', listner)
  }
  const addSideBarListner = () => {
    removeSideBarListner()
    setTimeout(() => {
      //push this to the end of call stack
      window.addEventListener('click', listner)
    }, 0)
  }

  onBeforeUnmount(removeSideBarListner)

  return { removeSideBarListner, addSideBarListner }
}
