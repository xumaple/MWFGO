const path = require('path');

module.exports = {
  entry: {
    member: './api/jsx/person/member.jsx',
    member_intro: './api/jsx/entry/member_intro.jsx',
    // leader: './api/jsx/entry/leader.jsx',
    // leader_intro: './api/jsx/entry/leader_intro.jsx',
    organizer: './api/jsx/person/organizer/index.jsx',
    event_configure: './api/jsx/person/organizer/event_configure.jsx',
    event_results: './api/jsx/person/organizer/event_results.jsx',
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
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
