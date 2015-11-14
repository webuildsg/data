'use strict';

// For events, keep only events coming up in the next 24 hours
// For repos, keep only repos that were updated in the last 24 hours

var fs = require('fs');
var path = require('path');
var moment = require('moment-timezone');

function listFilePaths(type) {
  var allFiles = fs.readdirSync('./' + type + '/v1');
  var jsonFilePaths = [];

  allFiles.forEach(function(file) {
    if (path.extname(file) === '.json') {
      jsonFilePaths.push('./' + type + '/v1/' + file);
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

// TODO: cleanup data
function cleanup(type) {
  listFilePaths(type).forEach(function(file, index) {
    var data = JSON.stringify(getCurrentDayData(require('.' + file), type));

    fs.writeFile(file, data, function(err) {
      if(err) {
        return console.log(err);
      }

      console.log(file + ' was saved');
    });
  })
}

cleanup('events');
cleanup('repos');

exports.listFilePaths = listFilePaths;
exports.getCurrentDayData = getCurrentDayData;
exports.cleanup = cleanup;
