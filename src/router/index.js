import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/home.vue'
import InStock from '../views/in-stock.vue'
import OutStock from '../views/out-stock.vue'
import Cargo from '../views/cargo.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/in-stock',
    name: 'InStock',
    component: InStock
  },
  {
    path: '/out-stock',
    name: 'OutStock',
    component: OutStock
  },
  {
    path: '/cargo',
    name: 'Cargo',
    component: Cargo
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

// // // 导航守卫
// // // 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
// // router.beforeEach((to, from, next) => {
// //   if (to.path === '/login') {
// //     next();
// //   } else {
// //     let token = localStorage.getItem('Authorization');
 
// //     if (token === null || token === '') {
// //       next('/login');
// //     } else {
// //       next();
// //     }
// //   }
// // });