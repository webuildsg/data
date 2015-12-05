'use strict';

var utilsLib = require('./utils');

function metaNode(data) {
  if (!data.meta) {
    return false;
  }

  if (!data.meta.generated_at) {
    return false;
  }

  if (data.meta.total_events > -1 || data.meta.total_repos > -1) {
    return true;
  }

  return false;
}

function hasEachNode(data, type) {
  var noNodes = 0;
  var compulsoryNodes = [];

  if (type === 'events') {
    compulsoryNodes = ['id', 'name', 'location', 'url', 'group_url', 'formatted_time', 'start_time', 'end_time'];
  } else if (type === 'repos') {
    compulsoryNodes = ['name', 'html_url', 'pushed_at', 'updated_at', 'stargazers_count', 'owner'];
  }

  compulsoryNodes.forEach(function(eachNode) {
    if (!data[ eachNode ]) {
      console.log(eachNode + ' node not found for ' + type + ' on ' + data.formatted_time)
      noNodes++;
    }
  })

  return !noNodes;
}

function hasNodes(data, type) {
  if (!data[ type ]) {
    return false;
  }

  if (data[ type ].length < 1) {
    return true;
  }

  var faultCount = 0;

  data[ type ].forEach(function(ev) {
    if (!hasEachNode(ev, type)) {
      faultCount++;
    }
  })

  return !faultCount;
}

function checkTotal(data, type) {
  return data.meta[ 'total_' + type ] === data[type].length;
}

function hasSingleDataPerDay(type) {
  var currDay;
  var prevDay;
  var start = type === 'events' ? 32 : 30;
  var hasDuplicate = 0;

  utilsLib.listFilePaths(type).forEach(function(file) {
    currDay = file.substr(start, 10);

    if (prevDay === currDay) {
      console.log(file + ' has duplicate data for this day');
      hasDuplicate++;
    }

    prevDay = currDay;
  })

  return hasDuplicate > 0 ? false : true;
}

function check(type) {
  var failedCheck = 0;

  if (!hasSingleDataPerDay(type)) {
    failedCheck++;
  }

  utilsLib.listFilePaths(type).forEach(function(file) {
    var data = require('.' + file);

    if(!metaNode(data)) {
      failedCheck++;
      console.log(file + ' does not have the right meta node')
    }

    if(!checkTotal(data, type)) {
      failedCheck++;
      console.log(file + ' does not have the correct total number of ' + type);
    }

    if(!hasNodes(data, type)) {
      failedCheck++;
      console.log(file + ' does not have the right data node')
    }
  })

  if(failedCheck === 0) {
    console.log('All ' + type + ' data is in the correct condition!')
  } else {
    console.log('There was a total of ' + failedCheck + ' errors in the data files.')
  }
}

check('events');
check('repos');

exports.check = check;
exports.metaNode = metaNode;
exports.hasNodes = hasNodes;
