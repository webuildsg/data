'use strict';

var utilsLib = require('../tasks/utils');

function getData(source) {
  var answer = groupByDuration(source);

  answer = utilsLib.sortByNumber(answer, 'duration');
  answer = setLabelsForDuration(answer);

  return answer;
}

function groupByDuration(source) {
  var replies = [];
  var countMoreThan10 = 0;

  source.forEach(function(a) {
    if (a.duration > 0 && a.duration < 10) {
      replies.push(a);
    } else if (a.duration > 10) {
      countMoreThan10++;
    }
  })

  replies.push({
    duration: 10,
    n: countMoreThan10
  })

  return replies;
}

function setLabelsForDuration(array) {
  array.forEach(function(r) {
    if (r.duration === 10) {
      r.duration = '10 hours or more';
    } else if (r.duration === 1) {
      r.duration = '0 - 1 hour';
    } else {
      r.duration = (r.duration - 1) + ' - ' + r.duration + ' hours';
    }
  })

  return array;
}

exports.getData = getData;
exports.groupByDuration = groupByDuration;
