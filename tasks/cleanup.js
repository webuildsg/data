'use strict';

// For events, keep only events coming up in the next 24 hours
// For repos, keep only repos that were updated in the last 24 hours

var fs = require('fs');
var path = require('path');
var moment = require('moment-timezone');

// TODO: cleanup data
module.exports = function(type) {
  listFilePaths(type).forEach(function(file, index) {
    var data = JSON.stringify(getCurrentDayData(require('.' + file), type));

    if (process.env !== 'test') {
      fs.writeFile(file, data, function(err) {
        if(err) {
          return console.log(err);
        }

        console.log(file + ' was saved');
      });
    }
  })
}
