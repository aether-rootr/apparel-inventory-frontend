<template>
  <div style="margin-left: 15px; margin-right: 5px">
    <stock-card @emitinit="emitinit"/>
    <out-stock-data-table ref="OutStockDataTable"/>
  </div>
</template>

<script>
import StockCard from '../components/out-stock-card.vue'
import OutStockDataTable from '../components/out-stock-data-table.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    StockCard,
    OutStockDataTable,
  },
  methods: {
    emitinit() {
      console.log('pass');
      this.$refs.OutStockDataTable.init();
    },
  }
})
</script>