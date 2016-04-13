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

  callRoute({ url: '/public/data/overview.json' }, function (list) {
    var terms = [ 'repos', 'updates', 'events', 'groups' ]

    terms.forEach(function(eachTerm) {
      var data2015 = list['total_' + eachTerm]['2015']
      var data2016 = list['total_' + eachTerm]['2016']
      var pastData = document.getElementById('total-' + eachTerm + '-2015')
      var presentData = document.getElementById('total-' + eachTerm + '-2016')

      pastData.innerHTML = data2015
      presentData.innerHTML = data2016

      if (data2016 > data2015) {
        presentData.parentNode.style.background = '#f8f4da'
      }
    })
  })
})()
