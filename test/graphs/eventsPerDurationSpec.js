'use strict'

var expect = require('chai').expect
var eventPerDurationLib = require('../../graphs/eventsPerDuration')

describe('Events per Duration Lib', function () {
  describe('#groupByDuration', function () {
    it('returns by group of hours and more than 10 hours', function () {
      var input = [
        { n: 470, duration: 2 },
        { n: 36, duration: 1 },
        { n: 7, duration: 6 },
        { n: 153, duration: 3 },
        { n: 8, duration: -15 },
        { n: 1, duration: 105 },
        { n: 1, duration: 35 },
        { n: 4, duration: 8 }
      ]
      var reply = eventPerDurationLib.groupByDuration(input)

      expect(reply.length).to.equal(6)
      expect(reply[ reply.length - 1 ].n).to.equal(2)
    })
  })

  describe('#setLabelsForDuration', function () {
    it('returns "duration" as a label for graph', function () {
      var input = [
        { n: 36, duration: 1 },
        { n: 470, duration: 2 },
        { n: 153, duration: 3 },
        { n: 7, duration: 6 },
        { n: 4, duration: 8 },
        { n: 2, duration: 10 }
      ]
      var reply = eventPerDurationLib.setLabelsForDuration(input)
      expect(reply[ 0 ].duration).to.equal('0 - 1 hour')
      expect(reply[ reply.length - 1 ].duration).to.equal('10 hours or more')
    })
  })
})
