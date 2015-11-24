'use strict';

// get an array of objects
// each number is the total number of events in the day of the week

var utilsLib = require('../tasks/utils');
var moment = require('moment-timezone');

function getTimeOfEvent(ev) {
  return moment(ev.formatted_time, 'DD MMM YYYY, ddd, h:mm a').format('HHmm');
}

function getData(attr) {
  var type = 'events';
  var times = [];
  var answer = [];
  var replies = [];

  utilsLib.listFilePaths(type).forEach(function(file) {
    var data = require('.' + file);

    data.events.forEach(function(ev) {
      var thisTime = getTimeOfEvent(ev);

      if (times.indexOf(thisTime) < 0) {
        times.push(thisTime);
        answer.push({
          time: thisTime,
          events: 1
        });
      } else {
        answer.forEach(function(a) {
          if (a.time === thisTime) {
            a.events += 1;
          }
        })
      }
    })
  })

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
    if (a.events > 9) {
      replies.push(a)
    }
  })

  console.log(replies)

  // utilsLib.publishData('events-per-day-of-week', replies);
}

getData('group_name');
