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
    negative-text="取消"
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
        <n-a>货物名称</n-a>
        <n-input v-model:value="insertcargo.name" placeholder="输入货物名" />
      </n-form-item>

      <n-form-item label="货物颜色">
        <n-a>货物颜色</n-a>
        <n-input v-model:value="insertcargo.color" placeholder="输入货物颜色" />
      </n-form-item>

      <n-form-item label="货物材质">
        <n-a>货物材质</n-a>
        <n-input v-model:value="insertcargo.material" placeholder="输入货物材质" />
      </n-form-item>

      <n-form-item label="货物尺寸">
        <n-a>货物尺寸</n-a>
        <n-input v-model:value="insertcargo.size" placeholder="输入货物尺寸" />
      </n-form-item>

      <n-form-item label="出厂价格">
        <n-a>出厂价格</n-a>
        <n-input v-model:value="insertcargo.exfactoryprice" placeholder="输入出厂价格" />
      </n-form-item>

      <n-form-item label="零售价格">
        <n-a>零售价格</n-a>
        <n-input v-model:value="insertcargo.retailprice" placeholder="输入零售价格" />
      </n-form-item>

      <n-form-item label="生产厂家">
        <n-a>生产厂家</n-a>
        <n-input v-model:value="insertcargo.manufacturer" placeholder="输入生产厂家" />
      </n-form-item>
    </n-form>
  </n-modal>

  <n-modal
    v-model:show="showChange"
    :mask-closable="false"
    preset="dialog"
    title="修改信息"
    positive-text="确认"
    @positive-click="changeonPositiveClick"
    @negative-click="changeonNegativeClick"
    negative-text="取消"
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
        <n-a>货物名称</n-a>
        <n-input v-model:value="changecargo.name" placeholder="输入货物名" />
      </n-form-item>

      <n-form-item label="货物颜色">
        <n-a>货物颜色</n-a>
        <n-input v-model:value="changecargo.color" placeholder="输入货物颜色" />
      </n-form-item>

      <n-form-item label="货物材质">
        <n-a>货物材质</n-a>
        <n-input v-model:value="changecargo.material" placeholder="输入货物材质" />
      </n-form-item>

      <n-form-item label="货物尺寸">
        <n-a>货物尺寸</n-a>
        <n-input v-model:value="changecargo.size" placeholder="输入货物尺寸" />
      </n-form-item>

      <n-form-item label="出厂价格">
        <n-a>出厂价格</n-a>
        <n-input v-model:value="changecargo.exfactoryprice" placeholder="输入出厂价格" />
      </n-form-item>

      <n-form-item label="零售价格">
        <n-a>零售价格</n-a>
        <n-input v-model:value="changecargo.retailprice" placeholder="输入零售价格" />
      </n-form-item>

      <n-form-item label="生产厂家">
        <n-a>生产厂家</n-a>
        <n-input v-model:value="changecargo.manufacturer" placeholder="输入生产厂家" />
      </n-form-item>

    </n-form>
  </n-modal>
</template>

<script>
  import { defineComponent,h,reactive } from 'vue'
  import {
    NButton,
    useMessage,
    NDataTable,
    NSpace,
    NModal,
    NInput,
    NA
  } from 'naive-ui'
  import axios from 'axios'
  import {PerfectScrollbar} from 'vue3-perfect-scrollbar'

  const createColumns = ({changeCargo}) => {
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
        title: '颜色',
        key: 'color'
      },
      {
        title: '材质',
        key: 'material'
      },
      {
        title: '尺寸',
        key: 'size'
      },
      {
        title: '出厂价格',
        key: 'exfactoryprice'
      },
      {
        title: '零售价格',
        key: 'retailprice'
      },
      {
        title: '生产厂家',
        key: 'manufacturer'
      },
      {
        title: '货物库存数量',
        key: 'count'
      },
      {
        title: '操作',
        key: 'actions',
        render (row) {
          return h(
            NButton,
              {
                type: "primary",
                onClick: () => changeCargo(row)
              },
              <p>修改信息</p>
          )
        }
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
      PerfectScrollbar,
      NA
    },
    data () {
      const message = useMessage();
      let showChange = reactive(false);
      let nowrow = reactive({});
      return {
        data: [],
        pagination: {
          pageSize: 15
        },
        nowrow,
        showChange,
        columns: [],
        checkedRowKeys: [],
        insertcargo:{},
        changecargo:{},
        showModal: false,
        message,
      }
    },
    mounted(){
      this.init();
      this.createData();
    },
    methods: {
      init() {
        let changeCargo = (rowData) => {
            this.nowrow = rowData;
            this.showChange = true;
            this.changecargo.name = rowData.name;
            this.changecargo.color = rowData.color;
            this.changecargo.material = rowData.material;
            this.changecargo.size = rowData.size;
            this.changecargo.exfactoryprice = rowData.exfactoryprice;
            this.changecargo.retailprice = rowData.retailprice;
            this.changecargo.manufacturer = rowData.manufacturer;
          }

        this.columns = createColumns({
          changeCargo
        })
      },
      createData() {
          const path = global.domain.uri + '/CargoManager/Get';
          let mess = {
            token: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
          }
          axios.post(path, mess)
            .then((res) => {
              if(res.data.state == "ok") {
                this.data = res.data.cargos;
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
          color: this.insertcargo.color,
          material: this.insertcargo.material,
          size: this.insertcargo.size,
          exfactoryprice: this.insertcargo.exfactoryprice,
          retailprice: this.insertcargo.retailprice,
          manufacturer: this.insertcargo.manufacturer
        }

        if(
          mess.name.length == 0 ||
          mess.color.length == 0 ||
          mess.material.length == 0 ||
          mess.size.length == 0 ||
          mess.exfactoryprice.length == 0 ||
          mess.retailprice.length == 0 ||
          mess.manufacturer.length == 0
          ) {
            this.message.warning('存在未填项无法提交');
            return;
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
      },

      changeonNegativeClick () {
        this.message.info('取消')
        this.showChange = false
      },
      changeonPositiveClick () {
        const path = global.domain.uri + '/CargoManager/Update';
        let mess = {
          token: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
          id: this.nowrow.id,
          name: this.changecargo.name,
          color: this.changecargo.color,
          material: this.changecargo.material,
          size: this.changecargo.size,
          exfactoryprice: this.changecargo.exfactoryprice,
          retailprice: this.changecargo.retailprice,
          manufacturer: this.changecargo.manufacturer
        }

        if(
          mess.name.length == 0 ||
          mess.color.length == 0 ||
          mess.material.length == 0 ||
          mess.size.length == 0 ||
          mess.exfactoryprice.length == 0 ||
          mess.retailprice.length == 0 ||
          mess.manufacturer.length == 0
          ) {
            this.message.warning('存在未填项无法提交');
            return;
          }

        axios.post(path, mess)
          .then((res) => {
            if(res.data.state == 'ok') {
              this.message.success('成功修改')
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