'use strict'

var utilsLib = require('../tasks/utils')
var moment = require('moment-timezone')

function getData (source) {
  var currentWeek
  var answer = []
  var uniqueReposInThatWeek = []
  var attr = 'generated_at'

  source.forEach(function (file) {
    var data = require('.' + file)
    var generatedAt = data.meta[ attr ]

    if (isANewWeek(currentWeek, generatedAt)) {
      currentWeek = utilsLib.getWeekNumber(generatedAt)
      uniqueReposInThatWeek = getUniqRepos(data.repos)
      answer = addNewWeekRepoData(answer, data)
    } else {
      data.repos.forEach(function (r) {
        if (isNotAUniqRepoThisWeek(uniqueReposInThatWeek, r.name)) {
          answer[ answer.length - 1 ].repos += 1
          uniqueReposInThatWeek.push(r.name)
        }
      })
    }
  })

  return answer
}

function isANewWeek (currentWeek, generatedAt) {
  return currentWeek !== utilsLib.getWeekNumber(generatedAt)
}

function getUniqRepos (repos) {
  var repoList = []
  repos.forEach(function (r) {
    repoList.push(r.name)
  })

  return repoList
}

function addNewWeekRepoData (answer, data) {
  var attr = 'generated_at'
  var generatedAt = data.meta[ attr ]

  answer.push({
    repos: getTotalReposPerDay(data.repos),
    week: utilsLib.getWeekNumber(generatedAt),
    date: moment(generatedAt).format('DD-MMM-YY'),
    formatted_date: moment(generatedAt).format('DD MMM YYYY'),
    day: moment(generatedAt).format('dddd')
  })

  return answer
}

function isNotAUniqRepoThisWeek (list, name) {
  return list.indexOf(name) < 0
}

function getTotalReposPerDay (repos) {
  return repos.length
}

exports.getData = getData
