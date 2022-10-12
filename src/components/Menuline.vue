<template>
  <component
    :is="data?.element ? data.element : 'hr'"
    class="vas-hr"
    :class="data?.class ? data?.class : ''"
    v-bind="data?.attributes"
  >
  </component>
</template>

<script>
export default {
  name: 'MenuHl',
  props: {
    data: {
      default: ''
    }
  }
}
</script>
