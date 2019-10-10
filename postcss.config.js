module.exports = ({ env }) => {
  return {
    plugins: {
      'postcss-preset-env': {},
      cssnano:
        env === 'production'
          ? {
              preset: 'default',
            }
          : false,
    },
  };
};
