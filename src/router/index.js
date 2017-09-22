import Vue from 'vue'
import Router from 'vue-router'
import Recommend from '@/components/recommend'
import Search from '@/components/search'
import Rank from '@/components/rank'
import Singer from '@/components/singer'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/recommend'
    },
    {
      path: '/search',
      component: Search
    },
    {
      path: '/recommend',
      component: Recommend
    },
    {
      path: '/rank',
      component: Rank
    },
    {
      path: '/singer',
      component: Singer
    }
  ]
})
