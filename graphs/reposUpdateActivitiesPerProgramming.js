'use strict'

var utilsLib = require('../tasks/utils')
var reposPerProgrammingLib = require('./reposPerProgramming')
var _ = require('lodash')

function getData (source) {
  var answer = []
  var languages = []

  source.forEach(function (file) {
    var data = require('.' + file)

    data.repos.forEach(function (repo) {
      if (reposPerProgrammingLib.isValidNewLanguage(languages, repo)) {
        answer = insertNewLanguage(answer, repo)
        languages.push(repo.language)
      } else {
        answer.forEach(function (el) {
          if (el.language === repo.language) {
            el.repos.push(repo.name)
            el.repos = _.uniq(el.repos)
            el.n += 1
          }
        })
      }
    })
  })

  answer = utilsLib.sortByAlphabet(answer, 'language')
  return answer
}

function insertNewLanguage (list, element) {
  list.push({
    language: element.language,
    n: 1,
    repos: [ element.name ]
  })

  return list
}

exports.getData = getData
