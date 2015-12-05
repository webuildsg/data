'use strict';

var _ = require('lodash')
var utilsLib = require('../tasks/utils')

function getData(source) {
  var answer = [];
  var uniqRepoList = [];

  source.forEach(function(file) {
    var data = require('.' + file);

    data.repos.forEach(function(eachRepo) {
      if (isAUniqRepo(uniqRepoList, eachRepo.name)) {
        answer = insertRepo(answer, eachRepo);
        uniqRepoList.push(eachRepo.name)
      } else {
        answer = updateCount(answer, eachRepo)
      }
    })
  })

  answer = utilsLib.sortByAlphabet(answer, 'name');
  return _.filter(answer, function(a) {
    return a.n > 9;
  })
}

function isAUniqRepo(list, name) {
  return list.indexOf(name) < 0
}

function insertRepo(list, element) {
  list.push({
    name: element.name,
    n: 1,
    url: element.html_url,
    stars: element.stargazers_count
  })

  return list;
}

function updateCount(list, element) {
  list.forEach(function(each) {
    if (each.name === element.name) {
      each.n += 1;
      each.stars = element.stargazers_count
    }
  })

  return list;
}

exports.getData = getData;
