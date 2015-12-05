'use strict';

var utilsLib = require('../tasks/utils');

function getData() {
  var answer = utilsLib.getTotalByProperty('events', 'duration');
  var replies = [];
  var countMoreThan10 = 0;

  answer.forEach(function(a) {
    if (a.duration > 0 && a.duration < 10) {
      replies.push(a);
    } else {
      countMoreThan10++;
    }
  })

  replies.push({
    duration: 10,
    n: countMoreThan10
  })

  replies = utilsLib.sortByNumber(replies, 'duration');

  // set label
  replies.forEach(function(r) {
    if (r.duration === 10) {
      r.duration = '10 hours or more';
    } else if (r.duration === 1) {
      r.duration = '0 - 1 hour';
    } else {
      r.duration = (r.duration - 1) + ' - ' + r.duration + ' hours';
    }
  })

  utilsLib.publishData('events-per-duration', replies);
}

getData();
