'use strict';

// get an array of numbers
// each number is the total number of events on a day of the week

var utilsLib = require('../tasks/utils');
var moment = require('moment-timezone');
var fs = require('fs');

function getDayOfTheWeek(generatedDate) {
  // Sunday is 0 and Saturday is 6
  var answer = (moment(generatedDate).day() - 1) % 7;
  // compensate for +8GMT as the data is snap shotted at 3am +8GMT / 7pm GMT
  return answer === -1 ? 6 : answer;
}

function getTotalEventPerDay(events) {
  return events.length;
}

function getData() {
  var type = 'events';
  var yData = [ 0, 0, 0, 0, 0, 0, 0];

  utilsLib.listFilePaths(type).forEach(function(file, index) {
    var data = require('.' + file);
    console.log(data.meta.generated_at + '  Day: ' + getDayOfTheWeek(data.meta.generated_at))
    yData[ getDayOfTheWeek(data.meta.generated_at) ] += data.meta.total_events;
  })

  console.log(yData);
}

getData();
