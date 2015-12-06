(function () {
  'use strict';

  // click red header to link back to the homepage
  document.getElementsByTagName('header')[0].addEventListener('click', function() {
    window.parent.location.href = '/';
  });
})();
