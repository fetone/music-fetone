import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import './assets/css/base.scss'

// 图片懒加载
import VueLazyload from 'vue-lazyload'
// 网络加载动画
import Loading from './plugins/loading/index'
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // 设置占位图片
  loading: require('./assets/images/fd-loading.png')
})
Vue.use(Loading)

fastclick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
