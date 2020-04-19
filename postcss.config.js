module.exports = {
  plugins: {
    autoprefixer: {},
    'postcss-pxtorem': {
      rootValue: 100, // 根元素字体大小
      // propList: ['width', 'height'] // 只转换宽度和高度
      propList: ['*']
    }
  }
}
