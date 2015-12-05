'use strict';

var utilsLib = require('../tasks/utils');
var _ = require('lodash');

function getData(source) {
  var answer = [];

  answer = utilsLib.sortByNumber(source, 'time')
  answer = _.filter(answer, function(a) {
    if (a.n > 9) {
      return {
        time: a.time + 'h',
        n: a.n
      }
    }
  })

  return answer;
}


exports.getData = getData;
