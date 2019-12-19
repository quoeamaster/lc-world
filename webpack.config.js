module.exports = {
  entry: './main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(jpg|jpeg|svg|gif|png|eot|woff|ttf)$/,
        loaders: [
          'url-loader'
        ]
      }
    ]
  }
}
