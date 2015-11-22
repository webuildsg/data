'use strict';

// get an array of numbers
// each number is the total number of events in a week

var utilsLib = require('../tasks/utils');
var moment = require('moment-timezone');
var fs = require('fs');

function getWeekNumber(generatedDate) {
  return moment(generatedDate).isoWeek();
}

function getTotalEventPerDay(events) {
  return events.length;
}

function getData() {
  var type = 'events';
  var answer = [];
  var groups = [];
  var replies = [];

  utilsLib.listFilePaths(type).forEach(function(file, index) {
    var data = require('.' + file);

    data.events.forEach(function(ev) {
      if (groups.indexOf(ev.group_name) < 0) {
        groups.push(ev.group_name)
        answer.push({
          group: ev.group_name,
          n: 1
        })
      } else {
        answer.forEach(function(a) {
          if (a.group === ev.group_name) {
            a.n += 1;
          }
        })
      }
    })
  })

  // show groups with at least 10 or more events
  answer.forEach(function(a) {
    if (a.n > 9) {
      replies.push(a)
    }
  })

  utilsLib.publishData('events-per-group', replies);
}

getData();
