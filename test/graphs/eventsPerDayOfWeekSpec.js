'use strict';

var expect = require('chai').expect;
var eventsPerDayOfWeekLib = require('../../graphs/eventsPerDayOfWeek');

describe('Events per day of week Lib', function() {
  describe('#insertEventsByDay', function() {
    describe('when there is a new day',function() {
      it('returns a new day with count 1', function() {
        var eventDetail = {
          formatted_time: '05 Dec 2015, Sat, 4:00 pm'
        }
        var totalEvents = [
          { day: 'Monday', n: 0 },
          { day: 'Tuesday', n: 0 },
          { day: 'Wednesday', n: 0 },
          { day: 'Thursday', n: 0 },
          { day: 'Friday', n: 0 },
          { day: 'Saturday', n: 0 },
          { day: 'Sunday', n: 0 }
        ];
        expect(totalEvents[ 5 ].n).to.equal(0);

        var answer = eventsPerDayOfWeekLib.insertEventsByDay(eventDetail, totalEvents);

        expect(answer[ 5 ].day).to.equal('Saturday');
        expect(answer[ 5 ].n).to.equal(1);
      })
    })

    describe('when there is a repeated day', function() {
      it('returns the day with +1 count')
    })
  })

  describe('#getDayOfWeek', function() {
    it('returns the correct day of the week', function() {
      var data = {
        formatted_time: '05 Dec 2015, Sat, 4:00 pm'
      }

      expect(eventsPerDayOfWeekLib.getDayOfWeek(data)).to.equal('Saturday')
    })
  })
})

