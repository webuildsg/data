'use strict';

var utilsLib = require('../tasks/utils');
var moment = require('moment-timezone');

function getTotalEventPerDay(events) {
  return events.length;
}

function getData(attr) {
  var type = 'events';
  var answer = [];
  var currentWeek;

  utilsLib.listFilePaths(type).forEach(function(file) {
    var data = require('.' + file);

    if (currentWeek !== utilsLib.getWeekNumber(data.meta[ attr ])) {
      currentWeek = utilsLib.getWeekNumber(data.meta[ attr ]);
      answer.push({
        events: getTotalEventPerDay(data.events),
        week: currentWeek,
        date: moment(data.meta[ attr ]).format('DD-MMM-YY'),
        formatted_date: moment(data.meta[ attr ]).format('DD MMM YYYY'),
        day: moment(data.meta[ attr ]).format('dddd')
      });
    } else {
      answer[ answer.length - 1 ].events += getTotalEventPerDay(data.events);
    }
  })

  utilsLib.publishData('events-per-week', answer);
}

getData('generated_at');
