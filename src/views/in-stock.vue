<template>
  <div style="margin-left: 15px; margin-right: 5px">
    <stock-card @emitinit="emitinit"/>
    <in-stock-data-table :_path="p" ref="InStockDataTable" />
  </div>
</template>

<script>
import StockCard from '../components/in-stock-card.vue'
import InStockDataTable from '../components/in-stock-data-table.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    StockCard,
    InStockDataTable,
  },
  data() {
    return {
      p: "/StockManager/UpdateInStock"
    }
  },
  methods: {
    emitinit() {
      console.log('pass');
      this.$refs.InStockDataTable.init();
    },
  }
})
</script>
