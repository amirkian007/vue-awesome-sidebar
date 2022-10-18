<script setup>
import { inject } from 'vue'
const getSlots = inject('getSlotByName')

const headerSlot = getSlots('headerItem')
</script>

<template>
  <component
    v-if="headerSlot"
    :is="headerSlot"
    :header="data.header"
  ></component>
  <div class="vsss-header" :class="icon?.class ? icon?.class : ''" v-bind="data?.attributes" v-else>
    {{ data.header }}
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>
