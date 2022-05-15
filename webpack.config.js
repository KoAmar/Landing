const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const PurgecssPlugin = require('purgecss-webpack-plugin')
const { SourceMap } = require('module')
const PATHS = {
  src: path.join(__dirname, 'src')
}
// const cssA = cssnano({
//   autoprefixer: {
//     add: true,
//     remove: true,
//   },
//   discardComments: {
//     removeAll: true,
//   },
//   discardDuplicates: true,
//   reduceIdents: false,
//   safe: true,
//   sourcemap: true,
// });

let mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';
// const mode = 'production';
// const mode = 'development';
let isDev = mode === 'development';
// const webpack = require('webpack')


module.exports = {
  mode: mode,
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: isDev ? 'assets/[name][ext][query]' : 'assets/[name]-[hash][ext][query]',
    // assetModuleFilename: 'assets/[name][ext][query]',
    filename: isDev ? 'index.js' : 'index-[contenthash].js',
    // clean: true
  },
  cache: {
    type: 'filesystem',
    allowCollectingMemory: true,
  },
  devServer: {
    port: 8080,
    open: true,
    compress: true,
    hot: true,
    liveReload: true,
    watchFiles: ["src/*.html"],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name]-[contenthash].css'
    }),
    new PurgecssPlugin({
      paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      // filename: isDev ? 'index.html' : 'index-[contenthash].html'
      filename: 'index.html'
    })
  ],
  module: {
    rules: [
      { test: /\.html$/, use: 'html-loader' },
      {
        test: /\.s?css$/, use: [
          // isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          // MiniCssExtractPlugin.loader,
          'style-loader',
          //todo remove fore prod
          { loader: 'css-loader', options: { sourceMap: true } },
          // 'postcss-loader',
          { loader: 'sass-loader', options: { sourceMap: true } },
        ]
      },
      // { test: /\.(png|svg|jpg|jpeg|gif)$/, type: 'asset/resource' },
      
      { test: /\.(png|svg|jpg|jpeg|gif)$/, type: 'asset' },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, type: 'asset' },
      // { test: /\.svg$/, use: 'svg-inline-loader' },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  performance: {
    hints: false
  },
  // target: 'web',
  // optimization: {
  //   minimize: true,
  //   minimizer: [
  //     new UglifyJSPlugin({
  //       sourceMap: true,
  //       uglifyOptions: {
  //         compress: {
  //           unused: false,
  //           dead_code: false,
  //           warnings: true,
  //           join_vars: true,
  //           drop_console: true,
  //           comparisons: true,
  //           loops: true,
  //           drop_debugger: true,
  //         },
  //         output: {
  //           comments: false,
  //         },
  //       },
  //     }),
  //   ],
  // },
  resolve: {
    alias: {
      'css': path.resolve(__dirname, 'src/css'),
      'fonts': path.resolve(__dirname, 'src/css/fonts'),
      'img': path.resolve(__dirname, 'src/img'),
      'modules': path.resolve(__dirname, 'node_modules'),
      'bootstrap-scss': path.resolve(__dirname, 'node_modules/bootstrap/scss')
    }
  },
  // devtool: 'source-map'
}