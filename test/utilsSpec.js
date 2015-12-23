'use strict'

var expect = require('chai').expect
var utilsLib = require('../tasks/utils')

describe('Utils', function () {
  describe('#listFilePaths', function () {
    describe('when no options are provided', function () {
      describe('when the data is events', function () {
        it('returns a list of all .json files', function () {
          expect(utilsLib.listFilePaths('events')[0]).to.contain('.json')
          expect(utilsLib.listFilePaths('events')).to.be.instanceof(Array)
        })
      })

      describe('when the data is repos', function () {
        it('returns a list of all .json files', function () {
          expect(utilsLib.listFilePaths('repos')[0]).to.contain('.json')
          expect(utilsLib.listFilePaths('repos')).to.be.instanceof(Array)
        })
      })
    })

    describe('when weeks option is given', function () {
      describe('when the data is events', function () {
        it('returns a list of .json files in the last n weeks')
      })

      describe('when the data is repos', function () {
        it('returns a list of .json files in the last n weeks')
      })
    })
  })

  describe('#getCurrentDayData', function () {
    describe('when the data is events', function () {
      it('returns events for only the upcoming day', function () {
        var allEvents = require('./factory/allEvents')
        var allEventsNum = allEvents.meta.total_events
        var todayEvents = utilsLib.getCurrentDayData(allEvents, 'events')
        var todayEventsNum = todayEvents.meta.total_events

        expect(todayEventsNum).to.be.below(allEventsNum)
      })
    })

    describe('when the data is repos', function () {
      it('returns repos for only the previous day', function () {
        var allRepos = require('./factory/allRepos')
        var allReposNum = allRepos.meta.total_repos
        var todayRepos = utilsLib.getCurrentDayData(allRepos, 'repos')
        var todayReposNum = todayRepos.meta.total_repos

        expect(todayReposNum).to.be.below(allReposNum)
      })
    })
  })
})
