var w = 800,
h = 500;

var svg = d3.select("#repos-per-programming")
.append("svg")
.attr("width", w)
.attr("height", h);

// d3.json("pro.json", function(json) {

    var data = [ { language: 'Haskell', n: 12 },
  { language: 'JavaScript', n: 166 },
  { language: 'PHP', n: 66 },
  { language: 'Objective-C', n: 120 },
  { language: 'Rust', n: 15 },
  { language: 'Java', n: 73 },
  { language: 'Python', n: 51 },
  { language: 'Shell', n: 20 },
  { language: 'CoffeeScript', n: 22 },
  { language: 'C', n: 39 },
  { language: 'C++', n: 26 },
  { language: 'TeX', n: 18 },
  { language: 'HTML', n: 38 },
  { language: 'Ruby', n: 47 },
  { language: 'Clojure', n: 34 },
  { language: 'Swift', n: 14 },
  { language: 'CSS', n: 4 },
  { language: 'Go', n: 1 },
  { language: 'R', n: 1 } ];

    var max_n = 0;
    for (var d in data) {
        max_n = Math.max(data[d].n, max_n);
    }

    var dx = w / max_n;
    var dy = h / data.length;

            // bars
            var bars = svg.selectAll(".bar")
            .data(data)
            .enter()
            .append("rect")
            .attr("class", function(d, i) {return "bar " + d.language;})
            .attr("x", function(d, i) {return 0;})
            .attr("y", function(d, i) {return dy*i;})
            .attr("width", function(d, i) {return dx*d.n})
            .attr("height", dy);

            // languages
            var text = svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("class", function(d, i) {return "language " + d.language;})
            .attr("x", 5)
            .attr("y", function(d, i) {return dy*i + 15;})
            .text( function(d) {return d.language + " (" + d.n  + ")";})
            .attr("font-size", "15px")
            .attr("fill", "green")
            .style("font-weight", "bold")
        // });
