var mongoose = require('mongoose');
var Tweet = mongoose.model('Tweet');

/*
 * GET /
 */

exports.index = function(req, res){
  res.render('tweets/index', {title: 'Twitter Map Search'});
};


/*
 * GET /tweet/:id
 */

exports.show = function(req, res){
  Tweet.findById(req.params.id, function(err,tweet){
    res.render('tweets/show', {title: 'Show Tweet', tweet:tweet});
  });
};