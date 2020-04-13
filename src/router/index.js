import Vue from 'vue'
import Router from 'vue-router'
import LRCGenerator from '@/components/LRCGenerator'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: LRCGenerator
    }
  ]
})
