<template>
  <perfect-scrollbar style="max-height: calc(70vh);">
    <n-data-table :columns="columns" :data="data" :pagination="pagination" />
  </perfect-scrollbar>

  <n-modal 
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="备注"
    positive-text="提交更改"
    negative-text="关闭"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
    style="width: 1000px"
  >
  <n-input type="textarea" placeholder="备注"  v-model:value="nowrow.remarks" round clearable />
  </n-modal>
</template>

<script>
  import { h, defineComponent,reactive } from 'vue'
  import {
    NButton,
    NDataTable,
    useMessage,
    NInput,
    NModal
  } from 'naive-ui'
  import CargoShowTable from './cargo-show-table.vue'
  import axios from 'axios'
  import {PerfectScrollbar} from 'vue3-perfect-scrollbar'

  const createColumns = ({_open}) => {
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
      },
      {
        title: '备注',
        key: 'remarks',
        render (row) {
          return h(
            NButton,
            {
              size: "small",
              onClick: () => _open(row)
            },
            <p>显示并编辑</p>
          )
        }
      }
    ]
  }

  export default defineComponent({
    components: {
      NDataTable,
      PerfectScrollbar,
      NInput,
      NModal
    },
    props:{
      _path: String
    },
    data () {
      const message = useMessage();
      return {
        domain: global.domain.uri,
        data: reactive([]),
        columns: reactive([]),
        pagination: {
          pageSize: 10
        },
        message,
        showModal: reactive(false),
        nowrow: reactive({})
      }
    },
    mounted() {
      this.initFrom();
      this.init();
    },
    methods: {
      initFrom() {

        let _open = (rowData) => {
          this.nowrow = rowData;
          this.showModal = true;
        }

        this.columns = createColumns({
          _open
        });
      },
      init() {
        const path = this.domain + '/StockManager/GetInStock';
        let mess = {
          token: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
        }
        axios.post(path, mess)
          .then((res) => {
              if (res.data.state == 'ok') {
                this.data = res.data.stocks;
                for(let i = 0; i < this.data.length; i += 1){
                  this.data[i].key = i;
                }
              } else {
                this.message.error("请先登录");
                this.$router.push('/login')
              }
          })
          .catch((error) => {
            console.log(error);
            this.message.error('网络错误');
          })
      },
      onPositiveClick() {
        const path = this.domain + '/StockManager/UpdateInStock';
        let mess = {
          token: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
          id: this.nowrow.id,
          remarks: this.nowrow.remarks
        }
        
        axios.post(path, mess)
          .then((res) => {
            if(res.data.state == 'ok') {
              this.message.success("修改成功");
            } else {
              this.message.error("请先登录");
              this.$router.push('/login')
            }
          })
          .catch((error) => {
            console.log(error);
            this.message.error('网络错误');
          })
      },
      onNegativeClick() {
        this.showModal = false;
      }
    }
  })
</script>

<style src="vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css"></style>