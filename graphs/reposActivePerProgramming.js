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
          repos: [ {
            name: repo.name,
            url: repo.html_url,
            stars: repo.stargazers_count
          } ]
        })
        languages.push(repo.language)
      } else {
        answer.forEach(function(el) {
          if (el.language === repo.language) {
            el.repos = addUniq(repo, el.repos);
            el.n = el.repos.length;
          }
        })
      }
    })
  })

  answer = utilsLib.sortByAlphabet(answer, 'language');
  return answer;
}

function addUniq(element, list) {
  var found = false;
  var newElement = {
    name: element.name,
    url: element.html_url,
    stars: element.stargazers_count
  };

  list.forEach(function(each) {
    if (each.name === element.name) {
      each.stars = element.stargazers_count;
      found = true;
    }
  })

  if (!found) {
    list.push(newElement);
  }

  return list;
}

exports.getData = getData;
