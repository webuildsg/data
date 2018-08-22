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

  callRoute({ url: '/data/public/data/overview.json' }, function (list) {
    var terms = [ 'repos', 'updates', 'events', 'groups' ]

    terms.forEach(function (eachTerm) {
      var data2015 = list['total_' + eachTerm]['2015']
      var data2016 = list['total_' + eachTerm]['2016']
      var data2017 = list['total_' + eachTerm]['2017']

      var dataEl2015 = document.getElementById('total-' + eachTerm + '-2015')
      var dataEl2016 = document.getElementById('total-' + eachTerm + '-2016')
      var dataEl2017 = document.getElementById('total-' + eachTerm + '-2017')

      dataEl2015.innerHTML = data2015
      dataEl2016.innerHTML = data2016
      dataEl2017.innerHTML = data2017

      if (data2017 > data2016) {
        console.log(data2017)
        dataEl2017.parentNode.style.background = '#f8f4da'
      }
    })
  })
})()
