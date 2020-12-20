import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Article from '@/components/Article'
import Signin from '@/components/Signin'
import Signup from '@/components/Signup'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/article/details/:id',
      name: 'article details',
      component: Article
    },
    {
      path: '/signin',
      name: 'signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'sign up',
      component: Signup
    }
  ],
  mode: 'history'
})
