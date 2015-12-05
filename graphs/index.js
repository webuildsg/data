'use strict';

var utilsLib = require('../tasks/utils');

var eventSource = utilsLib.listFilePaths('events');
var reposSource = utilsLib.listFilePaths('repos');

var totalEventsByDuration = utilsLib.getTotalByProperty('events', 'duration');
var totalEventsByTime = utilsLib.getTotalByProperty('events', 'time');

var eventsPerDayOfWeekLib = require('./eventsPerDayOfWeek');
var eventsPerDurationLib = require('./eventsPerDuration');
var eventsPerGroupLib = require('./eventsPerGroup');
var eventsPerLocationLib = require('./eventsPerLocation');
var eventsPerTimeOfDayLib = require('./eventsPerTimeOfDay');
var eventsPerWeekLib = require('./eventsPerWeek');

var reposPerWeekLib = require('./reposPerWeek');
var reposMostActiveLib = require('./reposMostActive');
var reposPerProgrammingLib = require('./reposPerProgramming');
var reposUpdateActivePerProgrammingLib = require('./reposUpdateActivitiesPerProgramming');

utilsLib.publishData('events-per-day-of-week', eventsPerDayOfWeekLib.getData(eventSource));
utilsLib.publishData('events-per-duration', eventsPerDurationLib.getData(totalEventsByDuration));
utilsLib.publishData('events-per-group', eventsPerGroupLib.getData(eventSource));
utilsLib.publishData('events-per-time-of-day', eventsPerTimeOfDayLib.getData(totalEventsByTime));
utilsLib.publishData('events-per-week', eventsPerWeekLib.getData(eventSource));

utilsLib.publishData('repos-per-week', reposPerWeekLib.getData(reposSource));
utilsLib.publishData('repos-most-active', reposMostActiveLib.getData(reposSource));
utilsLib.publishData('repos-per-programming-language', reposPerProgrammingLib.getData(reposSource));
utilsLib.publishData('repos-update-activities-per-programming', reposUpdateActivePerProgrammingLib.getData(reposSource));

eventsPerLocationLib.getData(eventSource, function(error, data) {
  if (!error) {
    utilsLib.publishData('events-per-location', data);
    utilsLib.publishGeojson('events-per-location', data);
  }
})
