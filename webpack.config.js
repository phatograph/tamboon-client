var autoprefixer = require('autoprefixer');
var precss       = require('precss');
var path         = require('path');
var webpack      = require('webpack')

module.exports = {
  entry: [
    path.resolve(__dirname, 'app/app.js')
  ],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },
  module: {
    loaders: [
    {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015']
      }
    },
    {
      test:   /\.css$/,
      exclude: /(node_modules|bower_components)/,
      loader: "style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader!postcss-loader"
    }
    ],
  },
  postcss: function () {
    return [autoprefixer];
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env':{
        'OMISE_PKEY': JSON.stringify(process.env.OMISE_PKEY)
      }
    }),
  ],
  devServer: {
    colors: true,
    progress: true,
    historyApiFallback: true,
    port: 4000,
    contentBase: 'build'
  }
};
