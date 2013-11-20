var async = require('async');
var __ = require('lodash');
var m = require('../lib/mechanics');
var io;

exports.connection = function(socket){
  io = this;
  // console.log(socket);
  socket.emit('connected', {status: 'connected'});
  socket.on('disconnect', socketDisconnect);
  socket.on('startsearch', socketStartSearch);
};

function socketStartSearch(data){
  console.log(data);
}

function socketDisconnect(){
}
