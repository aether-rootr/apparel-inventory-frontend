<template>
  <n-data-table
    :bordered="false"
    :single-line="true"
    :columns="columns"
    :data="data"
    :pagination="pagination"
  />
</template>

<script>
import { h, defineComponent } from 'vue'
import { NButtonGroup, NButton, useMessage, NDataTable } from 'naive-ui'
import axios from 'axios'

const createColumns = ({ToUser, ToAdmin, Delete}) => {
  return [
    {
      title: '用户名',
      key: 'username'
    },
    {
      title: '权限等级',
      key: 'auth'
    },
    {
      title: '操作',
      key: 'actions',
      render (row) {
        return h(
          NButtonGroup,
          {
            size: "small",
          },
          [
            h(
              NButton,
              {
                type: "success",
                onClick: () => ToUser(row)
              },
              <p>修改为用户</p>
            ),
            h(
              NButton,
              {
                type: "warning",
                onClick: () => ToAdmin(row)
              },
              <p>修改为管理员</p>
            ),
            h(
              NButton,
              {
                type: "error",
                onClick: () => Delete(row)
              },
              <p>删除该用户</p>
            ),
          ]
          
        )
      }
    }
  ]
}

export default defineComponent({
  components:{
    NDataTable
  },
  data () {
    const message = useMessage()
    let router = this.$router;
    let refresh = () => {
      const path = this.domain + "/UserManager/GetUser";
      let mess = {
        token: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
      }
      axios.post(path, mess)
        .then((res) => {
          console.log(res.data.state);
          if(res.data.state == "ok"){
            this.data = res.data.userlist;
            for (let i = 0; i < res.data.length; i++){
              this.data[i].key = i;
            }
          }else if(res.data.state == "reject") {
            this.message.warning('你没有权限请联系管理员,或重新登录');
            this.$router.push('/')
          } else {
            this.message.error("请先登录");
            this.$router.push('/login')
          }
        })
        .catch((error) => {
          console.log(error);
          this.message.error("网络错误");
        })
    }
    const domain = global.domain.uri
    return {
      domain,
      data: [],
      options: [
        {
          label: '修改权限为用户',
          key: 'touser'
        },
        {
          label: '修改权限为管理员',
          key: "toadmin"
        },
        {
          label: '删除账号',
          key: 'delete'
        }
      ],
      columns: createColumns({
        ToUser(rowData) {
          const path = domain + "/UserManager/ChangAuth";
          let mess = {
            username: rowData.username,
            auth: 'user',
            token: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
          }
          console.log("pass")
          axios.post(path, mess)
            .then((res)=>{
              if(res.data.state == 'ok'){
                message.success('修改成功');
                refresh()
              }
            })
            .catch((error) =>{
              console.log(error);
              message.error("网络错误");
            })
        },
        ToAdmin(rowData) {
          const path = domain + "/UserManager/ChangAuth";
          let mess = {
            username: rowData.username,
            auth: 'admin',
            token: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
          }
          axios.post(path, mess)
            .then((res)=>{
              if(res.data.state == 'ok'){
                message.success('修改成功');
                refresh()
              }
            })
            .catch((error) =>{
              console.log(error);
              message.error("网络错误");
            })
        },
        Delete(rowData) {
          const path = domain + "/UserManager/Delete";
          let mess = {
            token: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : '',
            username: rowData.username,
            auth: ''
          }
          axios.post(path, mess)
            .then((res)=>{
              if(res.data.state == 'ok'){
                message.success('删除成功');
                refresh();
              }else if(res.data.state == "reject") {
                message.warning('你没有权限请联系超级管理员,或重新登录');
              } else {
                message.error("请先登录");
                router.push('/login')
              }
            })
            .catch((error) =>{
              console.log(error);
              message.error("网络错误");
            })
        }
      }),
      pagination: {
        pageSize: 10
      },
      message
    }
  },
  mounted() {
    this.init();
  },
  methods:{
    init() {
      const path = this.domain + "/UserManager/GetUser";
      let mess = {
        token: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
      }
      axios.post(path, mess)
        .then((res) => {
          console.log(res.data.state);
          if(res.data.state == "ok"){
            this.data = res.data.userlist;
            for (let i = 0; i < res.data.length; i++){
              this.data[i].key = i;
            }
          }else if(res.data.state == "reject") {
            this.message.warning('你没有权限请联系管理员,或重新登录');
            this.$router.push('/')
          } else {
            this.message.error("请先登录");
            this.$router.push('/login')
          }
        })
        .catch((error) => {
          console.log(error);
          this.message.error("网络错误");
        })
    }
  }
})
</script>
