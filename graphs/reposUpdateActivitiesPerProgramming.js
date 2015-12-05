'use strict';

var utilsLib = require('../tasks/utils');
var _ = require('lodash');

function getData(source) {
  var answer = [];
  var languages = [];

  source.forEach(function(file) {
    var data = require('.' + file);

    data.repos.forEach(function(repo) {
      if (languages.indexOf(repo.language) < 0 && repo.language !== null) {
        answer.push({
          language: repo.language,
          n: 1,
          repos: [ repo.name ]
        })
        languages.push(repo.language)
      } else {
        answer.forEach(function(el) {
          if (el.language === repo.language) {
            el.repos.push(repo.name)
            el.repos = _.uniq(el.repos)
            el.n += 1;
          }
        })
      }
    })
  })

  answer = utilsLib.sortByAlphabet(answer, 'language');
  return answer;
}

exports.getData = getData;
