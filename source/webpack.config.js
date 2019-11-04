const path = require('path');

module.exports = {
  entry: {
    member: './api/jsx/main_member.jsx',
    leader: './api/jsx/main_leader.jsx',
    organizer: './api/jsx/main_organizer.jsx'
  },
  output: {
    path: path.join(__dirname, '/api/static/js/'),
    filename: '[name]_bundle.js',
  },
  module: {
    rules: [
      {
        // Test for js or jsx files
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          // Convert ES6 syntax to ES5 for browser compatibility
          presets: ["@babel/preset-react", '@babel/preset-env'],
          compact: false,
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};