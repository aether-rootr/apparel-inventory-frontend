<template>
  <n-thing style="margin-left: 15px; margin-right: 5px">
    <cargo-table/>
  </n-thing>
</template>

<script>
import { defineComponent } from 'vue'
import CargoTable from '../components/cargo-table.vue'
import {NThing} from 'naive-ui'

export default defineComponent({
  components: {
    CargoTable,
    NThing,
  },
  setup() {
    
  },
})
</script>
