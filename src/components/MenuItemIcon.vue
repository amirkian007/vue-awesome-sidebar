<template>
  <component
    :is="icon?.element ? icon.element : 'i'"
    class="material-icons-outlined"
    :class="
      typeof icon === 'string' || icon instanceof String ? icon : icon.class
    "
    aria-hidden="true"
    v-bind="icon.attributes"
  >
    {{ icon.text }}
  </component>
</template>

<script>
export default {
  name: 'MenuItemIcon',
  props: {
    icon: {
      type: [String, Object],
      default: ''
    }
  }
}
</script>
