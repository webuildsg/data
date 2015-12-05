'use strict';

var utilsLib = require('../tasks/utils');

function insertRubyRepo(repo, repoList) {
  var existCount = 0;
  var index = -1;

  if (!repoList.length) {
    return [ repo ];
  }

  repoList.forEach(function(eachRepo, i) {
    if (repo.name === eachRepo.name) {
      existCount++;
      index = i;
    }
  })

  if (existCount > 0) {
    repoList[ index ] = repo;
  }

  if (!existCount) {
    repoList.push(repo)
  }

  return repoList;
}

function getData(language) {
  var answer = [];

  utilsLib.listFilePaths('repos').forEach(function(file) {
    var data = require('.' + file);

    data.repos.forEach(function(repo) {
      if (repo.language && repo.language.toLowerCase() === language.toLowerCase()) {
        answer = insertRubyRepo(repo, answer);
      }
    })
  })

  answer.forEach(function(repo) {
    console.log('URL: ' + repo.html_url + '   STARS: ' + repo.stargazers_count);
  })

  console.log('******* Total ' + language + ' repos: ' + answer.length + '*********** \n')
}

getData('JavaScript');
getData('Ruby');
getData('CSS');
getData('Objective-c');
getData('Python');
getData('PHP');
getData('Java');
getData('HTML');
getData('Swift');
getData('Haskell');
