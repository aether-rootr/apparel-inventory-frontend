<template>
  <n-card :title="title" hoverable style="max-width: 400px;">
    <n-grid :x-gap="20" :y-gap="8" :cols="datas.length">
      <n-grid-item  v-for="data in datas" :key='data.key'>
        <n-statistic :label="data.key"> {{data.value}} </n-statistic>
      </n-grid-item>
    </n-grid>
  </n-card>
</template>

<script>
import { defineComponent } from 'vue'
import {NCard, NGrid, NGridItem, NStatistic} from 'naive-ui'

export default defineComponent({
  components:{
    NCard,
    NGrid,
    NGridItem,
    NStatistic
  },
  props:{
    title: String,
    datas: Array
  },
})
</script>