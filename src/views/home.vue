<template>
  <n-space>
    <div></div>
    <DataCard :title="stock_title" :datas="stock_data"/>
    <DataCard :title="cargo_title" :datas="cargo_data"/>
  </n-space>
</template>

<script>
import {NSpace, useMessage} from 'naive-ui'
import DataCard from '../components/data-card.vue'
import { defineComponent } from 'vue'
import axios from 'axios'

export default defineComponent({
  components:{
    NSpace,
    DataCard
  },
  data(){
    const message = useMessage()
    return {
      domain: global.domain.uri,
      stock_title: '库存总览',
      stock_data: [],
      cargo_title: '货物总览',
      cargo_data:[],
      message
    }
  },
  mounted(){
    this.GetData();
  },
  methods:{
    GetData() {
      const path = this.domain + '/HomeManager/Get';
      let mess = {
        token: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
      }
      console.log(this.domain)
      axios.post(path, mess)
        .then((res) => {
          if(res.data.state == "ok"){
            this.stock_data.push({
                key: '入库单数量',
                value: res.data.in_stock_count
              }
            );
            this.stock_data.push(
              {
                key: '出库单数量',
                value: res.data.out_stock_count
              }
            );

            this.cargo_data.push(
              {
                key:'当前货物种数',
                value: res.data.cargo_type_count
              },
            );
            this.cargo_data.push(
              {
                key:'当前货物总数',
                value: res.data.cargo_count
              }
            );
          } else {
            this.message.error("请先登录");
            this.$router.push('/login')
          }
        })
        .catch((error) => {
          console.log(error);

          this.stock_data.push({
              key: '入库单数量',
              value: -1
            }
          );
          this.stock_data.push(
            {
              key: '出库单数量',
              value: -1
            }
          );

          this.cargo_data.push(
            {
              key:'当前货物种数',
              value: -1
            },
          );
          this.cargo_data.push(
            {
              key:'当前货物总数',
              value: -1
            }
          );
        });
    }
  }
})
</script>
