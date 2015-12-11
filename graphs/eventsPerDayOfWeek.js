'use strict'

var moment = require('moment-timezone')

function getData (source) {
  var answer = [
    { day: 'Monday', n: 0 },
    { day: 'Tuesday', n: 0 },
    { day: 'Wednesday', n: 0 },
    { day: 'Thursday', n: 0 },
    { day: 'Friday', n: 0 },
    { day: 'Saturday', n: 0 },
    { day: 'Sunday', n: 0 }
  ]

  source.forEach(function (filename) {
    var data = require('.' + filename)

    data.events.forEach(function (ev) {
      answer = insertEventsByDay(ev, answer)
    })
  })

  return answer
}

function insertEventsByDay (ev, totalEvents) {
  var isDayFound = false

  totalEvents.forEach(function (element) {
    if (!isDayFound && element.day === getDayOfWeek(ev)) {
      isDayFound = true
      element.n += 1
    }
  })

  return totalEvents
}

function getDayOfWeek (ev) {
  return moment(ev.formatted_time, 'DD MMM YYYY, ddd, h:mm a').format('dddd')
}

exports.getDayOfWeek = getDayOfWeek
exports.insertEventsByDay = insertEventsByDay
exports.getData = getData
