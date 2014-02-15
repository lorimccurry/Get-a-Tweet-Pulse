
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
};