var Twit = require('twit');
var express = require('express');

exports.connection = function(socket){
  console.log('THE CONNECTION FUNCTION JUST GOT CALLED!!!!!!');
  var io = this;
  socket.emit('connected', {status: 'connected'});
  var T = new Twit({
    consumer_key: process.env.TW_CONSUMER_KEY,
    consumer_secret: process.env.TW_CONSUMER_SEC,
    access_token: process.env.TW_ACCESS_TOKEN,
    access_token_secret: process.env.TW_ACCESS_TKSEC
  });
  socket.emit('connected', {status: 'initialized'});
  var stream = null;

  socket.on('stopsearch', function(){stopSearch(stream, socket);});

  socket.on('resumesearch', function(){resumeSearch(stream, socket);});

  socket.on('cleartweets', function(){clearTweets(stream, socket);});

  socket.on('startsearch', function(data){
    console.log(data);
    var options = [];

    if(data.query){
      options.track = data.query;
    } else {
      options.locations = [-180,-90,180,90];
    }

    stream = T.stream('statuses/filter', options);

    stream.on('tweet', function (tweet) {
      createTweet(tweet, stream, data, socket);
    });

    stream.on('tweet', function (tweet) {
      socket.emit('tweetsreturning', {status: 'Listening for Tweets'});
    });

    stream.on('limit', function (limitMessage) {
      console.log('LIMIT MESSAGE ' , limitMessage);
    });

    stream.on('disconnect', function (disconnectMessage) {
      console.log('DISCONNECT MESSSAGE ' , disconnectMessage);
    });

    stream.on('connect', function (request) {
      console.log('CONNECT ATTEMPT');
      socket.emit('twitterconnect', {status: 'Waiting on Twitter'});
      console.log("emitted")
    });
  });
};

function stopSearch(stream, socket){
  stream.stop();
  socket.emit('streamstopped', {status: 'Twitter search stopped'});
  console.log('Twitter search stopped');
}

function resumeSearch(stream, socket){
  stream.start();
  socket.emit('streamresumed', {status: 'Twitter search resumed'});
  console.log('Resuming Twitter Search');
}

function clearTweets(stream, socket){
  stream.stop();
  socket.emit('tweetscleared', {status: 'Tweets cleared'});
}

function createTweet(tweet, stream, data, socket){
  if(tweet.geo) {
    var result = {
      geo: tweet.geo.coordinates,
      screenName: tweet.user.screen_name,
      name: tweet.user.name,
      lang: tweet.lang,
      text: tweet.text,
      profileImageUrl: tweet.user.profile_image_url,
      placeFullName: tweet.place ? tweet.place.full_name:null,
      query: data.query
    };
    socket.emit('newTweet', result);
    console.log('New Tweet!')
  }
}

function socketStartSearch(data){
  console.log('this is the socket', data);
}