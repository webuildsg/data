'use strict';

// get an array of objects
// each number is the total number of events in the day of the week

var utilsLib = require('../tasks/utils');
var moment = require('moment-timezone');

function getDuration(ev) {
  // round up the hours to reduce / smoothen noise
  return Math.ceil(moment(ev.end_time).diff(ev.start_time) / 60 / 60 / 1000);
}

function getData() {
  var type = 'events';
  var answer = [];
  var durations = [];
  var replies = [];
  var countMoreThan10 = 0;

  utilsLib.listFilePaths(type).forEach(function(file) {
    var data = require('.' + file);

    data.events.forEach(function(ev) {
      var duration = getDuration(ev);

      if (durations.indexOf(duration) < 0) {
        answer.push({
          duration: duration,
          n: 1
        })
        durations.push(duration);
      } else {
        answer.forEach(function(a) {
          if (a.duration === duration) {
            a.n += 1;
          }
        })
      }
    })
  })

  // remove noise: add only below 10 hours
  answer.forEach(function(a) {
    if (a.duration > 0 && a.duration < 10) {
      replies.push(a);
    } else {
      countMoreThan10++;
    }
  })

  // group durations for more than 10
  replies.push({
    duration: 10,
    n: countMoreThan10
  })

  // sort duration
  replies = replies.sort(function(a, b) {
    if (a.duration > b.duration) {
      return 1;
    }
    if (a.duration < b.duration) {
      return -1;
    }

    return 0;
  })

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
