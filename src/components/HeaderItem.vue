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
  <div class="vsss-header" v-else>
    {{ data.header + 'kir' }}
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>
