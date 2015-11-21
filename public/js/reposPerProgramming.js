var w = 800,
h = 500;


d3.json('public/data/repos-per-programming.json', function(error, data) {
  var max_n = 0;

  for (var d in data) {
    max_n = Math.max(data[d].n, max_n);
  }

  var svg = d3.select('#repos-per-programming')
    .append('svg')
    .attr('width', w)
    .attr('height', h);

  var dx = w / max_n;
  var dy = h / data.length;
  var bars = svg.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', function(d, i) {
      return 'bar ' + d.language;
    })
    .attr('x', function(d, i) {
      return 0;
    })
    .attr('y', function(d, i) {
      return dy * i;
    })
    .attr('width', function(d, i) {
      return dx*d.n
    })
    .attr('height', dy);

  var text = svg.selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('class', function(d, i) {
      return 'language ' + d.language;
    })
    .attr('x', 5)
    .attr('y', function(d, i) {
      return dy*i + 15;
    })
    .text( function(d) {
      return d.language + ' (' + d.n  + ')';
    })
    .attr('font-size', '15px')
    .attr('fill', 'green')
    .style('font-weight', 'bold')
});
