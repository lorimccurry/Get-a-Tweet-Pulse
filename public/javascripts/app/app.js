/* global document, window, io */

$(document).ready(initialize);

var socket;
var map;
var center;
var markers = [];

var timer = 0;

function initialize(){
  $(document).foundation();
  initializeSocketIO();
  initMap(20, 0, 2);
  $('#start').on('click', clickPulse);
  $('#stop').on('click', clickStop);
  $('#resume').on('click', clickResume);
  $('#clear').on('click', clickClear);
  $('#originalZoom').on('click', clickOriginalZoom);
}

//------------------------------------------------------------------//
//------------------------------------------------------------------//
//------------------------------------------------------------------//
function clickPulse(event){
  // debugger;
  var query = $(this).parents('fieldset').find('input').val(); //targets the input data
  socket.emit('startsearch', {query:query});
  event.preventDefault();
  $('#status').text('');
  $('#status').text('Searching Tweets');
  $('#queryText').text('');
  $('#queryText').text(query);
  $('#userQuery').val('');
  $('#query').addClass('hidden');
  $('#tweetCounter').text('0');
}

function clickStop(event){
  socket.emit('stopsearch', {});
  $('#status').text('');
  $('#status').text('Search Stopping');
}

function clickResume(event){
  // debugger;
  var query = $('#userQuery').val();
  socket.emit('resumesearch', {query: query});
  $('#status').text('');
  $('#status').text('Resuming Twitter Connection');
  $('#resume').addClass('hidden');
}

function clickClear(event){
  socket.emit('cleartweets', {});
  $('#status').text('');
  $('#status').text('Clearing Tweets');
}

function clickOriginalZoom(event){
  // var zoom = new google.maps.LatLng(lat, lng);
  // map.setCenter(20, 0);
  // map.setZoom(2);

  // MyMap.map.setCenter(new google.maps.LatLng( 20, 0 ) );

  // map.panTo(20, 0);
  // setZoom(2);
}
//------------------------------------------------------------------//
//------------------------------------------------------------------//
//------------------------------------------------------------------//

function initMap(lat, lng, zoom){
  var mapOptions = {center: new google.maps.LatLng(lat, lng), zoom: zoom, mapTypeId: google.maps.MapTypeId.ROADMAP};
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  google.maps.event.trigger(map, 'resize');
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
  socket.on('twitterconnect', socketTwitterConnect);
  // socket.on('twitterreconnect', socketTwitterReconnect);
  socket.on('tweetsreturning', socketTweetsReturning);
}

function socketConnected(data){
  console.log(data);
}

function socketTweetsReturning(data){
  $('#status').text('');
  $('#status').text(data.status);
}

function socketTwitterConnect(data){
  $('#status').text('');
  $('#status').text(data.status);
}

// function socketTwitterReconnect(data){
//   // $('#status').text('');
//   // $('#status').text(data.status);
//   console.log(data.status);
// }

function socketNewTweet(data){
  // debugger;
  console.log(data);
  // console.log(data.text);

  // $('#data').append('<div><img src="' + data.profile_image_url + '"></div>');
  // console.log(data.full_name);
  $('#status').text('');
  $('#status').text('Tweets Returning');
  var myLatlng = new google.maps.LatLng(data.geo[0],data.geo[1]);
  var marker = new google.maps.Marker({
    position: myLatlng,
    map: map,
    icon: data.profileImageUrl
    // animation: google.maps.Animation.DROP
  });
  // iterator++;
  marker.setMap(map);
  markers.push(marker);
  htmlMarkerInfoWindow(map, marker, data);
  // htmlMarkerZoom(map, marker, data);
  htmlMapStats(data);
  htmlTweetScroll(data);
}

function socketStreamStopped(data){
  console.log(data);
  $('#status').text('');
  $('#status').text(data.status);
  $('#resume').removeClass('hidden');
}

function socketStreamResumed(data){
  console.log(data);
  $('#status').text('');
  $('#status').text(data.status);
}

function socketTweetsCleared(data){
  console.log(data);
  deleteMarkers();
  $('#status').text('');
  $('#status').text(data.status);
  $('#queryText').text('');
  $('#status').text('');
  $('#tweetCounter').text('');
  $('#query').removeClass('hidden');
  // $('#scroll').
}

//------------------------------------------------------------------//
//------------------------------------------------------------------//
//------------------------------------------------------------------//
function htmlMarkerInfoWindow(map, marker, data){
  var content = '<div class="tweetInfoWindow"><p><span>' + data.screenName + '</span>: ' + data.text + '</p></div>';
  var infowindow = new google.maps.InfoWindow({
    content: content,
    disableAutoPan: false,
    alignBottom: true
    // maxWidth: 200
  });

  google.maps.event.addListener(marker, 'mouseover', function() {
    infowindow.open(map,marker);
  });
  google.maps.event.addListener(marker, 'mouseout', function(){
    infowindow.close(map,marker);
  });
  // google.maps.event.addListener(marker, 'click', function(musician){
  //   window.location = ;
  // });
}

function htmlMarkerZoom(map, marker, data){
  google.maps.event.addListener(map, 'center_changed', function() {
  // 3 seconds after the center of the map has changed, pan back to the
  // marker.
    window.setTimeout(function() {
      map.panTo(marker.getPosition());
    }, 3000);
  });

  google.maps.event.addListener(marker, 'click', function() {
    map.setZoom(8);
    map.setCenter(marker.getPosition());
  });
}

function htmlMapStats(){
  var number = parseInt($('#tweetCounter').text(), 10);
  number += 1;
  $('#tweetCounter').text(number);

  // $('#tweetCounter').text('');
  // $('#tweetCounter').text(markers.length);
}

function updateTimer(){
  var timer = document.getElementById('timer');
  timer.innerHTML = Date();
}

function htmlTweetScroll(data){
  var scrollTweet = ('<div class="scrollTweet"><p><img src="' + data.profileImageUrl + '"><span>' + data.screenName + '</span>: ' + data.text + '</p></div>');
  // debugger;
  if($('.scrollTweet p').length === 5){
    $('.scrollTweet p').last().remove();
  }
  $('#scroll').prepend(scrollTweet);
}
//------------------------------------------------------------------//
//------------------Google Map Functions----------------------------//
//------------------------------------------------------------------//

function setAllMap(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function deleteMarkers(){
  clearMarkers();
  markers = [];
}

function clearMarkers() {
  setAllMap(null);
}

function showMarkers() {
  setAllMap(map);
}


// function calculateCenter() {
//   center = map.getCenter();
// }
// google.maps.event.addDomListener(map, 'idle', function() {
//   calculateCenter();
// });
// google.maps.event.addDomListener(window, 'resize', function() {
//   map.setCenter(center);
// });

// function drop() {
//   for (var i = 0; i < neighborhoods.length; i++) {
//     setTimeout(function() {
//       addMarker();
//     }, i * 200);
//   }
// }
