'use strict';

// get an array of objects
// each number is the total number of events in the day of the week

var utilsLib = require('../tasks/utils');

function getData() {
  var answer = utilsLib.getTotalByProperty('events', 'time');
  var replies = [];

  answer = answer.sort(function(a, b) {
    if (a.time > b.time) {
      return 1;
    }
    if (a.time < b.time) {
      return -1;
    }

    return 0;
  })

  answer.forEach(function(a) {
    if (a.n > 9) {
      replies.push({
        time: a.time + 'h',
        n: a.n
      })
    }
  })

  utilsLib.publishData('events-per-time-of-day', replies);
}

getData();
