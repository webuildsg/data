'use strict';

var expect = require('chai').expect;
var moment = require('moment-timezone');
var cleanupLib = require('../tasks/cleanup');

describe('Cleanup', function() {
  describe('when the data is events', function() {
    describe('#listFilePaths', function() {
      it('returns a list of all .json files', function() {
        expect(cleanupLib.listFilePaths('events')[0]).to.contain('.json');
        expect(cleanupLib.listFilePaths('events')).to.be.instanceof(Array);
      })
    })

    describe('#getCurrentDayData', function() {
      it('returns events for only the upcoming day', function() {
        var allEvents = require('./factory/allEvents');
        var allEventsNum = allEvents.meta.total_events;
        var todayEvents = cleanupLib.getCurrentDayData(allEvents, 'events');
        var todayEventsNum = todayEvents.meta.total_events;

        expect(todayEventsNum).to.be.below(allEventsNum);
      })
    })

    describe('#cleanup', function() {
      it('returns events for the upcoming day', function() {
        cleanupLib.cleanup('events');
      })
    })
  })

  describe('when the data is repos', function() {
    describe('#listFilePaths', function() {
      it('returns a list of all .json files', function() {
        expect(cleanupLib.listFilePaths('repos')[0]).to.contain('.json');
        expect(cleanupLib.listFilePaths('repos')).to.be.instanceof(Array);
      })
    })

    describe('#getCurrentDayData', function() {
      it('returns repos for only the previous day', function() {
        var allRepos = require('./factory/allRepos');
        var allReposNum = allRepos.meta.total_repos;
        var todayRepos = cleanupLib.getCurrentDayData(allRepos, 'repos');
        var todayReposNum = todayRepos.meta.total_repos;

        expect(todayReposNum).to.be.below(allReposNum);
      })
    })
  })
})
