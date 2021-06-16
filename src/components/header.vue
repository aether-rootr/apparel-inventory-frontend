<template>
  <div>
  <NPageHeader >
    <template #title>
      <NA style="text-decoration: none; color: inherit;">
        服装库存管理系统
      </NA>
    </template>
    <template #header></template>
    <template #avatar>
      <NButton text style="font-size: 24px;" @click="handleClick">
        <NIcon>
          <AlignJustified />
        </NIcon>
      </NButton>
    </template>
    <template #footer><NDivider/></template>
  </NPageHeader>
  </div>
</template>

<script>
import {
  NPageHeader,
  NDivider,
  NA,
  NIcon,
  NButton,
} from 'naive-ui'

import {AlignJustified} from '@vicons/tabler'

import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    NPageHeader,
    NDivider,
    NA,
    NIcon,
    NButton,
    AlignJustified,
  },
  setup() {
    const 
  }
})
</script>