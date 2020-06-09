module.exports = {
  plugins: {
    // ...
    'postcss-px-to-viewport': {
      // options
      unitToConvert: 'px', // 需要转换的单位，默认为‘px’
      viewportWidth: 375, // 设计稿的视口宽度
      unitPrecision: 5, // 单位转换后保留的精度
      propList: ['*'], // 能转化为vw的属性列表
      viewportUnit: 'vw', // 希望使用的视口单位
      fontViewportUnit: 'vw', // 字体使用的视口单位
      selectorBlackList: ['.ignore-'], // 需要忽略的CSS选择器
      minPixelValue: 1, // 设置最小的转换数值
      mediaQuery: false, // 每次查询里的单位是否需要转换单位
      replace: true, // 是否直接更换属性值，而不是添加备用值
      exclude: undefined, // 忽略某些文件夹下的文件或特点文件
      include: undefined, // 如果设置了include，那将只有匹配到的文件才会被转换。
      landscape: false, // 是否添加根据landscapeWidth生成的媒体查询条件
      landscapeUnit: 'vh', // 横屏时使用的单位
      landscapeWidth: 375, // 横屏时使用的视口宽度
    },
  },
}
