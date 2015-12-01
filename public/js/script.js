(function () {
  'use strict';

  // search bar
  var searchStyle = document.getElementById('search_style');
  var searchBox = document.getElementById('search');

  if (searchBox) {
    searchBox.addEventListener('input', function() {
      if (!this.value) {
        searchStyle.innerHTML = '';
        return;
      }

      searchStyle.innerHTML = '.searchable:not([data-index*=\"' + this.value.toLowerCase() + '\"]) { display: none; }';
    });
  }

  // click red header to link back to the homepage
  document.getElementsByTagName('header')[0].addEventListener('click', function() {
    window.parent.location.href = '/';
  });
})();
