import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/view/HomePage'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HomePage',
      component: HomePage,
      //children: [
        // {
        //   path: 'header',
        //   name: 'header',
        //   component: Header
        // }
      //]
    }
  ]
})
