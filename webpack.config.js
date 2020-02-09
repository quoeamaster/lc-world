module.exports = {
  /*
  entry: './main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },*/
  entry: {
    index: './main.js',
    /*photo: './photo.js',
    story: './story.js'*/
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name]_bundle.js'
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
