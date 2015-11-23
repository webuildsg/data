'use strict';

// get an array of numbers
// each number is the total number of repos updated in a week

var utilsLib = require('../tasks/utils');
var moment = require('moment-timezone');

function getTotalReposPerDay(repos) {
  return repos.length;
}

function getData(attr) {
  var type = 'repos';
  var currentWeek;
  var answer = [];

  utilsLib.listFilePaths(type).forEach(function(file) {
    var data = require('.' + file);

    if (currentWeek !== utilsLib.getWeekNumber(data.meta[ attr ])) {
      currentWeek = utilsLib.getWeekNumber(data.meta[ attr ]);
      answer.push({
        repos: getTotalReposPerDay(data.repos),
        week: currentWeek,
        date: moment(data.meta[ attr ]).format('DD-MMM-YY'),
        formatted_date: moment(data.meta[ attr ]).format('DD MMM YYYY'),
        day: moment(data.meta[ attr ]).format('dddd')
      });
    } else {
      answer[ answer.length - 1 ].repos += getTotalReposPerDay(data.repos);
    }
  })

  utilsLib.publishData('repos-per-week', answer);
}

getData('generated_at');
