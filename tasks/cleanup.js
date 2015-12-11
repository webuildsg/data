'use strict'

var fs = require('fs')
var utilsLib = require('./utils')

function hasDataChanged (oldData, newData) {
  if (JSON.stringify(oldData) === newData) {
    return false
  }

  return true
}
function cleanup (type) {
  utilsLib.listFilePaths(type).forEach(function (file) {
    var oldData = require('.' + file)
    var newData = JSON.stringify(utilsLib.getCurrentDayData(oldData, type))

    if (process.env !== 'test') {
      fs.writeFile(file, newData, function (err) {
        if (err) {
          return console.log(err)
        }

        if (hasDataChanged(oldData, newData)) {
          console.log(file + ' was cleaned.')
        }
      })
    }
  })
}

cleanup('events')
cleanup('repos')
