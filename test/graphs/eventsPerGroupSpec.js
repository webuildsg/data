'use strict';

var expect = require('chai').expect;
var eventPerGroupLib = require('../../graphs/eventsPerGroup');

describe('Graph for Events per User Group', function() {
  describe('#removeLocationString', function() {
    it('removes "Singapore "', function() {
      var input = [
        {
          group: 'Singapore Ruby Group',
          url: 'url'
        }
      ];

      expect(input[ 0 ].group).to.contain('Singapore ')

      var reply = eventPerGroupLib.removeLocationString(input);

      expect(reply[ 0 ].group).to.not.contain('Singapore ')
    })

    it('removes "(Singapore)"', function() {
      var input = [
        {
          group: 'Ruby Group (Singapore)',
          url: 'url'
        }
      ];

      expect(input[ 0 ].group).to.contain('(Singapore)')

      var reply = eventPerGroupLib.removeLocationString(input);

      expect(reply[ 0 ].group).to.not.contain('(Singapore)')
    })

    it('removes "(SG)"', function() {
      var input = [
        {
          group: 'Ruby Group (SG)',
          url: 'url'
        }
      ];

      expect(input[ 0 ].group).to.contain('(SG)')

      var reply = eventPerGroupLib.removeLocationString(input);

      expect(reply[ 0 ].group).to.not.contain('(SG)')
    })

    it('removes " SG"', function() {
      var input = [
        {
          group: 'Ruby Group  SG',
          url: 'url'
        }
      ];

      expect(input[ 0 ].group).to.contain(' SG')

      var reply = eventPerGroupLib.removeLocationString(input);

      expect(reply[ 0 ].group).to.not.contain(' SG')
    })
  })

  describe('#correctFacebookUrl', function() {
    it('removes url /group from facebook url', function() {
      var input = [
        {
          group: 'Singapore Ruby Group',
          url: 'http://www.facebook.com/groups/837492384729847'
        }
      ];

      expect(input[ 0 ].url).to.contain('/groups')
      expect(input[ 0 ].url).to.contain('www.facebook.com')

      var reply = eventPerGroupLib.correctFacebookUrl(input);

      expect(reply[ 0 ].url).to.not.contain('/groups ')
    })
  })
})
