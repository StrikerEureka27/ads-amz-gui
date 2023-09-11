import Home from '@/views/Home.vue';
import Welcome from '@/views/Welcome.vue';
import AccessDenied from '@/components/AccessDenied.vue';
import NotFound from '@/components/NotFound.vue';
import Reference from '@/components/Reference.vue';
import Filter from '@/components/Filter.vue';
import Parameter from '@/components/Parameter.vue';
import Formula from '@/components/Formula.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/references', 
          component: Reference 
        },
        {
          path: '/filters', 
          component: Filter 
        },
        {
          path: '/parameters', 
          component: Parameter 
        },
        {
          path: '/formulas', 
          component: Formula 
        }
      ]
    },
    {
      path: '/Welcome',
      name: 'Welcome',
      component: Welcome,
    },
    {
      path: '/AccessDenied',
      name: 'AccessDenied',
      component: AccessDenied,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/Welcome'
    }
  ]
})


export default router
