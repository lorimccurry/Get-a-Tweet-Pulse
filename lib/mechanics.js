var mongoose = require('mongoose');
// var Tweet = mongoose.model('Tweet');
var __ = require('lodash');
var Twit = require('twit');
var T = require('./node_modules/twitterModule')


var stream = T.stream('statuses/filter', { track: 'bieber', geo_enabled: true});
  stream.on('tweet', function (tweet) {
    var newTweet = new Tweet(tweet);

    console.log(newTweet);
    // newTweet.save(function(err, newTweet){
    //   if (err){
    //     console.log('Error: ' + err.message);
    //   } else {
    //     console.log('inserted into database');
    //   }
    // });
    // console.log(tweet);
    console.log(tweet.user.screen_name + ': ' + tweet.text);
    // console.log(tweet.user.screen_name);
    // console.log(tweet.place_id);
    // console.log(tweet.attributes);
    console.log(tweet.coordinates);
    // console.log(tweet.bounding_box);
    console.log(tweet.place);
    // console.log(tweet.geo);
    // console.log(tweet.user.geo);
    console.log(tweet.user.geo_enabled);
    // console.log(tweet.user.profile_image_url_https);
});



stream.on('tweet', function (tweet) {
  console.log('TWWEETTY!***************************');
});

stream.on('delete', function (deleteMessage) {
  console.log('DELETED TWEET!#################');
  console.log(deleteMessage);
});

stream.on('scrub_geo', function (scrubGeoMessage) {
  console.log('SCRUB GEO ' + scrubGeoMessage);
});

stream.on('limit', function (limitMessage) {
  console.log('LIMIT MESSAGE ' + limitMessage);
});

stream.on('disconnect', function (disconnectMessage) {
  console.log('DISCONNECT MESSSAGE ' + disconnectMessage);
});

stream.on('connect', function (request) {
  console.log('CONNECT ATTEMPT ' + request);
});