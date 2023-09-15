import Home from '@/views/Home.vue';
import Welcome from '@/views/Welcome.vue';
import AccessDenied from '@/components/AccessDenied.vue';
import NotFound from '@/components/NotFound.vue';
import Account from '@/views/Account.vue';
import Repository from '@/views/Repository.vue';
import Filter from '@/views/Filter.vue';
import Parameter from '@/views/Parameter.vue';
import Reference from '@/views/Reference.vue';
import Formula from '@/views/Formula.vue';
import AccountReference from '@/components/AccountReference.vue';
import AccountFilter from '@/components/AccountFilter.vue';
import FilterParameter from '@/components/FilterParameter.vue';
import AccountFormula from '@/components/AccountFormula.vue';
import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: 'repository',
          name: 'Repository',
          component: Repository,
        },
        {
          path: 'account',
          name: 'Account',
          component: Account,
          children: [
            {
              path: '/account_reference',
              name: 'AccountReference',
              component: AccountReference,
            },
            {
              path: '/account_filter',
              name: 'AccountFilter',
              component: AccountFilter,
            },
            {
              path: '/filter_parameter',
              name: 'FilterParameter',
              component: FilterParameter,
            },
            {
              path: '/account_formula',
              name: 'AccountFormula',
              component: AccountFormula,
            }
          ]
        },
        {
          path: 'filter',
          name: 'Filter',
          component: Filter,
        },
        {
          path: 'parameter',
          name: 'Parameter',
          component: Parameter,
        },
        {
          path: 'reference',
          name: 'Reference',
          component: Reference,
        },
        {
          path: 'formula',
          name: 'Formula',
          component: Formula,
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
