<template>
  <n-button style="margin: 10px" @click="showModal = true">
      新增出库
  </n-button>
  <n-modal 
    v-model:show="showModal"
    :mask-closable="false"
    preset="dialog"
    title="出库单"
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
              :min="0"
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
        maxdata: new Map(),
      }
    },
    mounted(){
      this.getOption();
    },
    methods: {
      getOption() {
        const path = this.domain + '/CargoManager/Get';
        axios.get(path)
          .then((res)=> {
            for(let i = 0; i < res.data.length; i += 1){
              let tmp = {
                label: res.data[i].id,
                value: res.data[i].id
              };
              this.maxdata[res.data[i].id] = res.data[i].count;
              this.options.push(tmp);
            }
          })
          .catch((error) => {
            console.error(error);
            this.message.error('网络错误');
          })
      },
      onCreate () {
        return {
          id: null,
          name: '',
          count: 0,
        }
      },
      handleUpdateValue(value){
        const path = this.domain + '/CargoManager/Query';
        let mess = {
          id: value
        }

        let cnt = 0;
        for(let i = 0; i < this.customValue.length; i += 1){
          if(this.customValue[i].id == value) {
            cnt += 1;
            if(cnt >= 2){
              this.message.warning('该货物已在出库单中');
              this.customValue[i].id = null;
              this.customValue[i].name ='';
            }
          }
        }

        axios.post(path, mess)
          .then((res) => {
            for(let i = 0; i < this.customValue.length; i += 1){
              if(this.customValue[i].id == value) {
                this.customValue[i].name = res.data.name;
              }
            }
          })
          .catch((error) => {
            console.error(error);
            this.message.error('网络错误');
          })
      },
      
      onPositiveClick() {
        const path = this.domain + '/StockManager/AddOutStock';
        let flag = false;
        for (let i = 0; i < this.customValue.length; i += 1) {
          if(this.customValue[i].id == null) {
            this.message.error('存在未填项，无法提交')
            return;
          }
          if(this.maxdata[this.customValue[i].id] < this.customValue[i].count) {
            this.message.warning('产品id为' + this.customValue[i].id + ', 产品名为' + this.customValue[i].name + '的出库量超过库存,已自动调整为最大值');
            this.customValue[i].count = this.maxdata[this.customValue[i].id];
            flag = true;
          }
        }
        if (flag == true) return;

        axios.post(path, this.customValue)
          .then((res) => {
            if(res.data.state == "ok") {
              this.message.success('成功提交');
              this.showModal = false
              this.$emit('emitinit')
              this.getOption();
            } else {
              this.message.warning('提交失败');
              this.showModal = false
            }
          })
          .catch((error) => {
            console.error(error);
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