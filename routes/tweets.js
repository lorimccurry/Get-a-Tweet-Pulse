/*
 * GET /
 */

exports.index = function(req, res){
  res.render('tweets/index', {title: 'Twitter Map Search'});
};
