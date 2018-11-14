/*
 * Bikeshare Viz
 */

 //Size parameters
var width = 500;
var height = 500;
var stationData;
var Q1dataIn;
var Q2dataIn;
var Q3dataIn;
var Q4dataIn;
var Q1dataOut;
var Q2dataOut;
var Q3dataOut;
var Q4dataOut;

var getStationData = '/stationData/';
var getQ1dataIn = '/Q1dataIn/';
var getQ2dataIn = '/Q2dataIn/';
var getQ3dataIn = '/Q3dataIn/';
var getQ4dataIn = '/Q4dataIn/';
var getQ1dataOut = '/Q1dataOut/';
var getQ2dataOut = '/Q2dataOut/';
var getQ3dataOut = '/Q3dataOut/';
var getQ4dataOut = '/Q4dataOut/';


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
    d3.json(getQ1dataIn, function(error, data) {
            Q1dataIn = data['data'];
            d3.json(getQ2dataIn, function(error, data) {
                Q2dataIn = data['data'];
                d3.json(getQ3dataIn, function(error, data) {
                        Q3dataIn = data['data'];
                        d3.json(getQ4dataIn, function(error, data) {
                                Q4dataIn = data['data'];
                                d3.json(getQ1dataOut, function(error, data) {
                                        Q1dataOut = data['data'];
                                        d3.json(getQ2dataOut, function(error, data) {
                                            Q2dataOut = data['data'];
                                            d3.json(getQ3dataOut, function(error, data) {
                                                    Q3data = data['data'];
                                                    d3.json(getQ4dataOut, function(error, data) {
                                                            Q4data = data['data'];
                                                            drawStations();
                                                        });
                                                });
                                        });
                                });                        
                        });
                });
        });
});
});

 