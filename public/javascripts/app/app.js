/* global document, window, io */

$(document).ready(initialize);

var socket;

function initialize(){
  $(document).foundation();
  initializeSocketIO();
  initMap(40, -95, 4);
  $('#start').on('click', clickPulse);
  $('#stop').on('click', clickStop);
}

//------------------------------------------------------------------//
//------------------------------------------------------------------//
//------------------------------------------------------------------//
function clickPulse(event){
  // debugger;
  var query = $(this).parents('fieldset').find('input').val(); //targets the input data
  socket.emit('startsearch', {query:query});
  // $(this).addClass('hidden');
  event.preventDefault();
}

// function clickStop(event){
//   socket.emit('stopsearch', {});
// }

//------------------------------------------------------------------//
//------------------------------------------------------------------//
//------------------------------------------------------------------//

function initMap(lat, lng, zoom){
  var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}


//------------------------------------------------------------------//
//------------------------------------------------------------------//
//------------------------------------------------------------------//
function initializeSocketIO(){
  var port = window.location.port ? window.location.port : '80';
  var url = window.location.protocol + '//' + window.location.hostname + ':' + port + '/app';

  socket = io.connect(url);
  socket.on('connected', socketConnected);
  socket.on('newTweet', socketNewTweet);
}

function socketConnected(data){
  console.log(data);
}

function socketNewTweet(data){
  $('#data').append('<p><a href="/tweet/'+data._id+'">'+data.screen_name+'</a></p>');
  console.log(data.full_name);



}