module.exports = {}
// vue.config.js
const CompressionPlugin = require('compression-webpack-plugin')
module.exports = {
  configureWebpack: (config) => {
    return {
      plugins: [
        new CompressionPlugin({
          test: /\.js$|\.html$|\.css$|\.jpg$|\.jpeg$|\.png/, // 需要压缩的文件类型
          threshold: 10240, // 归档需要进行压缩的文件大小最小值，我这个是10K以上的进行压缩
          deleteOriginalAssets: false, // 是否删除原文件
        }),
      ],
    }
  },
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/style/common.scss";',
      },
    },
  },
  publicPath: '/draw',
  productionSourceMap: false,
  devServer: {
    host: '0.0.0.0',
    sockHost: 'http://0.0.0.0:8080',
    proxy: {
      '/api': {
        target: 'http://10.8.8.230:18004/',
        ws: true,
        changeOrigin: true,
      },
      '/uploads': {
        target: 'http://10.8.8.230:18005/',
        ws: true,
        changeOrigin: true,
      },
    },
  },
  pwa: {
    iconPaths: {
      favicon32: 'favicon.ico',
      favicon16: 'favicon.ico',
      appleTouchIcon: 'favicon.ico',
      maskIcon: 'favicon.ico',
      msTileImage: 'favicon.ico',
    },
  },
}
