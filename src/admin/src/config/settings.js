// import { mainRoutes } from '@/router/routes'
// import omit from 'lodash/omit'

// const routes = mainRoutes.map(item => omit(item, ['component']))

export const layoutSettings = {
  layout: 'sidemenu',
  fixSiderbar: true
}

export const systemSettings = {
  page: {
    opened: [
      {
        name: 'Home',
        path: '/index',
        fullPath: '/index',
        meta: {
          title: '首页'
        }
      }
    ]
  },
  useI18n: false
}
