<template>
  <center>
    <n-card title="修改密码" hoverable style="width: 400px;">
          <n-form>
            <n-form-item-row label="输入旧密码">
              <n-input
                type="password"
                show-password-toggle
                v-model:value="changepass.oldpassword"
              />
            </n-form-item-row>
            <n-form-item-row label="输入新密码">
              <n-input
                type="password"
                show-password-toggle
                v-model:value="changepass.newpassword"
              />
            </n-form-item-row>
            <n-form-item-row label="重复输入新密码">
              <n-input
                type="password"
                show-password-toggle
                v-model:value="changepass.repeadnewpassword"
              />
            </n-form-item-row>
          </n-form>
          <n-button type="primary" block @click="changepassword">提交</n-button>
    </n-card>
  </center>
</template>

<script>
import {
  NForm,
  NCard,
  NInput,
  NFormItemRow,
  NButton,
  useMessage
} from 'naive-ui'
import { defineComponent,ref } from 'vue'
import axios from 'axios';

export default defineComponent({
  components:{
    NForm,
    NCard,
    NInput,
    NFormItemRow,
    NButton
  },
  data(){
    const message = useMessage();
    return {
      domain: global.domain.uri,
     changepass: ref({
        oldpassword: '',
        newpassword: '',
        repeadnewpassword: ''
      }),
      message,
      token: ''
    }
  },
  methods:{
    changepassword() {
      const path = this.domain + '/UserManager/ChangePassword';
      if(this.changepass.oldpassword == '') {
        this.message.warning('请输入旧密码');
        return;
      }
      if(this.changepass.newpassword == '') {
        this.message.warning('请输入新密码');
        return;
      }
      if(this.changepass.newpassword != this.changepass.repeadnewpassword) {
        this.message.warning('两次输入的新密码不相同');
        return;
      }
      
      let mess = {
        username: localStorage.getItem('Username') ? localStorage.getItem('Username') : '',
        password: this.changepass.oldpassword,
        newpassword: this.changepass.newpassword
      }

      axios.post(path, mess)
        .then((res) => {
          if(res.data.state == 'ok') {
            this.message.success('修改成功');
            this.$router.push('/');
          } else if(res.data.state == 'usererror') {
            this.message.warning('当前用户不存在');
            this.$router.push('/');
          } else if(res.data.state == 'passerror') {
            this.message.warning('旧密码错误');
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
