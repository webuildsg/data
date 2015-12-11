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

    document.getElementById('total-repos').innerHTML = overviewNumbers.total_uniq_repos_updated
    document.getElementById('total-updates').innerHTML = overviewNumbers.total_updates_for_repos
    document.getElementById('total-events').innerHTML = overviewNumbers.total_events_held
    document.getElementById('total-groups').innerHTML = overviewNumbers.total_user_groups_held_events
  })
})()
