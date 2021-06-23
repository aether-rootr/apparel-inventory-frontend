<template>
  <perfect-scrollbar style="max-height: calc(70vh); margin-left: 15px; margin-right: 5px;">
    <user-table/>
  </perfect-scrollbar>
</template>

<script>
import { defineComponent } from 'vue'
import UserTable from '../components/user-table.vue'
import {PerfectScrollbar} from 'vue3-perfect-scrollbar'

export default defineComponent({
  components: {
    UserTable,
    PerfectScrollbar
  }
})
</script>
