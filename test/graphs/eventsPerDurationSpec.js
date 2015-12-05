'use strict';

var expect = require('chai').expect
var eventPerDurationLib = require('../../graphs/eventsPerDuration')

describe('Events per Duration Lib', function() {
  describe('#groupByDuration', function() {
    it('returns by group of hours and more than 10 hours',function() {
      var input = [
        { n: 470, duration: 2 },
        { n: 36, duration: 1 },
        { n: 7, duration: 6 },
        { n: 153, duration: 3 },
        { n: 8, duration: -15 },
        { n: 1, duration: 105 },
        { n: 1, duration: 35 },
        { n: 4, duration: 8 }
      ];
      var reply = eventPerDurationLib.groupByDuration(input)

      expect(reply.length).to.equal(6)
      expect(reply[ reply.length - 1 ].n).to.equal(2)
    })
  })
})
