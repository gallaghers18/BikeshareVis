/*
 * Bikeshare Viz
 */

 //Size parameters
var mapWidth = 400;
var mapHeight = 400;
var filtersWidth = 200;
var filtersHeight = mapHeight;
var inPlotWidth = 400;
var inPlotHeight = 400;
var outPlotWidth = 400;
var outPlotHeight = 400;

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

//Resize background
d3.select("#mapBackground").attr('width', mapWidth).attr('height', mapHeight).style('position', 'absolute');

// Add svg and g elements to the webpage
var svgMap = d3.select("#map").append("svg")
        // .style('position', 'absolute')
        // .style('float', 'left')
        .attr("width", mapWidth)
        .attr("height", mapHeight);
var svgFilters = d3.select("#filters").append("svg")
        // .style('margin-left', mapWidth)
        // .style('float', 'left')
        .attr("width", filtersWidth)
        .attr("height", filtersHeight);

var svgInPlot = d3.select("#inPlot").append("svg")
        .attr("width", inPlotWidth)
        .attr("height", inPlotHeight);

var svgOutPlot = d3.select("#outPlot").append("svg")
        // .style('margin-left', mapWidth+filtersWidth+inPlotWidth)
        // .style('float', 'right')
        .attr("width", outPlotWidth)
        .attr("height", outPlotHeight); 
 

// svgFilters.append('svg:rect')
//         .attr('width', filtersWidth)
//         .attr('height', filtersHeight)
//         .style('fill', 'blue');

// svgOutPlot.append('svg:rect')
//         .attr('width', outPlotWidth)
//         .attr('height', outPlotHeight)
//         .style('fill', 'orange');



var drawStations = function() {
    xScale = d3.scale.linear()
                .domain([d3.min(stationData, function(d) { return parseFloat(d['Longitude']); }),
                        d3.max(stationData, function(d) { return parseFloat(d['Longitude']); })])
                .range([0, mapWidth]);
    
    yScale = d3.scale.linear()
                .domain([d3.min(stationData, function(d) { return parseFloat(d['Latitude']); }),
                        d3.max(stationData, function(d) { return parseFloat(d['Latitude']); })])
                .range([mapHeight, 0]);
                
    station = svgMap.selectAll('.station')
        .data(stationData);

    station
        .enter()
        .append('svg:circle')
        .attr('class', 'station')
        .attr('r', 2)
        .attr('cx', function(d) {return xScale(d['Longitude'])})
        .attr('cy', function(d) {return yScale(d['Latitude'])})
        .style('fill', function(d) {if (d['Address'] == '15th St & Constitution Ave NW') {return 'red';} else {return 'blue';}});
}

var drawInPlot = function() {
        maxY = d3.max(d3.values(Q1dataIn), function(d) {
                return d3.max(d3.values(d['Monday']))
        });

        xScale = d3.scale.linear()
                .domain([0, 23.5])
                .range([0, inPlotWidth]);

        yScale = d3.scale.linear()
                .domain([0, maxY])
                // .domain([0, 15])
                .range([outPlotWidth, 0]);

        svg = svgInPlot.append('svg:g')
                        .attr('width', inPlotWidth)
                        .attr('height', inPlotHeight);
 

        xAxisBottom = d3.svg.axis()
                .scale(xScale)
                .orient('bottom')
                .ticks(5)
                .tickSize(5);
        xAxisG = svg.append('g')
                .attr('class', 'axis')
                .attr('transform', 'translate(0,' + inPlotHeight + ')')
                .call(xAxisBottom)
        xAxisTop = d3.svg.axis()
                .scale(xScale)
                .orient('top')
                // .ticks(topTicks)
                // .tickSize(topTicks);
        xAxisG = svg.append('g')
                .attr('class', 'axis')
                .attr('transform', 'translate(0,' + 0 + ')')
                .call(xAxisTop)
        yAxisLeft = d3.svg.axis()
                .scale(yScale)
                .orient('left')
                .ticks(5)
                .tickSize(5);
        yAxisG = svg.append('g')
                .attr('class', 'axis')
                .attr('transform', 'translate(' + 0 + ',0)')
                .call(yAxisLeft);
        yAxisRight = d3.svg.axis()
                .scale(yScale)
                .orient('right')
                // .ticks(rightTicks)
                // .tickSize(rightTicks);
        yAxisG = svg.append('g')
                .attr('class', 'axis')
                .attr('transform', 'translate(' + inPlotWidth + ',0)')
                .call(yAxisRight);

	// point = svg.selectAll('.point') 
        //         .data(d3.values(Q1dataIn));		

        // point.enter().append('svg:circle');	

        // point
        //         .attr('class', 'point')									
        //         .attr('cx', 100)
        //         .attr('cy', function(d) { 
        //                 if ('Monday' in d) {
        //                         if ('4' in d['Monday']) {
        //                                 return yScale(d['Monday']['4']);
        //                         }
        //                 }
        //         })	
        //         .style('fill','blue')									
        //         .attr('r', 5);

        for (station in Q1dataIn) {
                for (x in Q1dataIn[station]['Monday']) {
                        // console.log(Q1dataIn[station]['Monday'][x])
                        svg.append('svg:circle')
                                .attr('r', 2)
                                .style('fill', function(d) {if(station == 'Yuma St & Tenley Circle NW') {return 'blue'} return 'green'})
                                .attr('cx', xScale(x))
                                .attr('cy', yScale(Q1dataIn[station]['Monday'][x]))
                }
        }
                
        
        
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
                                                            drawInPlot();
                                                        });
                                                });
                                        });
                                });                        
                        });
                });
        });
});
});

 