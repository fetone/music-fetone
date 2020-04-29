/*
* 封装axios
* */
import axios from 'axios'
// import qs from 'querystring'

import router from '../router'
// 跳转登陆界面函数
const toLogin = () => {
  router.push({
    path: '/login'
  })
}

// 错误信息处理
const errorHandle = (status, msg) => {
  switch (status) {
    case 400:
      console.log('信息校验失败')
      break
    case 401:
      // 重新登陆
      toLogin()
      console.log('认证失败')
      break
    case 403:
      // token过时,要清除token并重新登陆
      toLogin()
      console.log('token校验失败')
      break
    case 404:
      console.log('请求的资源不存在')
      break
    default:
      console.log(msg)
  }
}

// 全局配置
axios.defaults.baseURL = 'http://127.0.0.1:3000/'
axios.defaults.timeout = 5000
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.common.Authorization = 'AUTH_TOKEN'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
/*  if (config.method === 'post') {
    config.data = qs.stringify(config.data)
  } */
  /*  if (token) {
    config.headers.common.Authorization = token
  } */
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  response.status === 200 ? Promise.resolve(response) : Promise.reject(response)
}, function (error) {
  // 对响应错误做点什么
  const { response } = error
  if (response) {
    errorHandle(response.status, response.data.message)
    return Promise.reject(response)
  } else {
    console.log('断网了')
  }
})

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
