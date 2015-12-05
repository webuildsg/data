'use strict';

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

  answer = utilsLib.sortByAlphabet(answer, 'language');
  utilsLib.publishData('repos-per-programming', answer);
}

getData();
