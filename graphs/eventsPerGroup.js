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
  var attrName = 'group_name';

  source.forEach(function(file) {
    var data = require('.' + file);

    data.events.forEach(function(ev) {
      var attribute = ev[ attrName ];

      if (groupNotInList(groups, attribute)) {
        groups.push(attribute)
        answer.push({
          group: attribute,
          n: 1,
          url: ev.group_url
        })
      } else {
        answer = increaseCountOfGraph(answer, attribute);
      }
    })
  })

  return answer;
}

function groupNotInList(groups, attribute) {
  return groups.indexOf(attribute) < 0 && attribute;
}

function increaseCountOfGraph(answer, attribute) {
  answer.forEach(function(a) {
    if (a.group === attribute) {
      a.n += 1;
    }
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
  var patternsToRemove = [
    'Singapore ',
    '(Singapore)',
    '(SG)',
    ' SG'
  ];

  array.forEach(function(eachItem) {
    patternsToRemove.forEach(function(replaceString) {
      eachItem.group = eachItem.group.replace(replaceString, '')
    })

    eachItem.url = correctFacebookUrl(eachItem.url);
  })

  return array;
}

function correctFacebookUrl(url) {
  return url.indexOf('www.facebook.com/groups') > -1 ? url.replace('/groups', ''): url;
}

exports.getData = getData;
exports.removeLocationString = removeLocationString;
exports.correctFacebookUrl = correctFacebookUrl;
