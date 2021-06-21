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
        <left-menu :collapsed="collapsed"/>
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
  import { defineComponent } from 'vue';
  import {
    NLayoutSider,
    NSpace,
    NLayout,
    NMessageProvider
  } from 'naive-ui';
  
  import Header from './components/header.vue'
  import LeftMenu from './components/left-menu.vue'

  export default defineComponent({
    components: {
      Header,
      NLayoutSider,
      NSpace,
      NLayout,
      LeftMenu,
      NMessageProvider
    },
    data(){
      return {
        collapsed: true,
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