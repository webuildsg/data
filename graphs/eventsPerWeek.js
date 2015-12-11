'use strict'

var utilsLib = require('../tasks/utils')
var moment = require('moment-timezone')

function getData (source) {
  var answer = []
  var currentWeek
  var attr = 'generated_at'

  source.forEach(function (file) {
    var data = require('.' + file)
    var generatedAt = data.meta[ attr ]

    if (currentWeek !== utilsLib.getWeekNumber(generatedAt)) {
      currentWeek = utilsLib.getWeekNumber(generatedAt)
      answer.push({
        events: getTotalEventPerDay(data),
        week: currentWeek,
        date: moment(generatedAt).format('DD-MMM-YY'),
        formatted_date: moment(generatedAt).format('DD MMM YYYY'),
        day: moment(generatedAt).format('dddd')
      })
    } else {
      answer[ answer.length - 1 ].events += getTotalEventPerDay(data)
    }
  })

  return answer
}

function getTotalEventPerDay (data) {
  return data.events.length
}

exports.getData = getData
