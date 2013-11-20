/* global document, window, io */

$(document).ready(initialize);

var socket;

function initialize(){
  $(document).foundation();
  initializeSocketIO();
  initMap(40, -95, 4);
  $('#start').on('click', clickPulse);
}

//------------------------------------------------------------------//
//------------------------------------------------------------------//
//------------------------------------------------------------------//
function clickPulse(event){
  // debugger;
  var query = $(this).parents('fieldset').find('input').val(); //targets the input data
  socket.emit('startsearch', {query:query});
  $(this).addClass('hidden');
  event.preventDefault();
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
  // socket.on('startsearch', socketStartSearch);
}

function socketConnected(data){
  console.log(data);
}
