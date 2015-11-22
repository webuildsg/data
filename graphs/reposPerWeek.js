'use strict';

// get an array of numbers
// each number is the total number of repos updated in a week

var utilsLib = require('../tasks/utils');

function getTotalReposPerDay(repos) {
  return repos.length;
}

function getData(attr) {
  var type = 'repos';
  var yData = [];
  var currentWeek;
  var answer = {};

  utilsLib.listFilePaths(type).forEach(function(file) {
    var data = require('.' + file);

    if (currentWeek !== utilsLib.getWeekNumber(data.meta[ attr ])) {
      currentWeek = utilsLib.getWeekNumber(data.meta[ attr ]);
      yData.push(getTotalReposPerDay(data.repos));
    } else {
      yData[ yData.length - 1 ] += getTotalReposPerDay(data.repos);
    }
  })

  answer = {
    repos: yData
  };

  utilsLib.publishData('repos-per-week', answer);
}

getData('generated_at');
