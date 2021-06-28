<template>
  <center>
    <n-card title="服装库存管理系统" style="width: 400px;">
      <n-tabs default-value="signin" size="large" justify-content="space-evenly">
        <n-tab-pane name="signin" tab="登录">
          <n-form>
            <n-form-item-row label="用户名">
              <n-input v-model:value="logindata.username"/>
            </n-form-item-row>
            <n-form-item-row label="密码">
              <n-input
                type="password"
                show-password-toggle
                v-model:value="logindata.password"
              />
            </n-form-item-row>
          </n-form>
          <n-button type="primary" block @click="login">登录</n-button>
        </n-tab-pane>
        <n-tab-pane name="signup" tab="注册">
          <n-form>
            <n-form-item-row label="用户名">
              <n-input v-model:value="signupdata.username"/>
            </n-form-item-row>
            <n-form-item-row label="密码">
              <n-input
                type="password"
                show-password-toggle
                v-model:value="signupdata.password"
              />
            </n-form-item-row>
            <n-form-item-row label="重复密码">
              <n-input
                type="password"
                show-password-toggle
                v-model:value="signupdata.repeadpassword"
              />
            </n-form-item-row>
          </n-form>
          <n-button type="primary" block @click="signup">注册</n-button>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </center>
</template>

<script>
import {
  NForm,
  NCard,
  NInput,
  NTabs,
  NTabPane,
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
    NTabs,
    NTabPane,
    NFormItemRow,
    NButton
  },
  data(){
    const message = useMessage();
    return {
      domain: global.domain.uri,
      logindata: ref({
        username: '',
        password: ''
      }),
      signupdata: ref({
        username: '',
        password: '',
        repeadpassword: ''
      }),
      message,
      token: ''
    }
  },
  methods:{
    login() {
      const path = this.domain + '/UserManager/login';
      if(this.logindata.username == '') {
        this.message.warning('请输入用户名');
        return;
      }
      if(this.logindata.password == '') {
        this.message.warning('请输入密码');
        return;
      }

      axios.post(path, this.logindata)
        .then((res) => {
          if(res.data.state == 'ok') {
            this.token = res.data.token;
            localStorage.setItem('Authorization', this.token);
            localStorage.setItem('Username', this.logindata.username);
            this.$router.push('/');
            this.message.success('登录成功');
          } else {
            this.message.error('用户名或密码错误');
          }
        })
    },
    signup() {
      const path = this.domain + '/UserManager/signup';
      if(this.signupdata.username == '') {
        this.message.warning('请输入用户名');
        return;
      }
      if(this.signupdata.password == '') {
        this.message.warning('请输入密码');
        return;
      }
      if(this.signupdata.password != this.signupdata.password) {
        this.message.warning('两次输入密码不相同');
        return;
      }
      this.signupdata

      axios.post(path, this.signupdata)
        .then((res) => {
          if(res.data.state == 'ok') {
            this.message.success('注册成功');
          } else {
            this.message.warning('用户名已存在');
          }
        })
    }
  }
})
</script>
