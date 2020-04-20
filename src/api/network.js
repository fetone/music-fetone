// 1.安装 npm install axios
// 2. 引入
import axios from 'axios'

// 进行全局的配置
axios.defaults.baseURL = 'http://127.0.0.1:3000/'
axios.defaults.timeout = 3000

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
  }
}
