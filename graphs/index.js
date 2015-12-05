'use strict';

var utilsLib = require('../tasks/utils');

var eventSource = utilsLib.listFilePaths('events');

var totalEventsByDuration = utilsLib.getTotalByProperty('events', 'duration');
var totalEventsByTime = utilsLib.getTotalByProperty('events', 'time');

var eventsPerDayOfWeekLib = require('./eventsPerDayOfWeek');
var eventsPerDurationLib = require('./eventsPerDuration');
var eventsPerGroupLib = require('./eventsPerGroup');
var eventsPerLocationLib = require('./eventsPerLocation');
var eventsPerTimeOfDayLib = require('./eventsPerTimeOfDay');
var eventsPerWeekLib = require('./eventsPerWeek');

utilsLib.publishData('events-per-day-of-week', eventsPerDayOfWeekLib.getData(eventSource));
utilsLib.publishData('events-per-duration', eventsPerDurationLib.getData(totalEventsByDuration));
utilsLib.publishData('events-per-group', eventsPerGroupLib.getData(eventSource));
utilsLib.publishData('events-per-time-of-day', eventsPerTimeOfDayLib.getData(totalEventsByTime));
utilsLib.publishData('events-per-week', eventsPerWeekLib.getData(eventSource));

eventsPerLocationLib.getData(eventSource, function(data) {
  utilsLib.publishData('events-per-location', data);
  utilsLib.publishGeojson('events-per-location', data);
})
