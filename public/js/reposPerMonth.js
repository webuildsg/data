(function () {
  var m = [80, 80, 80, 80];
  var w = 1000 - m[1] - m[3];
  var h = 400 - m[0] - m[2];

  var data = [ 7, 38, 35, 67, 70, 73, 76, 83, 129, 51, 106, 77 ];
  var x = d3.scale.linear().domain([0, data.length]).range([0, w]);
  var y = d3.scale.linear().domain([0, 130]).range([h, 0]);
  var line = d3.svg.line()
    .x(function(d,i) {
      console.log('Plotting X value for data point: ' + d + ' using index: ' + i + ' to be at: ' + x(i) + ' using our xScale.');
      return x(i);
    })
    .y(function(d) {
      console.log('Plotting Y value for data point: ' + d + ' to be at: ' + y(d) + " using our yScale.");
      return y(d);
    })

  var graph = d3.select("#repos-per-month").append("svg:svg")
    .attr("width", w + m[1] + m[3])
    .attr("height", h + m[0] + m[2])
    .append("svg:g")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

  var xAxis = d3.svg.axis().scale(x).tickSize(-h).tickSubdivide(true);

  graph.append("svg:g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + h + ")")
    .call(xAxis);

  var yAxisLeft = d3.svg.axis().scale(y).ticks(4).orient("left");

  graph.append("svg:g")
    .attr("class", "y axis")
    .attr("transform", "translate(-25,0)")
    .call(yAxisLeft);

  graph.append("svg:path").attr("d", line(data));
})();


