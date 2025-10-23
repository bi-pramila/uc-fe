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
      // your loaders/rules here
    ]
  },

  plugins: [
    // your plugins here
  ],
};
