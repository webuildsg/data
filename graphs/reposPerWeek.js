'use strict';

// get an array of numbers
// each number is the total number of events in a week

var utilsLib = require('../tasks/utils');
var moment = require('moment-timezone');
var fs = require('fs');

function getWeekNumber(generatedDate) {
  return moment(generatedDate).isoWeek();
}

function getTotalReposPerDay(repos) {
  return repos.length;
}

function getData() {
  var type = 'repos';
  var yData = [];
  var currentWeek;

  utilsLib.listFilePaths(type).forEach(function(file, index) {
    var data = require('.' + file);

    if (currentWeek !== getWeekNumber(data.meta.generated_at)) {
      currentWeek = getWeekNumber(data.meta.generated_at);
      yData.push(getTotalReposPerDay(data.repos));
    } else {
      yData[ yData.length - 1 ] += getTotalReposPerDay(data.repos);
    }

    // console.log(getTotalReposPerDay(data.events) + ' events on week #' + getWeekNumber(data.meta.generated_at));
  })

  console.log(yData);
}

getData();
