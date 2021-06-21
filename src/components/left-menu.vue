<template>
  <NMenu
    style="height:80vh;"
    :collapsed="collapsed"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="menuOptions"
    v-model:value="activeKey"
  />
</template>

<script>
  import {NMenu, NIcon} from 'naive-ui'
  import {Home} from '@vicons/tabler'
  import {Box16Filled} from '@vicons/fluent'
  import {ShoppingCartSharp} from '@vicons/material'
  import {UserCircle} from '@vicons/fa'
  import { defineComponent,h } from 'vue'
  import {RouterLink} from 'vue-router'

  function renderIcon (icon) {
    return () => h(NIcon, null, { default: () => h(icon) })
  }

  const menuOptions = [
    {
      label: () =>
        h(
          RouterLink,
          {
            to: "/",
          },
          '总览'
        ),
      key: 'main',
      icon: renderIcon(Home)
    },
    {
      label: '库存管理',
      key: 'in-stock',
      icon: renderIcon(Box16Filled),
      children: [
          {
            label: () => h(
              RouterLink,
              {
                to:'/in-stock',
              },
              '入库管理'
            ),
            key: 'in-of-stockd',
          },
          {
            label: () => h(
              RouterLink,
              {
                to:'/out-stock',
              },
              '出库管理'
            ),
            key: 'out-of-stock',
          }
        ]
    },
    {
      label: () => h(
        RouterLink,
        {
          to:'/',
        },'货号管理'
      ),
      key: 'cargo',
      icon: renderIcon(ShoppingCartSharp)
    },
    {
      label: () => h(
        RouterLink,
        {
          to:'/',
        },'用户管理'
      ),
      key: 'user',
      icon: renderIcon(UserCircle)
    }
  ]

  export default defineComponent({
    components:{
      NMenu,
    },
    props:{
      collapsed: Boolean,
    },
    setup() {
      return {
        activeKey: null,
        menuOptions,
      }
    },
  })
</script>
