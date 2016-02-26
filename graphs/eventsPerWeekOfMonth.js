'use strict'

var utilsLib = require('../tasks/utils')
var moment = require('moment-timezone')

function getData (source) {
  var answer = [
    { week: 0, n: 0 },
    { week: 1, n: 0 },
    { week: 2, n: 0 },
    { week: 3, n: 0 },
    { week: 4, n: 0 },
    { week: 5, n: 0 }
  ]
  var currentWeek
  var attr = 'generated_at'

  source.forEach(function (file) {
    var totalEvents = require('.' + file).meta.total_events
    var extractDate = file.substring(32, 42).replace(/_/gi, '-')
    var weekOfMonth = getWeekOfMonth(moment(extractDate).toDate())

    // console.log(`${extractDate}: ${totalEvents} events at week ${weekOfMonth}`)

    answer[ weekOfMonth ].n += totalEvents
  })

  answer = setLabelsForGraph(answer)
  
  return answer
}

function getWeekOfMonth(date) {
  var day = date.getDate()
  var prefixes = ['0', '1', '2', '3', '4', '5']

  day -= (date.getDay() == 0 ? 6 : date.getDay() - 1)
  //get monday of this week
  //special case handling for 0 (sunday)

  day += 7
  //for the first non full week the value was negative

  return prefixes[0 | (day) / 7]
}

function setLabelsForGraph(data) {
  var reply = []

  data.forEach(function(eachData) {
    var num = eachData.week

    reply.push({
      week: 'Week ' + num + ' of the month',
      n: eachData.n
    })
  })

  return reply
}

exports.getData = getData
