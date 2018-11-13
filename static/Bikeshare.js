/*
 * Bikeshare Viz
 */

 //Size parameters
var width = 500;
var height = 500;
var stationData;
var Q1Data;
var Q2Data;
var Q3Data;
var Q4Data;

var getStationData = '/stationData/';
var getQ1Data = '/Q1Data/';
var getQ2Data = '/Q2Data/';
var getQ3Data = '/Q3Data/';
var getQ4Data = '/Q4Data/';


// Add svg and g elements to the webpage
var svgMap = d3.select("#mapDiv").append("svg")
        .attr("width", width)
        .attr("height", height);

 

var drawStations = function() {
    xScale = d3.scale.linear()
                .domain([d3.min(stationData, function(d) { return parseFloat(d['Latitude']); }),
                        d3.max(stationData, function(d) { return parseFloat(d['Latitude']); })])
                .range([0, width]);
    
    yScale = d3.scale.linear()
                .domain([d3.min(stationData, function(d) { return parseFloat(d['Longitude']); }),
                        d3.max(stationData, function(d) { return parseFloat(d['Longitude']); })])
                .range([height, 0]);
                
    station = svgMap.selectAll('.station')
        .data(stationData);

    station
        .enter()
        .append('svg:circle')
        .attr('class', 'station')
        .attr('r', 2)
        .attr('cx', function(d) {return xScale(d['Latitude'])})
        .attr('cy', function(d) {return yScale(d['Longitude'])});
}



d3.json(getStationData, function(error, data) {
    stationData = data['data'];
  
    // d3.json(getQ1Data, function(error, data) {
        // console.log(data)
        drawStations();
    // });
  });

 