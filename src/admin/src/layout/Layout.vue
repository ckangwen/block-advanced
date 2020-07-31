<template>
  <ad-layout v-bind="settings" :collapsed.sync="collapsed" :menu-attrs="menuAttrs">
    <template slot="header-extra">
      <locale />
      <user-state/>
    </template>
    <template slot="pageHeader">
      <nav-tabs />
    </template>
    <router-view></router-view>
  </ad-layout>
</template>
<script>
import { layoutSettings } from '@/config/settings'
import { mainRoutes } from '@/router/routes'
import omit from 'lodash/omit'
import NavTabs from './components/NavTabs'
import UserState from '@/components/UserState'
import Locale from '@/components/locale'
export default {
  name: 'app-layout',
  components: {
    NavTabs,
    UserState,
    // eslint-disable-next-line vue/no-unused-components
    Locale
  },
  data () {
    return {
      settings: Object.assign(layoutSettings, {
        routes: mainRoutes.map(item => omit(item, ['component']))
      }),
      collapsed: false,
      menuAttrs: {
        router: true
      }
    }
  }
}
</script>
<style lang="scss">
.wen-scrollbar__view > .el-menu {
  height: calc(100vh - 60px);
}
</style>
