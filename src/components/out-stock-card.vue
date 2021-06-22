<template>
  <n-card title="出库明细" hoverable style="max-height: 250">
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
                v-model:value="value.SelectValue"
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
            >
            </n-input-number>
            </n-form-item>
            </n-form>
          </div>
        </div>
      </n-dynamic-input>
    </perfect-scrollbar>
  </n-card>
</template>

<script>
  import axios from 'axios'
  import { defineComponent } from 'vue'
  import {
    NCard,
    NDynamicInput,
    NInputNumber,
    NInput,
    NSelect,
    NForm,
    NFormItem,
    useMessage,
  } from 'naive-ui'
  import {PerfectScrollbar} from 'vue3-perfect-scrollbar'

  export default defineComponent({
    components: {
      NCard,
      NDynamicInput,
      NInputNumber,
      NInput,
      PerfectScrollbar,
      NSelect,
      NForm,
      NFormItem,
    },
    setup() {
      const message = useMessage();
      return {
        NetError(){
          message.error('网络错误');
        }
      }
    },
    data () {
      return {
        domain: global.domain.uri,
        customValue: [
          {
           id: null,
           name: null,
           count: 0
          }
        ],
        options: [],
      }
    },
    mounted() {
      this.getOption();
    },
    methods: {
      getOption() {
        const path = this.domain + '/CargoManager/Get';
        axios.get(path)
          .then((res)=> {
            for(let i = 0; i <= res.data.length; i += 1){
              let tmp = {
                label: res.data[i].id,
                value: res.data[i].id
              };
              this.options.push(tmp);
            }
          })
          .catch((error) => {
            console.error(error);
          })
      },
      onCreate () {
        return {
          id: null,
          name: '',
          count: 0
        }
      },
      handleUpdateValue(value){
        const path = this.domain + '/CargoManager/Query';
        let mess = {
          id: value
        }
        axios.post(path, mess)
          .then((res) => {
            this.customValue[this.customValue.length - 1].name = res.data.name;
          })
          .catch((error) => {
            console.error(error);
            this.NetError();
          })
      },
      
    }
  })
</script>

<style src="vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css"></style>