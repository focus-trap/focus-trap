const path = require('path');
const { BannerPlugin } = require('webpack');

const pkg = require('./package.json');
const babelConfig = require('./babel.config');

const getBanner = function () {
  return `/*!
* ${pkg.name} ${pkg.version}
* @license ${pkg.license}
*/`;
};

const config = {
  name: null, // to be defined by specialized build config
  output: null, // to be specified by specialized build config
  entry: path.resolve(`./index.js`),
  mode: 'development',
  devtool: 'source-map',
  optimization: {
    // always minimize using the TerserPlugin
    // NOTE: minimization is not the same as mangling; minimization, in Webpack,
    //  is basically tree-shaking (something we want to use to eliminate dead
    //  code), while mangling takes minimization even further by reducing
    //  variable names and static values to their shortest representation
    //  possible while maintaining critical names
    // @see https://webpack.js.org/guides/tree-shaking/
    minimize: true
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: babelConfig
        }
      }
    ]
  },
  plugins: [
    new BannerPlugin({
      banner: getBanner(),
      raw: true
    })
  ],
  watchOptions: {
    // @see https://webpack.js.org/configuration/watch/
    ignored: ['node_modules/**', 'dist/**', '**/*.spec.js', '**/*.test.js']
  }
};

const outputConfig = {
  path: path.resolve('./dist'),
  libraryTarget: 'umd',
  library: 'focusTrap',
  filename: null // specify in specialized build config
};

module.exports = [
  // Dev build
  {
    ...config,
    name: 'dev',
    output: {
      ...outputConfig,
      filename: `${pkg.name}.js`
    }
  },
  // Prod build
  {
    ...config,
    name: 'prod',
    mode: 'production',
    devtool: false, // no source map
    output: {
      ...outputConfig,
      filename: `${pkg.name}.min.js`
    }
  }
];
