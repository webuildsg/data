'use strict';

// get an array of numbers
// each number is the total number of repos updated in a week

var utilsLib = require('../tasks/utils');
var moment = require('moment-timezone');

function getTotalReposPerDay(repos) {
  return repos.length;
}

function addMostActiveRepos(repos, activeRepos) {
  var active = 0;

  repos.forEach(function(r) {
    activeRepos.forEach(function(a) {
      if (a.name === r) {
        active++;
        a.updated_count += 1;
      }
    })

    if (active < 1) {
      activeRepos.push({
        name: r,
        updated_count: 1
      })
    }

    active = 0;
  })

  return activeRepos;
}

function getData(attr) {
  var type = 'repos';
  var currentWeek;
  var answer = [];
  var uniqueReposInThatWeek = [];
  var mostActiveRepos = [];
  var replies = [];

  utilsLib.listFilePaths(type).forEach(function(file) {
    var data = require('.' + file);

    if (currentWeek !== utilsLib.getWeekNumber(data.meta[ attr ])) {
      currentWeek = utilsLib.getWeekNumber(data.meta[ attr ]);

      data.repos.forEach(function(r) {
        uniqueReposInThatWeek.push(r.name);
      })

      mostActiveRepos = addMostActiveRepos(uniqueReposInThatWeek, mostActiveRepos);
      uniqueReposInThatWeek = [];

      answer.push({
        repos: getTotalReposPerDay(data.repos),
        week: currentWeek,
        date: moment(data.meta[ attr ]).format('DD-MMM-YY'),
        formatted_date: moment(data.meta[ attr ]).format('DD MMM YYYY'),
        day: moment(data.meta[ attr ]).format('dddd')
      });
    } else {
      data.repos.forEach(function(r) {
        if (uniqueReposInThatWeek.indexOf(r.name) < 0) {
          answer[ answer.length - 1 ].repos += 1;
          uniqueReposInThatWeek.push(r.name);
        }
      })
    }
  })

  mostActiveRepos.forEach(function(a) {
    if (a.updated_count > 9) {
      replies.push(a);
    }
  })

  console.log(replies);
  console.log(replies.length)
  utilsLib.publishData('repos-per-week', answer);
}

getData('generated_at');
