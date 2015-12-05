'use strict';

// common functions

var fs = require('fs');
var path = require('path');
var moment = require('moment-timezone');

function listFilePaths(type) {
  var allFiles = fs.readdirSync('./data/' + type + '/v1');
  var jsonFilePaths = [];

  allFiles.forEach(function(file) {
    if (path.extname(file) === '.json') {
      jsonFilePaths.push('./data/' + type + '/v1/' + file);
    }
  })

  return jsonFilePaths;
}

function getDuration(event) {
  // round up the hours to reduce / smoothen noise
  return Math.ceil(moment(event.end_time).diff(event.start_time) / 60 / 60 / 1000);
}

function getTimeOfEvent(ev) {
  return moment(ev.formatted_time, 'DD MMM YYYY, ddd, h:mm a').format('HHmm');
}

function getCurrentDayData(data, type) {
  var today = moment(data.meta.generated_at);
  var compare = type === 'events' ? 0 : 1;
  var compareTime = type === 'events' ? 'start_time' : 'pushed_at';
  var answer = {};
  answer.meta = data.meta;
  answer[ type ] = [];

  data[ type ].forEach(function(element) {
    if (today.diff(moment(element[ compareTime ]), 'days') === compare) {
      answer[ type ].push(element);
    }
  })

  answer.meta['total_' + type] = answer[ type ].length;

  return answer;
}

function getWeekNumber(generatedDate) {
  return moment(generatedDate).isoWeek();
}

function getTotalByProperty(type, propertyName) {
  var list = [];
  var answer = [];

  listFilePaths(type).forEach(function(file) {
    var data = require('.' + file);

    data.events.forEach(function(ev) {
      var property;
      var newObject = {};

      if (propertyName === 'time') {
        property = getTimeOfEvent(ev);
      } else if (propertyName === 'duration') {
        property = getDuration(ev);
      }

      newObject.n = 1;
      newObject[ propertyName ] = property;

      if (list.indexOf(property) < 0) {
        list.push(property);
        answer.push(newObject);
      } else {
        answer.forEach(function(a) {
          if (a[ propertyName ] === property) {
            a.n += 1;
          }
        })
      }
    })
  })

  return answer;
}

function sortByAlphabet(array, property) {
  return array.sort(function(a, b) {
    return a[ property ].toLowerCase().localeCompare(b[ property ].toLowerCase());
  })
}

function sortByNumber(array, property) {
  return array.sort(function(a, b) {
    if (a[ property ] > b[ property ]) {
      return 1;
    }

    if (a[ property ] < b[ property ]) {
      return -1;
    }

    return 0;
  })
}

function publishData(name, data) {
  fs.writeFile('public/data/' + name + '.json', JSON.stringify(data), function (err) {
    if (err) {
      console.log(err)
    }

    // console.log('File public/data/' + name + '.json saved!');
  });
}

exports.listFilePaths = listFilePaths;
exports.getCurrentDayData = getCurrentDayData;
exports.publishData = publishData;
exports.getWeekNumber = getWeekNumber;
exports.getDuration = getDuration;
exports.getTimeOfEvent = getTimeOfEvent;
exports.getTotalByProperty = getTotalByProperty;
exports.sortByAlphabet = sortByAlphabet;
exports.sortByNumber = sortByNumber;
