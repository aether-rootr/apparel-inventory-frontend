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
        <template #footer><NDivider/></template>
      </NPageHeader>
    </div>
</template>

<script>
import { defineComponent } from 'vue'
import {
  NPageHeader,
  NA,
  NDivider
} from 'naive-ui'

export default defineComponent({
  components:{
    NPageHeader,
    NA,
    NDivider
  },
  props:{
      ttt: String,
  },
  setup() {
  
  },
  methods:{
    pt(){
      console.log(this.ttt);
    }
  }
})
</script>
