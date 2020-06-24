import Vue from 'vue'
import VueRouter from 'vue-router'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

import Cookie from '@/utils/util.cookie'

const VueRouterPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return VueRouterPush.call(this, location).catch(err => err)
}
const VueRouterReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return VueRouterReplace.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {
      auth: true
    },
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

const router = new VueRouter({
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  NProgress.start()
  if (to.matched.some(r => r.meta.auth)) {
    const token = Cookie.get('token')
    if (token) {
      next()
    } else {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
      NProgress.done()
    }
  } else {
    next()
  }
})
router.afterEach(to => {
  // 进度条
  NProgress.done()
})

export default router
