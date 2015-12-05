'use strict';

var utilsLib = require('../tasks/utils');

var eventSource = utilsLib.listFilePaths('events');

var totalEventsByDuration = utilsLib.getTotalByProperty('events', 'duration');
var eventsPerDayOfWeekLib = require('./eventsPerDayOfWeek');
var eventsPerDurationLib = require('./eventsPerDuration');
var eventsPerGroupLib = require('./eventsPerGroup');

utilsLib.publishData('events-per-day-of-week', eventsPerDayOfWeekLib.getData(eventSource));
utilsLib.publishData('events-per-duration', eventsPerDurationLib.getData(totalEventsByDuration));
utilsLib.publishData('events-per-group', eventsPerGroupLib.getData(eventSource));
