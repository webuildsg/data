'use strict';

// get an array of numbers
// each number is the total number of events in a week

var utilsLib = require('../tasks/utils');
var moment = require('moment-timezone');
var fs = require('fs');

function getMonthNumber(generatedDate) {
  return moment(generatedDate).month();
}

function getTotalEventPerDay(events) {
  return events.length;
}

function getData() {
  var type = 'events';
  var yData = [];
  var currentMonth;

  utilsLib.listFilePaths(type).forEach(function(file, index) {
    var data = require('.' + file);

    if (currentMonth !== getMonthNumber(data.meta.generated_at)) {
      currentMonth = getMonthNumber(data.meta.generated_at);
      yData.push(getTotalEventPerDay(data.events));
    } else {
      yData[ yData.length - 1 ] += getTotalEventPerDay(data.events);
    }

    // console.log(getTotalEventPerDay(data.events) + ' events on week #' + getMonthNumber(data.meta.generated_at));
  })

  console.log(yData);
}

getData();
