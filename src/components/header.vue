<template>
  <div>
      <NPageHeader>
        <template #title>
          <NA style="text-decoration: none; color: inherit;" @click="pt">
            服装库存管理系统
          </NA>
        </template>
        <template #header></template>
        <template #avatar></template>
        <template #extra>
          <NButton type="warning" @click="logout" style="margin-right: 15px">
            登出
          </NButton>
        </template>
        <template #footer><NDivider/></template>
      </NPageHeader>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import {
  NPageHeader,
  NA,
  NDivider,
  NButton,
  useMessage
} from 'naive-ui'
import axios from 'axios'

export default defineComponent({
  components:{
    NPageHeader,
    NA,
    NDivider,
    NButton
  },
  props:{
      ttt: String,
  },
  data(){
    const message = useMessage()
    return {
      domain: global.domain.uri,
      message
    }
  },
  methods:{
    logout(){
      const path = this.domain + '/CargoManager/Get';
      let mess = {
        token: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
      }

      axios.post(path, mess)
          .then((res)=> {
            if(res.data.state == "ok") {
              this.message.success("登出成功");
              this.$router.push('/login')
            } else {
              this.message.error("请先登录");
              this.$router.push('/login')
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