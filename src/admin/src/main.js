import Vue from 'vue'
import App from './App'
import router from './router'
import { mainRoutes } from './router/routes'
import store from './store'
import { AdLayout } from '@ckangwen/components'
import '@ckangwen/components/lib/styles/index.css'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import i18n from './i18n'

Vue.use(ElementUI)
Vue.use(AdLayout)

new Vue({
  i18n,
  router,
  store,
  render: h => h(App),
  created () {
    this.$store.commit('page/INIT', mainRoutes)
  },
  mounted () {
    this.$store.dispatch('user/load')
    /** 从LocalStorage中加载tab */
    this.$store.dispatch('page/load')
    this.$store.dispatch('theme/load')
  }
}).$mount('#app')
