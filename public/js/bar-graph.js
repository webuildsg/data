/* global d3 */
;(function () {
  'use strict'

  function drawGraph (type, data, attr) {
    var maxN = 0
    data.forEach(function (d) {
      maxN = Math.max(d.n, maxN)
    })

    var graph = d3.select('#' + type)

    var bars = graph.selectAll('.bar')
      .data(data)
      .enter()
      .append('div').classed('bar', true)

    bars
      .append('div')
      .classed('graph-label', true)
      .append('a')
      .attr('href', function (d) {
        return d.url
      })
      .attr('target', '_blank')
      .text(function (d) {
        return d[ attr ]
      })

    bars
      .append('div')
      .classed('graph-bar', true)
      .style('width', function (d) {
        return (d.n / maxN * 70) + '%'
      })
      .text(function (d) {
        return d.n
      })

    if (data[0].formatted_time) {
      bars
        .append('div')
        .classed('graph-hover', true)
        .text(function (d) {
          return 'last updated on ' + d.formatted_time
        })
    }
  }

  [
    'repos-update-activities-per-programming',
    'events-per-group',
    'events-per-day-of-week',
    'events-per-week-of-month',
    'events-per-duration',
    'events-per-time-of-day',
    'repos-most-active'
  ].forEach(function (type) {
    d3.json('/public/data/' + type + '.json', function (error, data) {
      if (error) {
        console.log(error)
      }

      var attr

      if (type === 'repos-update-activities-per-programming') {
        attr = 'language'
      } else if (type === 'events-per-group') {
        attr = 'group'
      } else if (type === 'events-per-day-of-week') {
        attr = 'day'
      } else if (type === 'events-per-duration') {
        attr = 'duration'
      } else if (type === 'events-per-time-of-day') {
        attr = 'time'
      } else if (type === 'repos-most-active') {
        attr = 'name'
      } else if (type === 'events-per-week-of-month') {
        attr = 'week'
      }

      drawGraph(type, data, attr)
    })
  })
})()
