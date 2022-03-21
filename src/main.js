import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import global from './utils/global'
import 'element-ui/lib/theme-chalk/index.css' // 引入主题
import './style/index.scss'
import './utils/rem'

Vue.config.productionTip = false // 关闭生产提示

document.title = '网易云音乐' // 网页标题

Vue.use(global)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
