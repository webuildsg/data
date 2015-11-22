var w = 800,
h = 500;

function drawGraph(type, data, attr) {
  var max_n = 0;
  for (var d in data) {
    max_n = Math.max(data[d].n, max_n);
  }

  var graph = d3
    .select('#' + type)
    .append('div');

  var bars = graph.selectAll('.bar')
    .data(data)
    .enter()
    .append('div')
    .attr('class', function(d, i) {
      return 'bar ' + d.language;
    })
    .style('width', function(d, i) {
      return (d.n/max_n * 100) + '%'
    })
    .append('p')
    .attr('class', function(d, i) {
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



