var utils = require('./utils')
var webpack = require('webpack')
var config = require('./config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')

var webpackConfig = {
  entry: {
    app: './zcy/index.js'
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js?$/,
        loader: 'eslint-loader',
        include: [utils.resolve('zcy')]
      },
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
              ['es2015', { "loose": true }]
            ],
            plugins: [
              "transform-es3-property-literals",
              "transform-es3-member-expression-literals"
            ]
          },
        }],
        exclude: /node_modules/
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            'postcss-loader',
            'less-loader'
          ],
          fallback: 'style-loader'
        })
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        query: {
          debug: true,
          // rootRelative: resolve('zcy/handlebars')
          helperDirs: [utils.resolve('zcy/handlebars/helpers')],
          partialDirs: [utils.resolve('zcy/handlebars/partials')]
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  devtool: false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('zcy-ui.js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    /**
     * 由于webpack的UglifyJs插件不能使用IE8兼容参数，会导致代码中出现IE8中不支持的代码，
     * 暂时先关闭压缩
     */
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: { screw_ie8: true, warnings: false },
    //   mangle: { screw_ie8: true }
    // }),

    // 抽取css到单独文件
    new ExtractTextPlugin(utils.assetsPath('zcy-ui.css')),
    // css 压缩
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorOptions: { discardComments: { removeAll: true } },
      canPrint: true
    })
  ]
}

if (config.build.productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config.build.productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
}

if (config.build.bundleAnalyzerReport) {
  var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
  webpackConfig.plugins.push(new BundleAnalyzerPlugin())
}

module.exports = webpackConfig
