'use strict';

// get an array of numbers
// each number is the total number of events in a week

var utilsLib = require('../tasks/utils');

function getData(attr) {
  var type = 'events';
  var answer = [];
  var groups = [];
  var replies = [];

  utilsLib.listFilePaths(type).forEach(function(file) {
    var data = require('.' + file);

    data.events.forEach(function(ev) {
      var attribute = ev[ attr ];

      if (groups.indexOf(attribute) < 0) {
        if (attribute) {
          groups.push(attribute)
          answer.push({
            group: attribute,
            n: 1,
            url: ev.group_url
          })
        }
      } else {
        answer.forEach(function(a) {
          if (a.group === ev[ attr ]) {
            a.n += 1;
          }
        })
      }
    })
  })

  // show groups with at least 10 or more events
  answer.forEach(function(a) {
    if (a.n > 9) {
      replies.push(a)
    }
  })

  replies = replies.sort(function(a, b) {
    if (a.group > b.group) {
      return 1;
    }
    if (a.group < b.group) {
      return -1;
    }

    return 0;
  })

  replies.forEach(function(r) {
    var group = r.group.replace('Singapore ', '');
    r.group = group;

    group = r.group.replace('(Singapore)', '');
    r.group = group;

    group = r.group.replace('(SG)', '');
    r.group = group;

    group = r.group.replace(' SG', '');
    r.group = group;

    // remove "/groups" from facebook group url for Facebook Pages/Groups
    var url = r.url;
    if (url.indexOf('www.facebook.com/groups') > -1) {
      r.url = url.replace('/groups', '')
    }
  })

  console.log(replies)
  utilsLib.publishData('events-per-group', replies);
}

getData('group_name');
