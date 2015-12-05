'use strict';

var expect = require('chai').expect;
var eventsPerDayOfWeekLib = require('../../graphs/eventsPerDayOfWeek');

describe('Events per day of week Lib', function() {
  describe('#getDayOfWeek', function() {
    it('returns the correct day of the week', function() {
      var data = {
        formatted_time: '05 Dec 2015, Sat, 4:00 pm'
      }

      expect(eventsPerDayOfWeekLib.getDayOfWeek(data)).to.equal('Saturday')
    })
  })
})

