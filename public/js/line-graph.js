/* global d3 */
;(function () {
  'use strict'

  // inspired by http://bl.ocks.org/mbostock/3902569
  ;[
    'repos',
    'events'
  ].forEach(function (type) {
    d3.json('/public/data/' + type + '-per-week.json', function (error, data) {
      if (error) {
        console.log(error)
      }

      var margin = {top: 20, right: 50, bottom: 30, left: 50}
      var width = 960 - margin.left - margin.right
      var height = 500 - margin.top - margin.bottom
      var parseDate = d3.time.format('%d-%b-%y').parse
      var bisectDate = d3.bisector(function (d) { return d.date }).left
      var formatDate = function (d) {
        return d[ type ] + ' ' + type + ' in the week of ' + d.formatted_date
      }

      var x = d3.time.scale().range([0, width])
      var y = d3.scale.linear().range([height, 0])
      var xAxis = d3.svg.axis().scale(x).orient('bottom')
        .tickFormat(function (d) {
          return d.toString().substring(4, 7) + "'" + d.toString().substring(13, 15)
        })
      var yAxis = d3.svg.axis().scale(y).orient('left')

      var line = d3.svg.line()
        .x(function (d) { return x(d.date) })
        .y(function (d) { return y(d[ type ]) })

      var svg = d3.select('#' + type + '-per-week').append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

      data.forEach(function (d) {
        d.date = parseDate(d.date)
        d[ type ] = +d[ type ]
      })

      data.sort(function (a, b) {
        return a.date - b.date
      })

      x.domain([data[0].date, data[data.length - 1].date])
      y.domain(d3.extent(data, function (d) {
        return d[ type ]
      }))

      svg.append('g')
        .attr('class', 'x axis')
        .attr('transform', 'translate(0,' + height + ')')
        .call(xAxis)

      svg.append('g')
        .attr('class', 'y axis')
        .call(yAxis)
        .append('text')
        .attr('transform', 'rotate(-90)')
        .attr('y', 6)
        .attr('dy', '.71em')
        .style('text-anchor', 'end')
        .text('No. of ' + type)

      svg.append('path')
        .datum(data)
        .attr('class', 'line')
        .attr('d', line)

      var focus = svg.append('g')
        .attr('class', 'focus')
        .style('display', 'block')

      focus.append('circle')
        .attr('r', 7)

      focus.append('text')
        .attr('x', 9)

      svg.append('rect')
        .attr('class', 'overlay')
        .attr('width', width)
        .attr('height', height)
        .on('mouseover', function () { focus.style('display', null) })
        .on('mouseout', function () { focus.style('display', 'none') })
        .on('mousemove', mousemove)

      function mousemove () {
        var x0 = x.invert(d3.mouse(this)[0])
        var i = bisectDate(data, x0, 1)
        var d0 = data[i - 1]
        var d1 = data[i]
        var d = x0 - d0.date > d1.date - x0 ? d1 : d0

        focus.attr('transform', 'translate(' + x(d.date) + ',' + y(d[ type ]) + ')')
        focus.select('text')
          .text(formatDate(d))
          .attr('class', 'label')
          .attr('dx', function () {
            return i / data.length > 0.5 ? '-17em' : '-1em'
          })
          .attr('dy', '1.5em')
      }
    })
  })
})()
