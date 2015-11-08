'use strict';

// For events, keep only events coming up in the next 24 hours
// For repos, keep only repos that were updated in the last 24 hours

var fs = require('fs');
var path = require('path');

function listFiles(type) {
  var allFiles = fs.readdirSync('./' + type + '/v1');
  var jsonFiles = [];

  allFiles.forEach(function(file) {
    if (path.extname(file) === '.json') {
      jsonFiles.push(file);
    }
  })

  return jsonFiles;
}

// TODO: cleanup data
function cleanup(type) {
  console.log(listFiles(type));
}

exports.listFiles = listFiles;
exports.cleanup = cleanup;
