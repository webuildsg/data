(function () {
  'use strict';

  function drawGraph(type, data, attr) {
    var max_n = 0;
    var graph = d3.select('#' + type);

    data.forEach(function(d) {
      max_n = Math.max(d.n, max_n);
    })

    graph.selectAll('.bar')
      .data(data)
      .enter()
      .append('div')
      .attr('class', function(d) {
        return 'bar ' + d.language;
      })
      .style('width', function(d) {
        return (d.n/max_n * 100) + '%'
      })
      .append('p')
      .attr('class', function(d) {
        return attr + ' ' + d[ attr ];
      })
      .text( function(d) {
        return d[ attr ] + ' (' + d.n  + ')';
      })
  }

  [
    'repos-per-programming',
    'events-per-group'
  ].forEach(function(type) {
    d3.json('public/data/' + type + '.json', function(error, data) {
      if (error) {
        console.log(error)
      }

      var attr = type === 'repos-per-programming' ? 'language': 'group';
      drawGraph(type, data, attr);
    });
  })
})();
