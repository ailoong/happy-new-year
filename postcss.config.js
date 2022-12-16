module.exports = {
  plugins: {
    'postcss-pxtorem': {
      rootValue: 75, // 设计稿宽度的1/10
      propList: ['*'],
    },
  },
};
