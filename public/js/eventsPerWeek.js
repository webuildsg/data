(function () {
  var m = [80, 80, 80, 80];
  var w = 1000 - m[1] - m[3];
  var h = 400 - m[0] - m[2];

  d3.json('public/data/events-per-week.json', function(error, json) {

    // var data = [ 0, 1, 3, 16, 13, 17, 21, 22, 2, 18, 11, 47, 17, 31, 8, 29, 17, 25, 6, 14, 22, 19, 17, 17, 19, 21, 14, 13, 12, 11, 19, 17, 7, 24, 45, 36, 28, 13, 16, 10, 15, 20, 20, 11, 14, 16 ];
    var data = json.events;
    var x = d3.scale.linear().domain([0, data.length]).range([0, w]);
    var y = d3.scale.linear().domain([0, 50]).range([h, 0]);
    var line = d3.svg.line()
      .x(function(d,i) {
        return x(i);
      })
      .y(function(d) {
        return y(d);
      })

    var graph = d3.select("#events-per-week").append("svg:svg")
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
  })
})();


