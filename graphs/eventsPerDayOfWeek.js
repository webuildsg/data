'use strict';

var utilsLib = require('../tasks/utils');
var moment = require('moment-timezone');

function getDayOfWeek(ev) {
  return moment(ev.formatted_time, 'DD MMM YYYY, ddd, h:mm a').format('dddd');
}

function getData() {
  var type = 'events';
  var answer = {
    'Monday': 0,
    'Tuesday': 0,
    'Wednesday': 0,
    'Thursday': 0,
    'Friday': 0,
    'Saturday': 0,
    'Sunday': 0
  };
  var replies = [
    { day: 'Monday', n: 0 },
    { day: 'Tuesday', n: 0 },
    { day: 'Wednesday', n: 0 },
    { day: 'Thursday', n: 0 },
    { day: 'Friday', n: 0 },
    { day: 'Saturday', n: 0 },
    { day: 'Sunday', n: 0 }
  ];

  utilsLib.listFilePaths(type).forEach(function(file) {
    var data = require('.' + file);

    data.events.forEach(function(ev) {
      answer[ getDayOfWeek(ev) ] += 1;
    })
  })

  replies.forEach(function(r) {
    r.n = answer[ r.day ];
  })

  utilsLib.publishData('events-per-day-of-week', replies);
}

getData();
