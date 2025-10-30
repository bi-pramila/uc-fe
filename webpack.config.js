// webpack.config.js

module.exports = {
  entry: './src/index.js',    // or your entry point
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  
  resolve: {
   extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },

  module: {
    rules: [
      {
        test: /\.scss$/i,
        use: [
          'style-loader', // Injects styles into the DOM
          'css-loader',   // Turns CSS into CommonJS modules
          'sass-loader'   // Compiles Sass to CSS
        ],
      },
    ]
  },

  plugins: [
    // your plugins here
  ],
};
