;(function () {
  'use strict'

  var headerEl = document.getElementsByTagName('header')[0]
  headerEl.addEventListener('click', function () {
    window.parent.location.href = '/'
  })
})()
