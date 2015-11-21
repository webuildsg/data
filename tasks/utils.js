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

exports.listFilePaths = listFilePaths;
exports.getCurrentDayData = getCurrentDayData;
