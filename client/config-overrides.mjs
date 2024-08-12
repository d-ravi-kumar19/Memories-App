const path = require('path');
const { override, addWebpackAlias, addWebpackPlugin } = require('customize-cra');
const webpack = require('webpack');

module.exports = override(
  addWebpackAlias({
    'path': require.resolve('path-browserify'),
    'os': require.resolve('os-browserify/browser'),
    'crypto': require.resolve('crypto-browserify'),
    'stream': require.resolve('stream-browserify'),
    'buffer': require.resolve('buffer/')
  }),
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  ),
  (config) => {
    config.resolve.fallback = {
      "buffer": require.resolve('buffer/'),
      "stream": require.resolve('stream-browserify'),
      "crypto": require.resolve('crypto-browserify'),
      "os": require.resolve('os-browserify/browser'),
    };
    return config;
  }
);
