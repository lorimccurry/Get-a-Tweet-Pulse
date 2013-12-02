var express = require('express');
var mongoose = require('mongoose');
var Twit = require('twit');


// model definitions
require('require-dir')('./models');
var Tweet = mongoose.model('Tweet');

// route definitions
var tweets = require('./routes/tweets');

var app = express();
var RedisStore = require('connect-redis')(express);
mongoose.connect('mongodb://localhost/twitter-map');

// configure express
require('./config').initialize(app, RedisStore);

// routes
app.get('/', tweets.index);
app.get('/tweet/:id', tweets.show);

// start server & socket.io
var common = require('./sockets/common');
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, {log: true, 'log level': 2});
server.listen(app.get('port'));
io.of('/app').on('connection', common.connection);