// 1.安装 npm install axios
// 2. 引入
import axios from 'axios'
import Vue from 'vue'
// 进行全局的配置
axios.defaults.baseURL = 'http://127.0.0.1:3000/'
axios.defaults.timeout = 5000

let count = 0
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  count++
  Vue.showLoading()
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  count--
  if (count === 0) {
    Vue.hiddenLoading()
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

// 封装自己的get/post方法
export default {
  get: function (url = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.get(url, {
        params: data
      })
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  post: function (url = '', data = {}) {
    return new Promise(function (resolve, reject) {
      axios.post(url, data)
        .then((response) => {
          resolve(response.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  },
  all: function (list) {
    return new Promise((resolve, reject) => {
      axios.all(list)
        .then(axios.spread(function (...result) {
          // 两个请求现在都执行完成
          resolve(result)
        }))
        .catch((err) => {
          reject(err)
        })
    })
  }
}
