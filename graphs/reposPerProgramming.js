'use strict';

// get an array of numbers
// each number is the total number of events in a week

var utilsLib = require('../tasks/utils');

function getData() {
  var type = 'repos';
  var answer = [];
  var languages = [];

  utilsLib.listFilePaths(type).forEach(function(file) {
    var data = require('.' + file);

    data.repos.forEach(function(repo) {
      if (languages.indexOf(repo.language) < 0 && repo.language !== null) {
        answer.push({
          language: repo.language,
          n: 1
        })
        languages.push(repo.language)
      } else {
        answer.forEach(function(el) {
          if (el.language === repo.language) {
            el.n += 1;
          }
        })
      }
    })
  })

  answer = answer.sort(function(a, b) {
    if (a.language > b.language) {
      return 1;
    }
    if (a.language < b.language) {
      return -1;
    }

    return 0;
  })

  console.log(answer)
  utilsLib.publishData('repos-per-programming', answer);
}

getData();
