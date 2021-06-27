<template>
  <n-button style="margin: 10px" @click="showModal = true">
      新增入库
  </n-button>
  <n-modal 
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="入库单"
    positive-text="提交"
    negative-text="取消"
    @positive-click="onPositiveClick"
    @negative-click="onNegativeClick"
    style="width: 1000px"
  >
    <perfect-scrollbar style="max-height: calc(60vh);">
      <n-dynamic-input
          v-model:value="customValue"
          :on-create="onCreate"
          #="{ value }"
        >
        <div style="width: 100%;">
          <div style="display: flex; align-items: center;">
            <n-form
              inline
              :label-width="80"
              :model="formValue"
              :rules="rules"
              :size="size"
              ref="formRef"
            >
            <n-form-item label="货物编号">
              <n-select
                v-model:value="value.id"
                placeholder="选择货物编号"
                filterable
                :options="options"
                @update:value="handleUpdateValue"
              />
            </n-form-item>
            <n-form-item label="货物名称(只读)">
            <n-input
              placeholder="货物名称"
              v-model:value="value.name"
              readonly = true
            ></n-input>
            </n-form-item>
            <n-form-item label="货物数量">
            <n-input-number
              v-model:value="value.count"
              style="width: 300px;"
              :min="1"
            >
            </n-input-number>
            </n-form-item>
            </n-form>
          </div>
        </div>
      </n-dynamic-input>
    </perfect-scrollbar>
  </n-modal>
</template>

<script>
  import axios from 'axios'
  import { defineComponent,ref } from 'vue'
  import {
    NDynamicInput,
    NInputNumber,
    NInput,
    NSelect,
    NForm,
    NFormItem,
    useMessage,
    NButton,
    NModal
  } from 'naive-ui'
  import {PerfectScrollbar} from 'vue3-perfect-scrollbar'

  export default defineComponent({
    components: {
      NDynamicInput,
      NInputNumber,
      NInput,
      PerfectScrollbar,
      NSelect,
      NForm,
      NFormItem,
      NButton,
      NModal
    },
    data () {
      const showModalRef = ref(false)
      const message = useMessage();
      return {
        domain: global.domain.uri,
        customValue: [],
        options: [],
        showModal: showModalRef,
        message,
      }
    },
    mounted(){
      this.getOption();
    },
    methods: {
      getOption() {
        const path = this.domain + '/CargoManager/Get';
         let mess = {
            token: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
          }
          axios.post(path, mess)
          .then((res)=> {
            if(res.data.state == "ok") {
              for(let i = 0; i < res.data.cargos.length; i += 1){
                let tmp = {
                  label: res.data.cargos[i].id,
                  value: res.data.cargos[i].id
                };
                this.options.push(tmp);
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
      onCreate () {
        return {
          id: null,
          name: '',
          count: 1
        }
      },
      handleUpdateValue(value){
        const path = this.domain + '/CargoManager/Query';

        let cnt = 0;
        for(let i = 0; i < this.customValue.length; i += 1){
          if(this.customValue[i].id == value) {
            cnt += 1;
            if(cnt >= 2){
              this.message.warning('该货物已在入库单中');
              this.customValue[i].id = null;
              this.customValue[i].name ='';
              this.customValue[i].count = 1;
              return;
            }
          }
        }

        let mess = {
          token: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
          id: value
        }

        axios.post(path, mess)
          .then((res) => {
            if(res.data.state == 'ok') {
              for(let i = 0; i < this.customValue.length; i += 1){
                if(this.customValue[i].id == value) {
                  this.customValue[i].name = res.data.name;
                }
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
        const path = this.domain + '/StockManager/AddInStock';
        for (let i = 0; i < this.customValue.length; i += 1) {
          if(this.customValue[i].id == null) {
            this.message.error('存在未填项，无法提交')
            return;
          }
        }

        let mess = {
          token: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
          cargos: this.customValue
        }

        axios.post(path, mess)
          .then((res) => {
            if(res.data.state == "ok") {
              this.message.success('成功提交');
              this.showModal = false
              this.$emit('emitinit')
            } else if(res.data.state == "error") {
              this.message.warning('提交失败');
              this.showModal = false
            } else if(res.data.state == "reject") {
              this.message.warning('你没有权限请联系管理员,或重新登录');
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
        this.message.info('取消');
        this.showModal = false
      },
    }
  })
</script>

<style src="vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css"></style>