/* eslint-disable indent */
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

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
    plugins: [
      new WorkboxWebpackPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
      }),
    ],
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
