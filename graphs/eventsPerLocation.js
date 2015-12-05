'use strict';

var utilsLib = require('../tasks/utils');
var overlap = require('word-overlap');
var _ = require('lodash');
var geocoder = require('geocoder');

function isEmptyList(list) {
  return !list.length;
}

function insertFirstNode(sentence) {
  return [{
    complete: sentence,
    all: [ sentence ],
    n: 1
  }];
}

function hasSingleWord(sentence) {
  return sentence.indexOf(' ') === -1;
}

function hasWord(sentence, word) {
  return sentence.indexOf(word) > -1;
}

function hasMatchingWords(word1, word2) {
  var commonWordsToIgnore = [
    'singapore', 'suntec', 'temasek','raffles', 'nus', 'smu', 'learning', 'asia',
    'hackerspace', 'national', 'innovation',

    'one', 'of', 'cafe', 'drive', 'business', 'park', 'city', 'mall', 'central', 'red', 'blvd', 'meeting', 'view', 'ave', 'hotel', 'hall', 'town', 'way', 'lab', 'theatre', 'nearest',

    '2nd', 'five', 'line',

    'level', 'lv', 'lvl',
    'st', 'street',
    'rd', 'road',
    'convention',
    'room', 'rm',
    'centre', 'center',

    'building', 'office', 'road', , 'tower', 'boulevard', 'floor', 'university', 'ice', 'financial',
    'plaza', 'place', 'auditorium', 'marina', 'walk', 'square', 'quay', 'block', 'bay', 'avenue', 'near', 'seminar', 'school',

    'pte', 'ltd'
  ];
  var overlapOptions = {
    ignoreCase: true,
    minWordLength: 3,
    ignoreCommonWords: true,
    common: commonWordsToIgnore
  };

  return overlap(word1, word2, overlapOptions).length > 2;
}

function isNotAnExactMatch(str1, str2) {
  return str1 !== str2;
}

function addUniqueLocation(locationList, location) {
  locationList.push(location);
  return _.uniq(locationList);
}

function replaceWithLongerString(originalString, newString) {
  if (newString.length > originalString.length) {
    originalString = newString;
  }

  return originalString;
}

function addPopularLocations(location, locationList) {
  if (hasSingleWord(location) || hasWord(location, 'TBA')) {
    return locationList;
  }

  if (isEmptyList(locationList)) {
    return insertFirstNode(location);
  }

  var found = false;

  locationList.forEach(function(eachLocation) {
    if (!found) {
      if (eachLocation.complete === location) {
        found = true;
        eachLocation.n += 1;
      } else {
        if (hasMatchingWords(eachLocation.complete, location)) {
          found = true;
          eachLocation.n += 1;
          eachLocation.all = addUniqueLocation(eachLocation.all, location);
          eachLocation.complete = replaceWithLongerString(eachLocation.complete, location);
        }
      }
    }
  })

  if (!found) {
    locationList.push({
      complete: location,
      all: [ location ],
      n: 1
    })
  }

  return locationList;
}

function getData() {
  var locationList = [];
  var answer = [];

  utilsLib.listFilePaths('events').forEach(function(file) {
    var data = require('.' + file).events;

    data.forEach(function(eachData) {
      locationList = addPopularLocations(eachData.location, locationList);
    })
  })

  locationList.forEach(function(eachLocation) {
    if (eachLocation.n > 4) {
      answer.push(eachLocation)
    }
  })

  console.log(answer);
  console.log('\n\n' + answer.length)

  answer.forEach(function(a) {
    // console.log(a.complete)

    // https://stackoverflow.com/questions/16672561/how-to-slow-down-a-loop-with-settimeout-or-setinterval
    setInterval(function() {
      console.log(new Date())
      geocoder.geocode(a.complete, function(e, d){
        if (e) {
          console.log('FAIL', e);
        };

        if (d.results[ 0 ]) {
          // console.log(d.results[0].geometry.location.lat + ',' + d.results[0].geometry.location.lng + '   :' + a.complete)
        } else {
          // console.log('NOT FOUND: ' + a.complete)
        }
      })
    }, 3000);
  })
}

getData();
exports.addPopularLocations = addPopularLocations;
