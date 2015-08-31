var webpack = require('webpack');
var config = require('./webpack.config');


config.plugins = config.plugins.concat([
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
]);

webpack(config).run(function(err, stats) {
  if (err) console.log(err);
});
