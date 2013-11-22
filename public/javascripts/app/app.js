/* global document, window, io */

$(document).ready(initialize);

var socket;

function initialize(){
  $(document).foundation();
  initializeSocketIO();
  initMap(40, -95, 4);
  $('#start').on('click', clickPulse);
  $('#stop').on('click', clickStop);
  $('#resume').on('click', clickResume);
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
}

function clickStop(event){
  socket.emit('stopsearch', {});
}

function clickResume(event){
  // debugger;
  var query = $('#user-query').val();
  // socket.emit('resumesearch', {query: query});
  socket.emit('startsearch', {query:query});
  $('#status').text('');
  $('#status').text('Search Resumed');
}
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
  socket.on('streamstopped', socketStreamStopped);
  // socket.on('streamresumed', socketStreamResumed);
}

function socketConnected(data){
  console.log(data);
}

function socketNewTweet(data){
  console.log(data.geo);
  console.log(data.text);
  // $('#data').append('<div><img src="' + data.profile_image_url + '"></div>');
  // console.log(data.full_name);
  // var marker = new google.maps.Marker({
  //   position: data.geo,
  //   title: data.screen_name + ': ' + data.text
  // });
  // marker.setMap(map);

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