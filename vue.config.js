/* eslint-disable indent */
const isProd = process.env.NODE_ENV === 'production'

let WorkboxWebpackPlugin
if (isProd) WorkboxWebpackPlugin = require('workbox-webpack-plugin')

module.exports = {
  lintOnSave: true, // eslint语法检查
  configureWebpack: {
    devtool: isProd ? false : 'source-map',
    externals: isProd
      ? {
          vue: 'Vue',
          'vue-router': 'VueRouter',
          vuex: 'Vuex',
          axios: 'axios',
        }
      : {},
    plugins: isProd
      ? [
          new WorkboxWebpackPlugin.GenerateSW({
            clientsClaim: true,
            skipWaiting: true,
          }),
        ]
      : [],
  },
  css: {
    loaderOptions: {
      sass: {
        data: `
          @import "~@/style/variables.scss";
          @import "~@/style/mixin.scss";
        `,
      },
    },
  },
}
