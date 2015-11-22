'use strict';

// get an array of numbers
// each number is the total number of events in a week

var utilsLib = require('../tasks/utils');

function getTotalEventPerDay(events) {
  return events.length;
}

function getData(attr) {
  var type = 'events';
  var yData = [];
  var currentWeek;
  var answer = {};

  utilsLib.listFilePaths(type).forEach(function(file) {
    var data = require('.' + file);

    if (currentWeek !== utilsLib.getWeekNumber(data.meta[ attr ])) {
      currentWeek = utilsLib.getWeekNumber(data.meta[ attr ]);
      yData.push(getTotalEventPerDay(data.events));
    } else {
      yData[ yData.length - 1 ] += getTotalEventPerDay(data.events);
    }
  })

  answer = {
    events: yData
  };

  utilsLib.publishData('events-per-week', answer);
}

getData('generated_at');
