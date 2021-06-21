import { createApp } from 'vue'
import App from './App.vue'
import domain from './domain.js'
import router from './router/index.js'

global.domain = domain;

createApp(App).use(router).mount('#app')