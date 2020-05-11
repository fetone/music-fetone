# 音乐项目

1. 此项目为音乐 Web App(SPA)
2. 包括歌单,播放器(全屏 迷你 列表), 歌手, 用户等多个子模块
3. 使用Vue全家桶+ES6+Webpack等技术
4. 采用模块化, 组件化, 工程化的模式开发

* 后端接口: http://musicapi.leanapp.cn/

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
      let dpr = window.devicePixelRatio
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

## 按需加载组件

```javascript
// 按需加载组件
const Recommend = (resolve) => {
  import('../views/Recommend').then((module) => {
    resolve(module)
  })
}
```
