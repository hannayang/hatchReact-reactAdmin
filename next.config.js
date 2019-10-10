const path = require('path');
const withCSS = require('@zeit/next-css');
const getLocalIdent = require('css-loader/lib/getLocalIdent');

const env = {
  development: require('./env/development'),
  production: require('./env/production'),
};

const nextConfig = {
  env: env[process.env.NODE_ENV],
  cssModules: true,
  cssLoaderOptions: {
    camelCase: true,
    localIdentName: '[local]___[hash:base64:5]',
    getLocalIdent: function(loaderContext, localIdentName, localName, options) {
      if (loaderContext.resourcePath.includes('node_modules')) {
        return localName;
      }

      return getLocalIdent(loaderContext, localIdentName, localName, options);
    },
    url: false,
  },
  webpack: (config) => {
    config.resolve.modules.push(path.resolve(__dirname, 'src'));
    return config;
  },
};

module.exports = withCSS(nextConfig);
