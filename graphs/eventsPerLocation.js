'use strict';

var overlap = require('word-overlap');
var _ = require('lodash');
var geocoder = require('geocoder');
var config = require('./config');

function getData(source, callback) {
  var locationList = [];

  source.forEach(function(file) {
    var data = require('.' + file).events;

    data.forEach(function(eachData) {
      locationList = groupLocations(eachData, locationList);
    })
  })

  locationList = addPopularLocations(locationList);

  getLatLong(locationList, function(error, list) {
    if (error) {
      return callback('Error')
    }

    locationList = filterValidLatLong(list);

    return callback(null, locationList);
  });
}

function groupLocations(eachData, locationList) {
  var location = eachData.location;
  var userGroup = eachData.group_name;

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
        eachLocation.groups.push(userGroup)
      } else {
        if (hasMatchingWords(eachLocation.complete, location)) {
          found = true;
          eachLocation.n += 1;
          eachLocation.all = addUniqueLocation(eachLocation.all, location);
          eachLocation.complete = replaceWithLongerString(eachLocation.complete, location);
          eachLocation.groups.push(userGroup)
        }
      }

      eachLocation.groups = _.uniq(eachLocation.groups)
    }
  })

  if (!found) {
    locationList.push({
      complete: location,
      all: [ location ],
      n: 1,
      groups: [ userGroup ]
    })
  }

  return locationList;
}

function addPopularLocations(list) {
  return _.filter(list, function(eachItem) {
    return eachItem.n > 4;
  })
}

function filterValidLatLong(list) {
  return _.filter(list, function(l) {
    return l.latitude && l.longitude;
  })
}

function getLatLong(list, callback) {
  var progress = 0;
  var errorCount = 0;

  list.forEach(function(a, index) {
    var interval = index * 200;

    setTimeout(function() {
      geocoder.geocode(fixAddressForGeocoding(a.complete), function(error, data) {
        if (error) {
          console.log('ERROR: ', error);
          return callback(error);
        }

        if (data.error_message) {
          console.log('ERROR: ' + data.error_message)
          errorCount++;
        }

        if (data && data.results[ 0 ]) {
          a.latitude = data.results[0].geometry.location.lat;
          a.longitude = data.results[0].geometry.location.lng
        }

        progress++;

        if (errorCount) {
          return callback('Error!');
        }

        if (progress === list.length - 1) {
          return callback(null, list);
        }
      })
    }, interval);
  })
}

function fixAddressForGeocoding(address) {
  config.addressesToFix.forEach(function(s) {
    if (address.indexOf(s) > -1) {
      address = address.replace(s, '')
    }
  })

  return address;
}

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

    'building', 'office', 'road', 'tower', 'boulevard', 'floor', 'university', 'ice', 'financial',
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

exports.getData = getData;
exports.addPopularLocations = addPopularLocations;
