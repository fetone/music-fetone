## 安装vue-cli

* 安装脚手架工具: npm install -g @vue/cli
* 检查是否安装成功: vue --version
* 通过脚手架创建项目: vue create project-name

```node_modules文件夹: 存储了依赖的相关的包
 public文件夹: 任何放置在 public 文件夹的静态资源都会被简单的复制，
               而不经过 webpack。你需要通过绝对路径来引用它们
               一般用于存储一些永远不会改变的静态资源或者webpack不支持的第三方库
 src文件夹: 代码文件夹
  |----assets文件夹: 存储项目中自己的一些静态文件(图片/字体等)
  |----components文件夹: 存储项目中的自定义组件(小组件,公共组件)
  |----views文件夹: 存储项目中的自定义组件(大组件,页面级组件,路由级别组件)
  |----router文件夹: 存储VueRouter相关文件
  |----store文件夹: 存储Vuex相关文件
  |----App.vue:根组件
  |----main.js:入口js文件
```

## 移动端适配
```html
<!--可以让部分国产浏览器默认采用高速模式渲染页面-->
    <meta name="renderer" content="webkit">
    <!--为了让 IE 浏览器运行最新的渲染模式下-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!--SEO三大标签-->
    <title>肥冬音乐</title>
    <meta name="keywords" content="网易云音乐，音乐，播放器，网易，下载，播放，DJ，免费，明星，精选，歌单，识别音乐，收藏，分享音乐，音乐互动，高音质，320K，音乐社交，官网，移动站，music.163.com">
    <meta name="description" content="网易云音乐是一款专注于发现与分享的音乐产品，依托专业音乐人、DJ、好友推荐及社交功能，为用户打造全新的音乐生活。">
    <!--
    apple-touch-icon: 是苹果私有的属性
    作用: 指定将网页保存到主屏幕上的时候的图标
    -->
    <link rel="apple-touch-icon"  href="./apple-touch-icon.png">
    <link rel="apple-touch-icon" sizes="114x114" href="./apple-touch-icon114.png">
    <link rel="apple-touch-icon" sizes="152x152" href="./apple-touch-icon152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon180.png">
    <!--网页快捷图标-->
    <link rel="icon" href="./favicon.ico">

    <script>
      let dpr = Math.round(window.devicePixelRatio)
      let scale = 1.0 / dpr;
      let text = `<meta name="viewport" content="width=device-width, initial-scale=${scale}, maximum-scale=${scale}, minimum-scale=${scale}, user-scalable=no">`;
      document.write(text);
      document.documentElement.style.fontSize = window.innerWidth / 7.5 + "px";
      document.documentElement.setAttribute('data-dpr', dpr + '');
    </script>
```
## 解决html中字符串模板无法处理的问题

1. 安装  npm i -D html-loader
2. 项目跟目录中创建vue.config.js配置文件
    * 修改
    ```javascript
     module.exports = {
       /* 部署应用包的基本URL, 不设置可能会出现打包后项目找不到资源问题 */
       publicPath: './',
       configureWebpack: {
         // 可以写原生webpack文件
         module: {
           rules: [
             {
               test: /\.(html)$/,
               exclude: /node_modules/,
               use: {
                 loader: 'html-loader',
                 options: {
                   minimize: true
                 }
               }
             }
           ]
         }
       }
     }
    ```
   ## 实现自动将px转换成rem
   
   1. 安装 npm i -D postcss-pxtorem
   2. 项目跟目录创建postcss.config.js配置文件
        * 修改
        ```javascript
          module.exports = {
            plugins: {
              autoprefixer: {},
              'postcss-pxtorem': {
                rootValue: 100, // 根元素字体大小
                // propList: ['width', 'height'] // 只转换宽度和高度
                //px改成Px则不会被转换
                propList: ['*']
              }
            }
          }
        ```
   
   ## 实现CSS3/ES678语法的兼容
   
   * vue-cli已经帮我们实现了
   * 更多浏览器兼容可以在.browserslistrc中配置浏览器兼容性问题
        ```javascript
           ie >= 8
           Firefox >= 3.5
           chrome  >= 35
           opera >= 11.5
        ``` 
     
## 解决移动端100~300ms的点击事件延迟问题

1. 安装  npm install fastclick
2. 在main.js中 引入
    ```javascript
     import fastclick from 'fastclick'
     fastclick.attach(document.body)
    ```

## 初始化默认的全局样式

注意点: 在移动端开发中, 一般情况下我们不需要让字体大小随着屏幕尺寸的变化而变化
       由于我们是通过视口缩放来适配移动端的, 所以我们不能直接设置字体大小, 否则字体大小就会随着屏幕尺寸的变化而变化
       
* 可通过scss混合解决
```scss
//字体定义规范
$font_samll:12Px;
$font_medium_s:13Px;
$font_medium:15Px;
$font_large:17Px;
/*根据dpr计算font-size*/
@mixin font_dpr($font-size){
  font-size: $font-size;
  [data-dpr="2"] & { font-size: $font-size * 2;}
  [data-dpr="3"] & { font-size: $font-size * 3;}
}
/*通过该函数设置字体大小，后期方便统一管理；*/
@mixin font_size($size){
  @include font_dpr($size);
}
```

## 图片懒加载

1. 安装  npm i vue-lazyload -S
2. 在main.js中 引入  
    ```
   import VueLazyload from 'vue-lazyload'
   Vue.use(VueLazyload, {
     preLoad: 1.3,
     // 设置占位图片
     loading: require('./assets/images/fd-loading.png')
   })
    ```

## Vue Router

1. 安装 npm install vue-router
2. 在router文件中 引入
    ```javascript
     import Vue from 'vue'
     import VueRouter from 'vue-router'
     
     Vue.use(VueRouter)
    ```

## 按需加载组件

```javascript
// 按需加载组件
const Recommend = (resolve) => {
  import('../views/Recommend').then((module) => {
    resolve(module)
  })
}
```

### 路由重定向

`{ path: '/', redirect: '/recommend' }`

## Vuex

1. 安装 npm install vuex --save
2. 在store文件中 引入
    ```javascript
     import Vue from 'vue'
     import Vuex from 'vuex'
     
     Vue.use(Vuex)
    ```

## axios

1.安装 npm install axios
2. 引入
```javascript
import axios from 'axios'
import Vue from 'vue'
// 进行全局的配置
axios.defaults.baseURL = 'http://127.0.0.1:3000/'
axios.defaults.timeout = 5000
//添加加载动画
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
```

## vue -> swipper

```javascript
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
  name: 'Banner',
  data () {
    return {
      swiperOption: {
        // 循环模式
        loop: true,
        // 分页器
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
        // 自动播放
        autoplay: {
          delay: 2000,
          stopOnLastSlide: false,
          disableOnInteraction: false
        },
        // 监视器  数据是异步加载的,发生变化自动刷新
        observer: true,
        observeParents: true,
        observeSlideChildren: true
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide
  }
}

/*如果想覆盖swiper的样式,那么style标签不能是scoped的, 否则无法覆盖*/
```

## vue -> iscroll

```javascript
// 引入iscroll专业版本
import IScroll from 'iscroll/build/iscroll-probe'
export default {
  name: 'IScroll',
  methods: {
  // 获取滚动距离的方法,监听滚动事件,执行回调函数,并传递滚动的距离
    getScrollY(fn) {
        this.iscroll.on('scroll', () => {
            fn(this.Y)
        })
    },
    // 滚动到指定位置方法
    scrollTo (x, y, time) {
          this.iscroll.scrollTo(x, y, time)
     } ,
    // 刷新方法
     refresh () {
           setTimeout(() => {
             this.iscroll.refresh()
           }, 100)
     } 
  },
  mounted () {
    this.iscroll = new IScroll(this.$refs.wrapper, {
      mouseWheel: true,
      scrollbars: true,
      // 解决拖拽卡顿问题
      scrollX: false,
      scrollY: true,
      disabledPointer: true,
      disableTouch: false,
      disableMouse: true
    })
    // 由于数据是网络获取的,所以要进行刷新
    /*setTimeout(() => {
      this.iscroll.refresh()
    }, 1000)*/
    
    // 1.创建一个观察者对象
    /*
    MutationObserver构造函数只要监听到了指定内容发生了变化,就会执行传入的回调函数
    mutationList: 发生变化的数据
    observer: 观察者对象
     */
    const observer = new MutationObserver((mutationList, ovserver) => {
      this.iscroll.refresh()
    })
    // 2.告诉观察者对象需要观察的内容
    const config = {
      childList: true, // 观察目标子节点的变化, 添加或删除
      subtree: true, // 默认为false, 设置为true可以观察后代节点
      attributeFilter: ['height', 'offsetHeight'] // 观察特定属性
    }
    // 3.告诉观察者, 我们需要观察谁, 观察什么内容
    observer.observe(this.$refs.wrapper, config)
  }
}

/*
容器的宽高小于内容的宽高才会出现滚动条
1.给组件页面设置固定定位,比如: top:200px;left:0;right:0;bottom:0;
2.给iscroll容器设置宽度为组件页面的宽高100%,overlow:hidden可隐藏超出部分
3.如果页面中数据是网络获取的,需要刷新, refresh()
*/

/*
   //iscroll的touch和默认的touch会冲突,解决IScroll拖拽卡顿问题,在css中写入
    html,body{touch-action: none;}
*/
```

## vue -> velocity

```javascript
<Transition 
    :css='false'
    @enter='enter'
</Transition>
//1. 安装: npm install velocity-animate
//2. 引入
import Velocity from 'velocity-animate'
import 'velocity-animate/velocity.ui.js'  //这是引入封装好的插件
//3.钩子函数中使用
enter (el, done) {
      Velocity(el, 'transition.bounceDownIn', { duration: 500 }, function () {
        done()
      })
    }
    //第二个参数是插件中封装好的参数
```

## vue -> 手机打开控制台

在main.js中写入
1. 安装 npm install vconsole
2. import 'VConsole' from 'vconsole'
3. const vconsole = new VConsole
4. Vue.use(vconsole)

## iOS中监听音频是否加载

1. PC端和Android端 可使用oncanplay事件
2. 兼容iOS可使用ondurationchange事件

### 碰到的es-lint检测不通过问题,可修改.eslintrc.js文件
* 比如 在rules中添加一句`'no-useless-escape': 'off'`,可解决一些转义字符错误的问题
