var webpack = require('webpack');
var config = require('./webpack.config');


config.plugins = config.plugins.concat([
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin()
]);

webpack(config).run(function(err, stats) {
  var errors = stats.toJson({hash:true}).errors;
  if (err) console.log(err);
  for (var x in errors) {
    console.error(errors[x]);
  }
});
