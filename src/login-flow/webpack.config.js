const merge = require('webpack-merge')
const path = require('path')
const devConfig = require('../../build/webpack.dev.conf')

module.exports = async () => {
  const devConf = await devConfig
  return merge(devConf, {
    entry: {
      app: path.resolve(__dirname, './main.js')
    },
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        vue$: 'vue/dist/vue.esm.js',
        '@': path.resolve(__dirname, './')
      }
    }
  })
}
