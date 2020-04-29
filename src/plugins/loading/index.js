// import Vue from 'vue'
import Loading from './Loading'

export default {
  install: function (Vue, options) {
    // Vue.component(Loading.name, Loading)
    const LoadingConstructor = Vue.extend(Loading)
    const LoadingInstance = new LoadingConstructor()
    const oDiv = document.createElement('div')
    document.body.appendChild(oDiv)
    LoadingInstance.$mount(oDiv)

    if (options && options.title !== null && options.title !== undefined) {
      LoadingInstance.title = options.title
    }
    // 全局方法
    Vue.showLoading = function () {
      LoadingInstance.isShow = true
    }
    Vue.hiddenLoading = function () {
      LoadingInstance.isShow = false
    }
    // 实例方法
    Vue.prototype.$showLoading = function () {
      LoadingInstance.isShow = true
    }
    Vue.prototype.$hiddenLoading = function () {
      LoadingInstance.isShow = false
    }
  }
}
