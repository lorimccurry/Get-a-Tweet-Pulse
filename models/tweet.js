var mongoose = require('mongoose');

var Tweet = mongoose.Schema({

  screenName        : String,
  profileImageUrl   : String,
  text              : String,
  lang              : String,
  geo               : Array,
  name              : String,
  placeFullName     : String,
  query             : String,
  createdAt         : {type: Date, default: Date.now}
});

mongoose.model('Tweet', Tweet);
