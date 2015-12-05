'use strict';

var utilsLib = require('../tasks/utils');
var eventSource = utilsLib.listFilePaths('events');
var eventsPerDayOfWeekLib = require('./eventsPerDayOfWeek');

utilsLib.publishData('events-per-day-of-week', eventsPerDayOfWeekLib.getData(eventSource));
