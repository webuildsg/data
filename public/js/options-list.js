/* global XMLHttpRequest */
;(function () {
  'use strict'

  var reposPerProgrammingLanguageList = []
  var repoList = document.getElementById('repos-per-programming-language')

  function callRoute (options, callback) {
    var request = new XMLHttpRequest()

    request.open('GET', options.url, true)
    request.responseType = 'json'
    request.onload = function () {
      callback(request.response)
    }
    request.send()
  }

  function displayReposByLanguage(lang) {
    if (!lang) {
      return
    }

    var language = lang.replace('#', '')

    window.location.hash = language
    repoList.innerHTML = ''

    reposPerProgrammingLanguageList.forEach(function (r) {
      if (r.language.toLowerCase() === language) {
        r.repos.forEach(function (repo) {
          repoList.innerHTML += '<p><a href="' + repo.url + '">' + repo.name + '</a> ★' + repo.stars + '</p>'
        })
      }
    })
  }

  callRoute({
    url: '/public/data/repos-per-programming-language.json'
  }, function (list) {
    reposPerProgrammingLanguageList = list

    if (window.location.hash) {
      displayReposByLanguage(window.location.hash)
    }
  })

  document.addEventListener('click', function (d) {
    displayReposByLanguage(d.target.id.replace('language-', ''))
  })
})()
