'use strict';

var utilsLib = require('../tasks/utils');

function getData(source) {
  var answer = addByGroupNameAndUrl(source);

  answer = getMoreThan(answer, 9);
  answer = removeLocationString(answer);
  answer = utilsLib.sortByAlphabet(answer, 'group');

  return answer;
}

function addByGroupNameAndUrl(source) {
  var groups = [];
  var answer = [];
  var attr = 'group_name';

  source.forEach(function(file) {
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

  return answer;
}

function getMoreThan(array, number) {
  var answer = [];

  array.forEach(function(eachItem) {
    if (eachItem.n > number) {
      answer.push(eachItem)
    }
  })

  return answer;
}

function removeLocationString(array) {
  array.forEach(function(eachItem) {
    var group = eachItem.group.replace('Singapore ', '');
    eachItem.group = group;

    group = eachItem.group.replace('(Singapore)', '');
    eachItem.group = group;

    group = eachItem.group.replace('(SG)', '');
    eachItem.group = group;

    group = eachItem.group.replace(' SG', '');
    eachItem.group = group;

    // remove "/groups" from facebook group url for Facebook Pages/Groups
    var url = eachItem.url;
    if (url.indexOf('www.facebook.com/groups') > -1) {
      eachItem.url = url.replace('/groups', '')
    }
  })

  return array;
}

exports.getData = getData;
