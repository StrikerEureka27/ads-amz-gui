import AppVue from '@/App.vue'
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue';
import Welcome from '@/views/Welcome.vue';
import AccessDenied from '@/components/AccessDenied.vue';

const router = createRouter({
  //history: createWebHistory(import.meta.env.BASE_URL)
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'App',
      component: AppVue,
      meta: {
        title: 'AMZWEB'
      }
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: {
        title: 'AMZWEB'
      }
    },
    {
      path: '/Welcome',
      name: 'Welcome',
      component: Welcome,
      meta: {
        title: 'AMZWEB'
      }
    },
    {
      path: '/AccessDenied',
      name: 'AccessDenied',
      component: AccessDenied,
      meta: {
        title: 'AMZWEB'
      }
    }
  ]
})

export default router
