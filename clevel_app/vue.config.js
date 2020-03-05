// const TextEncodingShim = require('text-encoding-shim');
// const path = require('path');
// const webpack = require('webpack');
// const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

// const { TextEncoder } = TextEncodingShim;
// const { TextDecoder } = TextEncodingShim;

module.exports = {
  transpileDependencies: ['vuetify'],

  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
      title: 'Expert Evaluation App',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
  },

  configureWebpack: {
    // plugins: [
    //   new webpack.LoaderOptionsPlugin({
    //     // test: /\.xxx$/, // may apply this only for some modules
    //     exclude: '../pkg/',
    //     options: {
    //       eslint: {
    //         configFile: './.eslintrc.js',
    //       },
    //     },
    //   }),
    //   new WasmPackPlugin({
    //     crateDirectory: path.resolve('../'),
    //   }),
    //   // Have this example work in Edge which doesn't ship `TextEncoder` or
    //   // `TextDecoder` at this time.
    //   new webpack.ProvidePlugin({
    //     TextDecoder,
    //     TextEncoder,
    //   }),
    // ],
  },

  pluginOptions: {
    i18n: {
      locale: 'uk_UA',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
};
