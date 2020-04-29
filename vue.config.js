module.exports = {
  /* 部署应用包的基本URL, 不设置可能会出现打包后项目找不到资源问题 */
  publicPath: './',
  configureWebpack: {
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
