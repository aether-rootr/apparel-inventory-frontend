<template>
  <n-space>
    <n-button type="success" @click="AddCargo">增加货物</n-button>
    <n-button type="warning" @click="DeleteCargo">删除所选货物</n-button>
  </n-space>
  <perfect-scrollbar>
  <n-data-table 
    ref="table"
    :columns="columns" 
    :data="data" 
    :pagination="pagination"
    :row-key="row => row.id"
    @update:checked-row-keys="handleCheck" 
  />
  </perfect-scrollbar>

  <n-modal
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="增加货物"
    positive-text="确认"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
    negative-text="算了"
  >
    <n-form
      inline
      :label-width="80"
      :model="formValue"
      :rules="rules"
      :size="size"
      ref="formRef"
    >
      <n-form-item label="货物名称">
        <n-input v-model:value="insertcargo.name" placeholder="输入货物名" />
        <n-input v-model:value="insertcargo.type" placeholder="输入货物规格" />
        <n-input v-model:value="insertcargo.manufacturer" placeholder="输入生产厂家" />
      </n-form-item>
    </n-form>
  </n-modal>
</template>

<script>
  import { defineComponent } from 'vue'
  import {
    NButton,
    useMessage,
    NDataTable,
    NSpace,
    NModal,
    NInput
  } from 'naive-ui'
  import axios from 'axios'
  import {PerfectScrollbar} from 'vue3-perfect-scrollbar'

  const createColumns = () => {
    return [
      {
        type: 'selection'
      },
      {
        title: '货物编号',
        key: 'id'
      },
      {
        title: '货物名称',
        key: 'name'
      },
      {
        title: '货物规格',
        key: 'type'
      },
      {
        title: '生产厂家',
        key: 'manufacturer'
      },
      {
        title: '货物库存数量',
        key: 'count'
      },
    ]
  }

  export default defineComponent({
    components: {
      NDataTable,
      NButton,
      NSpace,
      NModal,
      NInput,
      PerfectScrollbar
    },
    data () {
      const message = useMessage()
      return {
        data: [],
        pagination: {
          pageSize: 15
        },
        columns: createColumns(),
        checkedRowKeys: [],
        insertcargo:{
          name: ''
        },
        showModal: false,
        message,
      }
    },
    mounted(){
      this.createData();
    },
    methods: {
      createData() {
          const path = global.domain.uri + '/CargoManager/Get';
          let mess = {
            token: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
          }
          axios.post(path, mess)
            .then((res) => {
              if(res.data.state == "ok") {
                this.data = res.data.cargos;
                console.log(res.data.cargos);
              } else {
                this.message.error("请先登录");
                this.$router.push('/login')
              }
            })
            .catch((error) => {
              console.log(error);
              this.data = []
            })
      },
      handleCheck (rowKeys) {
        this.checkedRowKeys = rowKeys
      },
      DeleteCargo () {
        const path = global.domain.uri + '/CargoManager/Remove';
        let mess = {
          token: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
          cargos: this.checkedRowKeys
        };
        axios.post(path, mess)
          .then((res)=> {
            console.log(res.data);
            if(res.data.state == 'ok') {
              this.message.success('成功删除')
              this.showModal = false
            } else if(res.data.state == 'reject') {
              this.message.warning('你没有权限请联系管理员,或重新登录');
            } else if(res.data.state == 'error'){
              this.message.warning('未能成功删除全部货物,默认保留全部库存非零货物')
              this.showModal = false
            } else {
              this.message.error("请先登录");
              this.$router.push('/login')
            }
            this.createData();
          })
          .catch((error) => {
            console.log(error)
            this.message.error('网络错误')
          })
      },
      AddCargo() {
        this.showModal = true;
      },
      onNegativeClick () {
        this.message.info('取消')
        this.showModal = false
      },
      onPositiveClick () {
        const path = global.domain.uri + '/CargoManager/Add';
        let mess = {
          token: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
          name: this.insertcargo.name,
          type: this.insertcargo.type,
          manufacturer: this.insertcargo.manufacturer
        }

        axios.post(path, mess)
          .then((res) => {
            if(res.data.state == 'ok') {
              this.message.success('成功添加')
              this.showModal = false
            } else if(res.data.state == 'reject') {
              this.message.warning('你没有权限请联系管理员,或重新登录');
            } else if(res.data.state == 'error') {
              this.message.warning('该货物已存在')
              this.showModal = false
            } else {
              this.message.error("请先登录");
              this.$router.push('/login')
            }
            this.createData();
          })
          .catch((error) => {
            console.log(error)
            this.message.error('网络错误')
            this.showModal = false
          })
      }
    }
  })
</script>

<style src="vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css"></style>
<style>
.ps {
  max-height: calc(75vh);
}
</style>