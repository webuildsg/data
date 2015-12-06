(function () {
  'use strict';

  function callRoute(options, callback) {
    var request = new XMLHttpRequest();

    request.open('GET', options.url, true);
    request.responseType = 'json';
    request.onload = function() {
      callback(request.response);
    }
    request.send();
  }

  var reposPerProgrammingLanguageList = [];
  var repoList = document.getElementById('repos-per-programming-language');

  callRoute({
    url: '/public/data/repos-per-programming-language.json'
  }, function(list) {
    reposPerProgrammingLanguageList = list;
  })

  document.addEventListener('click', function(d) {
    var language = d.target.id.replace('language-', '');
    if (!language){
      return;
    }
    repoList.innerHTML = '';

    reposPerProgrammingLanguageList.forEach(function(r) {
      if (r.language.toLowerCase() === language) {
        console.log(r.language.toLowerCase())
        r.repos.forEach(function(repo) {
          console.log(repo)
          repoList.innerHTML += '<p><a href="' + repo.url + '">' + repo.name + '</a> ★' + repo.stars + '</p>';
        })
      }
    })
  })

})();
