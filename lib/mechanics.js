// var mongoose = require('mongoose');
// var Tweet = mongoose.model('Tweet');
// var Twit = require('twit');
// var T = require('./node_modules/twitterModule/twitterModule.js')


// exports.newPlayer = function(name, color, fn){
//   new Player({name:name, color:color}).save(function(err, player){
//     fn(err, player);
//   });
// };



// var T = new Twit({
//   consumer_key: 'qjFfLTPvNYFGMMUlZuQ5cQ',
//   consumer_secret: 'iQYnUO6gsYPem9fYs0nOmT9fDw2JKPfb11WTvAg5tTM',
//   access_token: '130018142-Yi20QwrR1q23JWrb25I1WCYn1MNMnXRZJMSdB0W6',
//   access_token_secret: 'hUgumhMlbU4xyTOQC0dvxf9pdTrmJ1bIPYHMuMlvt3Lm7'
// });
// // locations: ['122.75','36.8','-121.75','37.8']
// var stream = T.stream('statuses/filter', { track: "thanksgiving", lang: 'en' , geo_enabled: true});
//   stream.on('tweet', function (tweet) {
//     if(tweet.geo) {
//       //console.log(tweet);
//       var newTweet = new Tweet({
//         geo: tweet.geo.coordinates,
//         screen_name: tweet.user.screen_name,
//         name: tweet.user.name,
//         lang: tweet.lang,
//         text: tweet.text,
//         profile_image_url: tweet.user.profile_image_url,
//         //place_name: tweet.place.name,
//         //place_full_name: tweet.place.full_name
//       });
//       newTweet.save(function(err, newTweet){

//         // Send to sockets
//         if (err){
//           console.log('Error: ' + err.message);
//         } else {
//           console.log('inserted into database');
//         }
//       });

//     }
// });



// stream.on('tweet', function (tweet) {
//   //console.log('TWWEETTY!***************************');
// });

// stream.on('delete', function (deleteMessage) {
//   console.log('DELETED TWEET!#################');
//   console.log(deleteMessage);
// });

// stream.on('scrub_geo', function (scrubGeoMessage) {
//   console.log('SCRUB GEO ' + scrubGeoMessage);
// });

// stream.on('limit', function (limitMessage) {
//   console.log('LIMIT MESSAGE ' + limitMessage);
// });

// stream.on('disconnect', function (disconnectMessage) {
//   console.log('DISCONNECT MESSSAGE ' + disconnectMessage);
// });

// stream.on('connect', function (request) {
//   console.log('CONNECT ATTEMPT ' , request);
// });