<template>
  <perfect-scrollbar style="max-height: calc(70vh);">
    <n-data-table :columns="columns" :data="data" :pagination="pagination" />
  </perfect-scrollbar>
</template>

<script>
  import { h, defineComponent } from 'vue'
  import {
    NDataTable,
    useMessage
  } from 'naive-ui'
  import CargoShowTable from './cargo-show-table.vue'
  import axios from 'axios'
  import {PerfectScrollbar} from 'vue3-perfect-scrollbar'

  const createColumns = () => {
    return [
      {
        type: 'expand',
        renderExpand: (rowData) => {
          return h(
            CargoShowTable,
            {
              data: rowData.cargos
            }
          );
        }
      },
      {
        title: '单号',
        key: 'id'
      },
      {
        title: '时间',
        key: 'date'
      }
    ]
  }

  export default defineComponent({
    components: {
      NDataTable,
      PerfectScrollbar
    },
    data () {
      const message = useMessage();
      return {
        domain: global.domain.uri,
        data: [],
        columns: createColumns(),
        pagination: {
          pageSize: 10
        },
        message,
      }
    },
    mounted() {
      this.init();
    },
    methods: {
       init() {
        const path = this.domain + '/StockManager/GetInStock';
        axios.get(path)
          .then((res) => {
              this.data = res.data;
              for(let i = 0; i < this.data.length; i += 1){
                this.data[i].key = i;
              }
          })
          .catch((error) => {
            console.log(error);
            this.message.error('网络错误');
          })
      }
    }
  })
</script>

<style src="vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css"></style>