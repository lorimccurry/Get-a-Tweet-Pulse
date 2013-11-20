'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  teardownTest();
  initialize(null, true);
  // seats = [];
}

function teardownTest(){
  // $('#createSeats').off('click', clickCreateSeats);
  // $('#ga').off('dblclick', '.seat', dblclickReserveSeat);
  // $('#vip').off('dblclick', '.seat', dblclickReserveSeat);
}


// test( "hello test", function() {
//   ok( 1 == "1", "Passed!" );
// });