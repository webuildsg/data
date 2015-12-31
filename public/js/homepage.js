/* global XMLHttpRequest */
;(function () {
  'use strict'

  function callRoute (options, callback) {
    var request = new XMLHttpRequest()

    request.open('GET', options.url, true)
    request.responseType = 'json'
    request.onload = function () {
      callback(request.response)
    }
    request.send()
  }

  // search bar
  var searchStyle = document.getElementById('search_style')
  var searchBox = document.getElementById('search')

  if (searchBox) {
    searchBox.addEventListener('input', function () {
      if (!this.value) {
        searchStyle.innerHTML = ''
        return
      }

      searchStyle.innerHTML = '.searchable:not([data-index*="' + this.value.toLowerCase() + '"]) { display: none; }'
    })
  }

  // fill in overview numbers
  callRoute({
    url: '/public/data/overview.json'
  }, function (list) {
    var overviewNumbers = list[ 0 ]

    document.getElementById('total-repos-2015').innerHTML = overviewNumbers.total_uniq_repos_updated
    document.getElementById('total-updates-2015').innerHTML = overviewNumbers.total_updates_for_repos
    document.getElementById('total-events-2015').innerHTML = overviewNumbers.total_events_held
    document.getElementById('total-groups-2015').innerHTML = overviewNumbers.total_user_groups_held_events

    document.getElementById('total-repos-2016').innerHTML = overviewNumbers.total_uniq_repos_updated_2016
    document.getElementById('total-updates-2016').innerHTML = overviewNumbers.total_updates_for_repos_2016
    document.getElementById('total-events-2016').innerHTML = overviewNumbers.total_events_held_2016
    document.getElementById('total-groups-2016').innerHTML = overviewNumbers.total_user_groups_held_events_2016
  })
})()
