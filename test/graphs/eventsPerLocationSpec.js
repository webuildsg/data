'use strict';

var expect = require('chai').expect;
var eventPerLocationLib = require('../../graphs/eventsPerLocation');

describe('Graph for Events per Location', function() {
  describe('#addPopularLocations', function() {
    it('returns new', function() {
      var location = 'Suntec City';
      var reply = eventPerLocationLib.addPopularLocations(location, [])

      expect(reply.length).to.equal(1);
      expect(reply[ 0 ].complete).to.equal(location);
      expect(reply[ 0 ].all[ 0 ]).to.equal(location);
    })

    it('returns with the new location', function() {
      var location = 'Suntec Tower Jalan Besar 234 Microsoft';
      var locationList = [
        {
          complete: 'Suntec Tower Jalan Besar 234 5',
          all: [ 'Suntec Tower Jalan Besar 234 5' ]
        }
      ];
      var reply = eventPerLocationLib.addPopularLocations(location, locationList);

      expect(reply.length).to.equal(1);
      expect(reply[ 0 ].complete).to.equal(location);
      expect(reply[ 0 ].all.length).to.equal(2);
    })
  })
})
