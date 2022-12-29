module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 36, // 设计稿宽度的1/10
      propList: ['*'],
      selectorBlackList: ['pc-post', 'logo-box'],
    },
  },
};
