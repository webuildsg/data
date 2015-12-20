'use strict'

var fs = require('fs')
var path = require('path')
var moment = require('moment-timezone')
var geojson = require('geojson')

function listFilePaths (type, options) {
  var allFiles = fs.readdirSync('./data/' + type + '/v1')
  var jsonFilePaths = []

  allFiles.forEach(function (file) {
    var filepath = './data/' + type + '/v1/' + file

    if (hasFileExt(file, '.json')) {
      if (!options) {
        jsonFilePaths.push(filepath)
      } else {
        if (hasYear(file, options.year)) {
          jsonFilePaths.push(filepath)
        }
      }
    }
  })

  return jsonFilePaths
}

function hasYear (file, year) {
  return file.indexOf('_' + year + '_') > -1
}

function hasFileExt (file, ext) {
  return path.extname(file) === ext
}

function publishData (name, data) {
  return writeFile('public/data/' + name + '.json', JSON.stringify(data))
}

function publishGeojson (name, data) {
  var geojsonData = geojson.parse(data.map(function (d) {
    return {
      groups: d.groups,
      address: d.complete,
      lat: d.latitude,
      lng: d.longitude
    }
  }), {Point: ['lat', 'lng']})

  writeFile('public/data/' + name + '.geojson', JSON.stringify(geojsonData))
}

function writeFile (filename, data) {
  fs.writeFile(filename, data, function (err) {
    if (err) {
      console.log(err)
    }

    console.log('File public/data/' + filename + ' saved!')
  })
}

function getDuration (event) {
  // round up the hours to reduce / smoothen noise
  return Math.ceil(moment(event.end_time).diff(event.start_time) / 60 / 60 / 1000)
}

function getTimeOfEvent (ev) {
  return moment(ev.formatted_time, 'DD MMM YYYY, ddd, h:mm a').format('HHmm')
}

function getCurrentDayData (data, type) {
  var today = moment(data.meta.generated_at)
  var compare = type === 'events' ? 0 : 1
  var compareTime = type === 'events' ? 'start_time' : 'pushed_at'
  var answer = {}
  answer.meta = data.meta
  answer[ type ] = []

  data[ type ].forEach(function (element) {
    if (today.diff(moment(element[ compareTime ]), 'days') === compare) {
      answer[ type ].push(element)
    }
  })

  answer.meta['total_' + type] = answer[ type ].length

  return answer
}

function getWeekNumber (generatedDate) {
  return moment(generatedDate).isoWeek()
}

function getTotalByProperty (type, propertyName) {
  var list = []
  var answer = []

  listFilePaths(type).forEach(function (file) {
    var data = require('.' + file)

    data.events.forEach(function (ev) {
      var property
      var newObject = {}

      if (propertyName === 'time') {
        property = getTimeOfEvent(ev)
      } else if (propertyName === 'duration') {
        property = getDuration(ev)
      }

      newObject.n = 1
      newObject[ propertyName ] = property

      if (list.indexOf(property) < 0) {
        list.push(property)
        answer.push(newObject)
      } else {
        answer.forEach(function (a) {
          if (a[ propertyName ] === property) {
            a.n += 1
          }
        })
      }
    })
  })

  return answer
}

function sortByAlphabet (array, property) {
  return array.sort(function (a, b) {
    return a[ property ].toLowerCase().localeCompare(b[ property ].toLowerCase())
  })
}

function sortByNumber (array, property) {
  return array.sort(function (a, b) {
    if (a[ property ] > b[ property ]) {
      return 1
    }

    if (a[ property ] < b[ property ]) {
      return -1
    }

    return 0
  })
}

listFilePaths('repos', '2014')

exports.listFilePaths = listFilePaths
exports.publishData = publishData
exports.publishGeojson = publishGeojson

exports.getCurrentDayData = getCurrentDayData
exports.getWeekNumber = getWeekNumber
exports.getDuration = getDuration
exports.getTimeOfEvent = getTimeOfEvent
exports.getTotalByProperty = getTotalByProperty
exports.sortByAlphabet = sortByAlphabet
exports.sortByNumber = sortByNumber
