'use strict';

var utilsLib = require('../tasks/utils');

function getData(source) {
  var answer = [];
  var languages = [];

  source.forEach(function(file) {
    var data = require('.' + file);

    data.repos.forEach(function(repo) {
      if (isValidNewLanguage(languages, repo)) {
        answer = insertNewLanguage(answer, repo)
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

function insertNewLanguage(list, element) {
  list.push({
    language: element.language,
    n: 1,
    repos: [ {
      name: element.name,
      url: element.html_url,
      stars: element.stargazers_count
    } ]
  })

  return list;
}

function isValidNewLanguage(list, repo) {
  return list.indexOf(repo.language) < 0 && repo.language !== null
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
exports.isValidNewLanguage = isValidNewLanguage;
