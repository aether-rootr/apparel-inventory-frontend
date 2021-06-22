<template>
  <NMessageProvider>
    <div>
      <Header/>

      <NSpace vertical>
      <NLayout has-sider>
        <NLayoutSider
          bordered
          collapse-mode="width"
          :collapsed-width="64"
          :width="240"
          :collapsed="collapsed"
          show-trigger
          @collapse="collapsed = true"
          @expand="collapsed = false"
        >

        <NMenu
          style="height:80vh;"
          :collapsed="collapsed"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          v-model:value="activeKey"
        />

        </NLayoutSider>
        
        <NLayout>
          <router-view/>
        </NLayout>
        
      </NLayout>
    </NSpace>
    </div>
  </NMessageProvider>
</template>

<script>
  import { defineComponent,h } from 'vue';
  import {
    NLayoutSider,
    NSpace,
    NLayout,
    NMessageProvider,
    NMenu,
    NIcon
  } from 'naive-ui';
  import {Home} from '@vicons/tabler'
  import {Box16Filled} from '@vicons/fluent'
  import {ShoppingCartSharp} from '@vicons/material'
  import {UserCircle} from '@vicons/fa'
  import {RouterLink} from 'vue-router'
  
  import Header from './components/header.vue'

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
          to:'/cargo',
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
    components: {
      Header,
      NLayoutSider,
      NSpace,
      NLayout,
      NMenu,
      NMessageProvider
    },
    data(){
      return {
        collapsed: true,
        activeKey: null,
        menuOptions,
      }
    }
  });
</script>

<style>
#app {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>