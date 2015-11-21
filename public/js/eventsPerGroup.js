var w = 800,
h = 500;

var svg = d3.select("#events-per-group")
.append("svg")
.attr("width", w)
.attr("height", h);

// d3.json("pro.json", function(json) {
    var data = [ { group: 'Agile Singapore', n: 16 },
  { group: 'Hackers and Painters', n: 14 },
  { group: 'ArtScience Museum', n: 33 },
  { group: 'Singapore Scala Programmers', n: 12 },
  { group: 'Creative Crew Singapore', n: 13 },
  { group: 'HASKELL.SG', n: 15 },
  { group: 'Hackware', n: 14 },
  { group: 'NUS Hackers', n: 29 },
  { group: 'Front End Developers Singapore', n: 10 },
  { group: 'KopiJS', n: 11 },
  { group: 'DataScience SG', n: 10 },
  { group: 'Singapore Ruby Group', n: 19 },
  { group: 'NTU Open Source Society', n: 18 },
  { group: 'Singapore Mini Maker Faire', n: 16 },
  { group: 'Singapore Spring User Group', n: 10 },
  { group: 'Papers We Love Singapore', n: 10 },
  { group: 'SingaporeJS', n: 45 },
  { group: 'Microsoft User Groups (Singapore)', n: 27 },
  { group: 'Meteor Singapore', n: 12 },
  { group: 'FOSSASIA Singapore Open Technology Meetup', n: 22 },
  { group: 'Ruby Tea Party  (SG)', n: 14 },
  { group: 'Bluemix Singapore', n: 16 } ];

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
            .attr("class", function(d, i) {return "bar " + d.group;})
            .attr("x", function(d, i) {return 0;})
            .attr("y", function(d, i) {return dy*i;})
            .attr("width", function(d, i) {return dx*d.n})
            .attr("height", dy);

            var text = svg.selectAll("text")
            .data(data)
            .enter()
            .append("text")
            .attr("class", function(d, i) {return "group " + d.group;})
            .attr("x", 5)
            .attr("y", function(d, i) {return dy*i + 15;})
            .text( function(d) {return d.group + " (" + d.n  + ")";})
            .attr("font-size", "15px")
            .attr("fill", "green")
            .style("font-weight", "bold")
        // });
