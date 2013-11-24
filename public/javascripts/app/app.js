/* global document, window, io */

$(document).ready(initialize);

var socket;
var map;
var markers = [];

function initialize(){
  $(document).foundation();
  initializeSocketIO();
  // initMap(40, -95, 2);
  initMap(50, 0, 2);
  $('#start').on('click', clickPulse);
  $('#stop').on('click', clickStop);
  $('#resume').on('click', clickResume);
  $('#clear').on('click', clickClear);
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
  $('#status').text('');
  $('#status').text('Searching Tweets');
  $('#queryText').text('');
  $('#queryText').text(query);
}

function clickStop(event){
  socket.emit('stopsearch', {});
  $('#status').text('');
  $('#status').text('Search Stopping');
}

function clickResume(event){
  // debugger;
  var query = $('#userQuery').val();
  // socket.emit('resumesearch', {query: query});
  socket.emit('startsearch', {query:query});
  $('#status').text('');
  $('#status').text('Search Resuming');
}

function clickClear(event){
  socket.emit('cleartweets', {});
  $('#status').text('');
  $('#status').text('Clearing Tweets');

}
//------------------------------------------------------------------//
//------------------------------------------------------------------//
//------------------------------------------------------------------//

function initMap(lat, lng, zoom){
  var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
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
  socket.on('streamstopped', socketStreamStopped);
  socket.on('streamresumed', socketStreamResumed);
  socket.on('tweetscleared', socketTweetsCleared);
}

function socketConnected(data){
  console.log(data);
}

function socketNewTweet(data){
  console.log(data);
  // console.log(data.text);

  // $('#data').append('<div><img src="' + data.profile_image_url + '"></div>');
  // console.log(data.full_name);
  var myLatlng = new google.maps.LatLng(data.geo[0],data.geo[1]);
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    title: data.screen_name + ': ' + data.text,
    icon: data.profile_image_url
  });
  marker.setMap(map);
  markers.push(marker);

  htmlMapStats(data);

}

function socketStreamStopped(data){
  console.log(data);
  $('#status').text('');
  $('#status').text('Search Stopped');
}

function socketStreamResumed(data){
  console.log(data);
  $('#status').text('');
  $('#status').text('Search Resumed');
}

function socketTweetsCleared(data){
  console.log(data);
  deleteMarkers()
}

//------------------------------------------------------------------//
//------------------------------------------------------------------//
//------------------------------------------------------------------//

function htmlMapStats(data){

}
//------------------------------------------------------------------//
//------------------------------------------------------------------//
//------------------------------------------------------------------//


function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function clearMarkers() {
  setAllMap(null);
}

function showMarkers() {
  setAllMap(map);
}

function deleteMarkers(){
  clearMarkers();
  markers = [];
}