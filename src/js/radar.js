// Import d3.js
const d3 = require('d3')

// Create SVG container for spider chart
const svg = d3
  .select('body')
  .append('svg')
  .attr('width', 800)
  .attr('height', 600)

// Create spider chart and three series
const chart = svg
  .append('g')
  .attr('transform', 'translate(400, 300)')

// Add constant points to series
const categories = ['Pre-planning', 'Customer contacts', 'Meetings', 'Development time', 'Releases']
const seriesData = [
  [
    { axis: categories[0], value: 6 },
    { axis: categories[1], value: 22 },
    { axis: categories[2], value: 61 },
    { axis: categories[3], value: 76 },
    { axis: categories[4], value: 100 },
  ],
  [
    { axis: categories[0], value: 44 },
    { axis: categories[1], value: 8 },
    { axis: categories[2], value: 97 },
    { axis: categories[3], value: 68 },
    { axis: categories[4], value: 69 },
  ],
  [
    { axis: categories[0], value: 94 },
    { axis: categories[1], value: 63 },
    { axis: categories[2], value: 4 },
    { axis: categories[3], value: 67 },
    { axis: categories[4], value: 71 },
  ],
]

const series = seriesData.map((data, i) => {
  return chart
    .selectAll('.series')
    .data([data])
    .enter()
    .append('g')
    .attr('class', 'series')

  // Add points to series
  series
    .selectAll('.point')
    .data((d) => d)
    .enter()
    .append('circle')
    .attr('class', 'point')
    .attr('r', 5)
    .attr('cx', (d) => Math.cos(i / seriesData.length * 2 * Math.PI) * d.value)
    .attr('cy', (d) => Math.sin(i / seriesData.length * 2 * Math.PI) * d.value)
})

// Add LegendBox
const legendBox = chart.append('g')
  .attr('transform', 'translate(-200, 200)')

legendBox.append('rect')
  .attr('width', 200)
  .attr('height', 100)
  .attr('fill', 'white')

legendBox.selectAll('.legend-item')
  .data(['Sydney', 'Kuopio', 'New York'])
  .enter()
  .append('g')
  .attr('class', 'legend-item')
  .attr('transform', (d, i) => `translate(10, ${i * 20 + 10})`)
  .each(function (d, i) {
    d3.select(this)
      .append('circle')
      .attr('r', 5)
      .attr('fill', 'black')
      .attr('cx', -5)
      .attr('cy', 0
