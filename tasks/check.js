'use strict';

// check that the json files have the required format

var utilsLib = require('./utils');
var moment = require('moment-timezone');

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

function eventsNode(data) {
  if (!data.events) {
    return false;
  }

  if (data.events.length < 1) {
    return true;
  }

  data.events.forEach(function(ev) {
    if (!ev.id) {
      return false;
    }

    if (!ev.name) {
      return false;
    }

    if (!ev.description) {
      return false;
    }

    if (!ev.location) {
      return false;
    }

    if (!ev.url) {
      return false;
    }

    if (!ev.group_name) {
      return false;
    }

    if (!ev.group_url) {
      return false;
    }

    if (!ev.formatted_time) {
      return false;
    }

    if (!ev.start_time) {
      return false;
    }

    if (!ev.end_time) {
      return false;
    }
  })

  return true;
}

function reposNode(data) {
  if (!data.repos) {
    return false;
  }

  if (data.repos.length < 1) {
    return true;
  }

  data.repos.forEach(function(ev) {
    if (!ev.name) {
      return false;
    }

    if (!ev.html_url) {
      return false;
    }

    if (!ev.pused_at) {
      return false;
    }

    if (!ev.updated_at) {
      return false;
    }

    if (!ev.language) {
      return false;
    }

    if (!ev.stargazers_coutn) {
      return false;
    }

    if (!ev.owner) {
      return false;
    }

    if (!ev.owner.login) {
      return false;
    }

    if (!ev.owner.avatar_url) {
      return false;
    }

    if (!ev.owner.html_url) {
      return false;
    }
  })

  return true;
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

    if (type === 'events') {
      if(!eventsNode(data)) {
        failedCheck++;
        console.log(file + ' does not have the right data node')
      }
    }

    if (type === 'repos') {
      if(!reposNode(data)) {
        failedCheck++;
        console.log(file + ' does not have the right data node')
      }
    }
  })

  if(failedCheck === 0) {
    console.log('All ' + type + ' data is in the correct condition!')
  } else {
    console.log('There was a total of ' + failedCheck + 'errors in the data files.')
  }
}

check('events');
check('repos');

exports.check = check;
exports.metaNode = metaNode;
exports.eventsNode = eventsNode;
exports.reposNode = reposNode;
