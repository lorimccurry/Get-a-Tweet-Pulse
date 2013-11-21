var mongoose = require('mongoose');

var Tweet = mongoose.Schema({
  // tweet:  [{}],
  // coordinates        : [{}],

  // user  : {},
  screen_name       : String,
  profile_image_url : String,
  text              : String,
  lang              : String,
  geo               : Array,
  name              : String,
  // place : [{}],
  // place_type: String,
  // name: String,
  full_name: String,
  // country_code: String,
  // country: String,
  // // place.bounding_box: {}, //this is what the format looks like from twitter
  // // coordinates: Collection of Float,
  // type: String,
  // attributes: String, //this is the city street - don't know if i need this or not

  // query: String,

  createdAt     : {type: Date, default: Date.now}

});

mongoose.model('Tweet', Tweet);
