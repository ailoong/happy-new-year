module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 36, // 设计稿宽度的1/10
      // propList: ['font', 'font-size', 'line-height', 'letter-spacing'],
      propList: ['*'],
      selectorBlackList: ['pc-post'],
    },
  },
};
