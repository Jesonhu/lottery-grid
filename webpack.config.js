const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: "./src/index.js",
  output: {
    filename: "lotteryGrid.js",
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true
  },
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"]
  },
  plugins: [
    // new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new OptimizeCss({
      cssProcessor: require('cssnano')
    }),
    new MiniCssExtractPlugin({
      path: path.resolve(__dirname, 'dist'),
      filename: "lotteryGrid.css",
      chunkFilename: "[id].css"
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    // @see https://webpack.js.org/plugins/uglifyjs-webpack-plugin
    minimizer: [new UglifyJsPlugin()],
    // @see https://www.jianshu.com/p/2cc8457f1a10
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          filename: 'vender.js'
        }
      }
    }
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: 'dist'
            }
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                // Notice: 这里要添加`{browsers:['last 2 versions']}`
                // 不添加不会添加前缀
                require('autoprefixer')({browsers:['last 2 versions']})
              ]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it use publicPath in webpackOptions.output
              publicPath: 'dist'
            }
          },
          // "style-loader",
          {loader: 'css-loader',options: {importLoaders: 2}},  //2代表css-loader后还需要几个loader
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')({browsers:['last 2 versions']})
              ]
            }
          },
          'sass-loader'
        ]
      }
    ]
  }
};
