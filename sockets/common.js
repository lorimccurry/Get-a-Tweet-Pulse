var async = require('async');
var __ = require('lodash');
var Twit = require('twit');
var express = require('express');
var mongoose = require('mongoose');
var Tweet = mongoose.model('Tweet');
var io;

exports.connection = function(socket){
  var io = this;
  console.log('this is the SOCKET: ', socket);
  socket.emit('connected', {status: 'connected'});

  var T = new Twit({

  });
  // locations: ['122.75','36.8','-121.75','37.8']
  var stream = null;

  socket.on('stopsearch', function(){
    stream.stop();
    socket.emit('streamstopped', {status: 'stream stopped'});
  });

  socket.on('resumesearch', function(){
    stream.start();
    socket.emit('streamresumed', {status: 'stream resumed'});
  });

  var db;
  socket.on('cleartweets', function(){
    stream.stop();
    Tweet.remove(function(err, tweets){
      if (err){
        console.log('Error clearing db', err);
      } else {
        console.log('cleared tweets db');
        socket.emit('tweetscleared', {status: 'tweets cleared'});
      }
    });
  });

  socket.on('startsearch', function(data){
    // console.log(data)
    var options = [];
    // var options = { track: data.query, locations: [-180,-90,180,90]}; //NEED TO COME BACK TO THIS - NOT FILTERING W/O IT!!
    // var options = { track: data.query}; //this doesnt work w/o criteria
    // if(data.query){
      // options['track'] = data.query;
    // }
    // options['locations'] = [-180,-90,180,90];

    if(data.query){
      options.track = data.query;
    } else {
      options.locations = [-180,-90,180,90];
    }

    console.log('These are OPTIONS: %%%%%%%%%%%%%%%%%%%%5 ', options);

    stream = T.stream('statuses/filter', options);
    stream.on('tweet', function (tweet) {
      if(tweet.geo) {
        // console.log(tweet.place.full_name); //full name and name don't always have data, so the function kicks out at that point
        // console.log(tweet.place.name);
        var newTweet = new Tweet({
          geo: tweet.geo.coordinates,
          screen_name: tweet.user.screen_name,
          name: tweet.user.name,
          lang: tweet.lang,
          text: tweet.text,
          profile_image_url: tweet.user.profile_image_url,
          //place_name: tweet.place.name,
          place_full_name: tweet.place ? tweet.place.full_name:null,
          query: data.query
        });
        newTweet.save(function(err, result){

          // Send to sockets
          if (err){
            console.log('Error: ' + err.message);
          } else {
            console.log('inserted into database');
            socket.emit('newTweet', result);
          }
        });
      }
    });

    stream.on('tweet', function (tweet) {
      // console.log('TWWEETTY!***************************');
    });

    stream.on('delete', function (deleteMessage) {
      console.log('DELETED TWEET!#################');
      console.log(deleteMessage);
    });

    stream.on('scrub_geo', function (scrubGeoMessage) {
      console.log('SCRUB GEO ' , scrubGeoMessage);
    });

    stream.on('limit', function (limitMessage) {
      console.log('LIMIT MESSAGE ' , limitMessage);
    });

    stream.on('disconnect', function (disconnectMessage) {
      console.log('DISCONNECT MESSSAGE ' , disconnectMessage);
    });

    stream.on('connect', function (request) {
      console.log('CONNECT ATTEMPT ' , request);
    });
  });
};

function socketStartSearch(data){
  console.log('this is the socket', data);
}

function socketDisconnect(){
}