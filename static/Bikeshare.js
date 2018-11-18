/*
 * Bikeshare Viz
 */

 //Size parameters
var mapWidth = 400;
var mapHeight = 400;
var filtersWidth = mapWidth;
var filtersHeight = 100;
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

var xScaleIn;
var yScaleIn;

var getStationData = '/stationData/';
var getQ1dataIn = '/Q1dataIn/';
var getQ2dataIn = '/Q2dataIn/';
var getQ3dataIn = '/Q3dataIn/';
var getQ4dataIn = '/Q4dataIn/';
var getQ1dataOut = '/Q1dataOut/';
var getQ2dataOut = '/Q2dataOut/';
var getQ3dataOut = '/Q3dataOut/';
var getQ4dataOut = '/Q4dataOut/';
//Resize container svg
d3.select("#container")
        .attr('width', mapWidth+inPlotWidth+outPlotWidth)
        .attr('height', mapHeight+filtersHeight);

//Resize background
d3.select("#mapBackground").attr('width', mapWidth).attr('height', mapHeight).style('position', 'absolute');

// Add svg and g elements to the webpage
var svgMap = d3.select("#map").attr('x', 0).attr('y', 0)
        .append("svg")
        .style('position', 'absolute')
        // .style('float', 'left')
        .attr("width", mapWidth)
        .attr("height", mapHeight);

d3.select("#filters").attr('x', 2*mapWidth)

var svgFilters = d3.select("#filters").attr('x', 0).attr('y', mapHeight)
        .append("svg")
        .attr("width", filtersWidth)
        .attr("height", filtersHeight);

var svgInPlot = d3.select("#inPlot").attr('x', mapWidth).attr('y', 0)
        .append("svg")
        .attr("width", inPlotWidth)
        .attr("height", inPlotHeight);

var svgOutPlot = d3.select("#outPlot").attr('x', mapWidth + inPlotWidth).attr('y', 0)
        .append("svg")
        .attr("width", outPlotWidth)
        .attr("height", outPlotHeight); 
 

        //JUST FOR POSITIONING TEMPORARYRRRRRYYYYYYYY
svgFilters.append('svg:rect')
        .attr('width', filtersWidth)
        .attr('height', filtersHeight)
        .style('fill', 'blue');

svgOutPlot.append('svg:rect')
        .attr('width', outPlotWidth)
        .attr('height', outPlotHeight)
        .style('fill', 'orange');



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
        .attr('r', 3)
        .attr('cx', function(d) {return xScale(d['Longitude'])})
        .attr('cy', function(d) {return yScale(d['Latitude'])})
        .on('click', function(d) {highlight(d)} )
        .style('fill', function(d) {if (d['Address'] == '15th St & Constitution Ave NW') {return 'red';} else {return 'blue';}});
}

function highlight(d) {
        console.log(".c-" + d['Address'].replace(/\s/g, '').replace('&','').replace('/',''))
        d3.selectAll(".c-" + d['Address'].replace(/\s/g, '').replace('&','').replace('/','')).style('stroke-width', 20).style('stroke', 'green');

}

var drawInPlot = function() {
        maxY = d3.max(d3.values(Q1dataIn), function(d) {
                return d3.max(d3.values(d['Monday']))
        });

        xScaleIn = d3.scale.linear()
                .domain([0, 23.5])
                .range([0, inPlotWidth]);

        yScaleIn = d3.scale.linear()
                .domain([0, maxY])
                .range([outPlotWidth, 0]);

        svg = svgInPlot
 
        xAxisBottom = d3.svg.axis()
                .scale(xScaleIn)
                .orient('bottom')
                .ticks(5)
                .tickSize(5);
        xAxisG = svg.append('g')
                .attr('class', 'axis')
                .attr('transform', 'translate(0,' + inPlotHeight + ')')
                .call(xAxisBottom)
        xAxisTop = d3.svg.axis()
                .scale(xScaleIn)
                .orient('top')
                // .ticks(topTicks)
                // .tickSize(topTicks);
        xAxisG = svg.append('g')
                .attr('class', 'axis')
                .attr('transform', 'translate(0,' + 0 + ')')
                .call(xAxisTop)
        yAxisLeft = d3.svg.axis()
                .scale(yScaleIn)
                .orient('left')
                .ticks(5)
                .tickSize(5);
        yAxisG = svg.append('g')
                .attr('class', 'axis')
                .attr('transform', 'translate(' + 0 + ',0)')
                .call(yAxisLeft);
        yAxisRight = d3.svg.axis()
                .scale(yScaleIn)
                .orient('right')
                // .ticks(rightTicks)
                // .tickSize(rightTicks);
        yAxisG = svg.append('g')
                .attr('class', 'axis')
                .attr('transform', 'translate(' + inPlotWidth + ',0)')
                .call(yAxisRight);

        // for (station in Q1dataIn) {
        //         for (x in Q1dataIn[station]['Monday']) {
        //                 // console.log(Q1dataIn[station]['Monday'][x])
        //                 svg.append('svg:circle')
        //                         .attr('r', 2)
        //                         .style('fill', function(d) {if(station == 'Yuma St & Tenley Circle NW') {return 'blue'} return 'green'})
        //                         .attr('cx', xScale(x))
        //                         .attr('cy', yScale(Q1dataIn[station]['Monday'][x]))
        //         }
        // }
        
        lines = svg.selectAll('.line')
                .data(d3.values(Q1dataIn))
                .enter();

        lineFunction = d3.svg.line()
                .x(function(d) { return d.x; })
                .y(function(d) { return d.y; })
                .interpolate("linear");
        
        lines.append('svg:path')
                .attr('class', function(d) {return 'c-'+d['Address'].replace(/\s/g, '').replace('&','').replace('/','');})
                // .attr('class', 'a')
                .attr('d', function(d) { return lineFunction(generateLineData(d)); })
                .attr('stroke', d3.rgb(192, 192, 192))
                .attr('stroke-width', 1)
                .attr('fill', 'none')
                .on('click', function(d) {console.log(d3.select(this).attr('class'))})

        for (station in Q1dataIn) {
                lineData = []
                for (x in Q1dataIn[station]['Monday']) {
                        lineData.push({"x": xScale(x), "y": yScale(Q1dataIn[station]['Monday'][x])})
                }
        }    
}

function generateLineData(d) {
        if (!('Monday' in d)) {
                console.log("skipped it")
                return [{"x": xScaleIn(0), "y": yScaleIn(0)},
                        {"x": xScaleIn(23.5), "y": yScaleIn(0)}];
        }

        lineData = []

        for (var x=0; x < 24; x=x+0.5) {
                if (x in d['Monday']) {
                        lineData.push({"x": xScaleIn(x), "y": yScaleIn(d['Monday'][x])});
                } else {
                        lineData.push({"x": xScaleIn(x), "y": yScaleIn(0)});
                }
        }

        for (x in d['Monday']) {
                lineData.push({"x": xScaleIn(x), "y": yScaleIn(d['Monday'][x])});
        }

        return lineData;

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

 