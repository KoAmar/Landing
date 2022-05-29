const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
// const PurgecssPlugin = require('purgecss-webpack-plugin')
// const PATHS = {
//   src: path.join(__dirname, 'src')
// }


module.exports = {
  mode: 'production',
  entry: './src/js/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    // assetModuleFilename: 'assets/[name][ext][query]',
    assetModuleFilename: 'assets/[name]-[hash][ext][query]',
    filename: 'index-[contenthash].js',
    clean: true
  },
  // devServer: {
  //   port: 8080,
  //   open: true,
  //   compress: true,
  //   hot: true,
  //   liveReload: true,
  //   watchFiles: ["src/*.html"],
  // },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]-[contenthash].css',
      // minify: CssMinimizerPlugin.cleanCssMinify,
    }),
    // new PurgecssPlugin({
    //   paths: glob.sync(`${PATHS.src}/**/*`, { nodir: true }),
    // }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      // filename:  'index-[contenthash].html'
      filename: 'index.html'
    })
  ],
  module: {
    rules: [
      { test: /\.html$/, use: 'html-loader' },
      {
        test: /\.s?css$/, use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          { loader: 'css-loader', options: { sourceMap: false } },
          'postcss-loader',
          { loader: 'sass-loader', options: { sourceMap: false } },
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