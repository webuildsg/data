'use strict';

// get an array of numbers
// each number is the total number of events in a week

var utilsLib = require('../tasks/utils');
var moment = require('moment-timezone');
var fs = require('fs');

function getTotalEventPerDay(events) {
  return events.length;
}

function getData() {
  var type = 'events';
  var yData = [];
  var currentWeek;

  utilsLib.listFilePaths(type).forEach(function(file, index) {
    var data = require('.' + file);

    if (currentWeek !== utilsLib.getWeekNumber(data.meta.generated_at)) {
      currentWeek = utilsLib.getWeekNumber(data.meta.generated_at);
      yData.push(getTotalEventPerDay(data.events));
    } else {
      yData[ yData.length - 1 ] += getTotalEventPerDay(data.events);
    }
  })

  console.log(yData);
}

getData();
