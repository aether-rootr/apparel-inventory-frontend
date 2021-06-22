<template>
  <div style="margin-left: 15px; margin-right: 5px">
    <stock-card/>
  </div>
</template>

<script>
import StockCard from '../components/out-stock-card.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    StockCard
  },
  setup() {
    
  },
})
</script>