const path = require('path');

module.exports = {
  entry: {
    member: './jsx/main_member.jsx',
    leader: './jsx/main_leader.jsx',
    organizer: './jsx/main_organizer.jsx'
  },
  output: {
    path: path.join(__dirname, '/js/'),
    filename: '[name]_bundle.js',
  },
  module: {
    loaders: [
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
