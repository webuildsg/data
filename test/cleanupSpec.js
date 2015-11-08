'use strict';

var expect = require('chai').expect;
var moment = require('moment-timezone');
var cleanupLib = require('../tasks/cleanup');

describe('Cleanup', function() {
  describe('when the data is events', function() {
    describe('#listFiles', function() {
      it('returns a list of all .json files', function() {
        expect(cleanupLib.listFiles('events')[0]).to.contain('.json');
        expect(cleanupLib.listFiles('events')).to.be.instanceof(Array);
      })
    })
  })

  describe('when the data is repos', function() {
    describe('#listFiles', function() {
      it('returns a list of all .json files', function() {
        expect(cleanupLib.listFiles('repos')[0]).to.contain('.json');
        expect(cleanupLib.listFiles('repos')).to.be.instanceof(Array);
      })
    })
  })
})
