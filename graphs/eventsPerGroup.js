'use strict';

// get an array of numbers
// each number is the total number of events in a week

var utilsLib = require('../tasks/utils');

function getData(attr) {
  var type = 'events';
  var answer = [];
  var groups = [];
  var replies = [];

  utilsLib.listFilePaths(type).forEach(function(file) {
    var data = require('.' + file);

    data.events.forEach(function(ev) {
      if (groups.indexOf(ev[ attr ]) < 0) {
        groups.push(ev[ attr ])
        answer.push({
          group: ev[ attr ],
          n: 1
        })
      } else {
        answer.forEach(function(a) {
          if (a.group === ev[ attr ]) {
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

getData('group_name');
