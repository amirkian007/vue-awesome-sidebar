<template>
  <component
    :is="icon?.element ? icon.element : 'i'"
    class="menu-icon"
    :class="icon?.class ? icon?.class : ''"
    aria-hidden="true"
    v-bind="icon?.attributes"
  >
    {{ icon.text }}
  </component>
</template>

<script>
export default {
  name: 'MenuItemIcon',
  props: {
    icon: {
      default: ''
    }
  }
}
</script>
