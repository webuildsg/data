'use strict'

var utilsLib = require('../tasks/utils')

var options = { 'monthsAgo': 12 }
var events = 'events'
var repos = 'repos'

var eventSourceAll = utilsLib.listFilePaths(events)
var reposSourceAll = utilsLib.listFilePaths(repos)
var eventSourcePast12Months = utilsLib.listFilePaths(events, options)
var reposSourcePast12Months = utilsLib.listFilePaths(repos, options)

var eventSource2015 = utilsLib.listFilePaths(events, { 'year': '2015' })
var eventSource2016 = utilsLib.listFilePaths(events, { 'year': '2016' })
var eventSource2017 = utilsLib.listFilePaths(events, { 'year': '2017' })

var reposSource2015 = utilsLib.listFilePaths(repos, { 'year': '2015' })
var reposSource2016 = utilsLib.listFilePaths(repos, { 'year': '2016' })
var reposSource2017 = utilsLib.listFilePaths(repos, { 'year': '2017' })

var totalEventsByDuration = utilsLib.getTotalByProperty(events, 'duration')
var totalEventsByTime = utilsLib.getTotalByProperty(events, 'time')

var eventsPerDayOfWeekLib = require('./eventsPerDayOfWeek')
var eventsPerDurationLib = require('./eventsPerDuration')
var eventsPerGroupLib = require('./eventsPerGroup')
var eventsPerLocationLib = require('./eventsPerLocation')
var eventsPerTimeOfDayLib = require('./eventsPerTimeOfDay')
var eventsPerWeekLib = require('./eventsPerWeek')
var eventsPerWeekOfMonthLib = require('./eventsPerWeekOfMonth')

var reposPerWeekLib = require('./reposPerWeek')
var reposMostActiveLib = require('./reposMostActive')
var reposPerProgrammingLib = require('./reposPerProgramming')
var reposUpdateActivePerProgrammingLib = require('./reposUpdateActivitiesPerProgramming')

var overviewLib = require('./overview')

utilsLib.publishData('events-per-week', eventsPerWeekLib.getData(eventSourceAll))
utilsLib.publishData('events-per-day-of-week', eventsPerDayOfWeekLib.getData(eventSourcePast12Months))
utilsLib.publishData('events-per-group', eventsPerGroupLib.getData(eventSourcePast12Months))
utilsLib.publishData('events-per-duration', eventsPerDurationLib.getData(totalEventsByDuration))
utilsLib.publishData('events-per-time-of-day', eventsPerTimeOfDayLib.getData(totalEventsByTime))
utilsLib.publishData('events-per-week-of-month', eventsPerWeekOfMonthLib.getData(eventSourcePast12Months))

utilsLib.publishData('repos-per-week', reposPerWeekLib.getData(reposSourceAll))
utilsLib.publishData('repos-most-active', reposMostActiveLib.getData(reposSourcePast12Months))
utilsLib.publishData('repos-per-programming-language', reposPerProgrammingLib.getData(reposSourcePast12Months))
utilsLib.publishData('repos-update-activities-per-programming', reposUpdateActivePerProgrammingLib.getData(reposSourcePast12Months))

eventsPerLocationLib.getData(eventSourcePast12Months, function (error, data) {
  if (!error) {
    utilsLib.publishData('events-per-location', data)
    utilsLib.publishGeojson('events-per-location', data)
  }
})

utilsLib.publishData('overview', overviewLib.getData(
  {
    repos: {
      '2015': reposSource2015,
      '2016': reposSource2016,
      '2017': reposSource2017
    },
    events: {
      '2015': eventSource2015,
      '2016': eventSource2016,
      '2017': eventSource2017
    }
  })
)
