/*
 * Bikeshare Viz
 */



 //Size parameters
var mapWidth = 400;
var mapHeight = mapWidth;
var filtersWidth = mapWidth;
var filtersHeight = mapWidth/4;
var inPlotWidth = mapWidth;
var inPlotHeight = mapWidth;
var outPlotWidth = mapWidth;
var outPlotHeight = mapWidth;
var margin = 40;

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

var dotDefault = d3.rgb(192, 192, 192);
var dotToggle = 'red';
var pathDefault = d3.rgb(192, 192, 192);
// var pathDefault = 'pink';
var pathToggle = 'red';

var clickSize = 10;
var downX;
var upX;
var downY;
var upY;
var curX;
var curY;
var mouseDown = false;

var selectionCount = 0;
var selectionColors = ['Red', 'Blue', 'Green', 'Pink', 'Purple', 'Orange', 'Red']

var cur_dataset_in;
var cur_dataset_out;
var cur_day;
var last_dayClicked;
var last_seasonClicked;


//Resize container svg
d3.select("#container")
        .attr('width', mapWidth+inPlotWidth+outPlotWidth+2*margin)
        .attr('height', mapHeight+filtersHeight+margin);

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

var svgFilters = d3.select("#filters").attr('x', 0).attr('y', mapHeight+margin)
        .append("svg")
        .attr("width", filtersWidth)
        .attr("height", filtersHeight);

var svgInPlot = d3.select("#inPlot").attr('x', mapWidth + margin).attr('y', 0)
        .append("svg")
        .attr("width", inPlotWidth)
        .attr("height", inPlotHeight);

var svgOutPlot = d3.select("#outPlot").attr('x', mapWidth + inPlotWidth + 2*margin).attr('y', 0)
        .append("svg")
        .attr("width", outPlotWidth)
        .attr("height", outPlotHeight); 

var highlightRect = svgMap.append('svg:rect')
        .attr('width', 0)
        .attr('height', 0)
        .style('fill', 'rgba(0, 0, 0, 0.5)')
        .on('mouseup', function (d) {
                resolveMouseUp();
        })
        .on('mousemove', function(d) {
                drawHighlightRect();  
        })
        .on('mouseover', function(d) { d3.select(this).style('cursor', 'pointer')})
        .on('mouseout', function(d) { d3.select(this).style('cursor', 'default')});

        //JUST FOR POSITIONING TEMPORARYRRRRRYYYYYYYY
svgFilters.append('svg:rect')
        .attr('width', filtersWidth)
        .attr('height', filtersHeight)
        .style('fill', '#DCDCDC')
        .style('stroke', 'black');

//I start building filters below
dayMap = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
seasonMap = ['Winter', 'Spring', 'Summer', 'Fall']

dayFilter = svgFilters.selectAll('.rect')
        .data(dayMap);

dayLabels = svgFilters.selectAll('.text')
        .data(dayMap);


dayFilter
        .enter()
        .append('svg:rect')
        .attr('class', function(d){return d;})
        .attr('x', function(d,i){return i*(filtersWidth/7) + filtersWidth/72;})
        .attr('y',filtersHeight-filtersWidth/10-3)
        .attr('width', filtersWidth/9)
        .attr('height',filtersWidth/10)
        .style('fill', 'rgb(255,50,30)')
        .style('stroke', 'white')
        .on('click', dayFilterClick)
        .on('mouseover', function(d) { d3.select(this).style('cursor', 'pointer')})
        .on('mouseout', function(d) { d3.select(this).style('cursor', 'default')});

dayLabels
        .enter()
        .append('text')
        .attr('x', function(d,i){return (i*(filtersWidth/7)+filtersWidth/36+filtersWidth/72);})
        .attr('y',filtersHeight - filtersWidth/18-3)
        .text(function(d){return d.substring(0, 3)+'.';})
        .on('click', dayFilterClick)
        .on('mouseover', function(d) { d3.select(this).style('cursor', 'pointer')})
        .on('mouseout', function(d) { d3.select(this).style('cursor', 'default')});

seasonFilter = svgFilters.selectAll('.rect')
        .data(seasonMap);

seasonLabels = svgFilters.selectAll('.text')
        .data(seasonMap);

seasonFilter
        .enter()
        .append('svg:rect')
        .attr('class', function(d){return d;})
        .attr('x', function(d,i){return i*(filtersWidth/4) + filtersWidth/24;})
        .attr('y',3)
        .attr('width', filtersWidth/6)
        .attr('height',filtersWidth/9)
        .style('fill', 'rgb(255,50,30)')
        .style('stroke', 'white')
        .on('click', seasonFilterClick)
        .on('mouseover', function(d) { d3.select(this).style('cursor', 'pointer')})
        .on('mouseout', function(d) { d3.select(this).style('cursor', 'default')});

seasonLabels
        .enter()
        .append('text')
        .attr('x', function(d,i){return (i*(filtersWidth/4)+filtersWidth/12);})
        .attr('y',23)
        .text(function(d){return d;})
        .on('click', seasonFilterClick)
        .on('mouseover', function(d) { d3.select(this).style('cursor', 'pointer')})
        .on('mouseout', function(d) { d3.select(this).style('cursor', 'default')});



function dayFilterClick(day) {
    console.log(day, cur_dataset_in['1st & D St SE']['Friday']);
    cur_day = day;
    
    d3.select("."+last_dayClicked) //make last pressed day button normal color
        .style('fill', 'rgb(255,50,30)')
        .style('stroke', 'white');

    d3.select("."+day) // make newly pressed day button darker color
        .style('fill', 'white')
        .style('stroke', 'rgb(255,50,30)');

    d3.selectAll('.lines')
        .remove()
    drawPlot(day,cur_dataset_in, true)
    drawPlot(day,cur_dataset_out, false); // draws new day of the week lines for given season

    // d3.selectAll('.station')
    //     .attr('highlighted', 'off')
    //     .style('fill', dotDefault);

    last_dayClicked = day; // keep track of last square pressed
}

function seasonFilterClick(season){
    d3.select("."+last_seasonClicked) // make last pressed season button normal color
        .style('fill', 'rgb(255,50,30)')
        .style('stroke', 'white');

    d3.select("."+season) //make last pressed season button darker color
        .style('fill', 'white')
        .style('stroke', 'rgb(255,50,30)');    

    if (season==seasonMap[0]){
        cur_dataset_in = Q1dataIn;
        cur_dataset_out = Q1dataOut;

    }
    if (season == seasonMap[1]){
        cur_dataset_in = Q2dataIn;
        cur_dataset_out = Q2dataOut;

    }
    if (season == seasonMap[2]){
        cur_dataset_in = Q3dataIn;
        cur_dataset_out = Q3dataOut;

    }
    if (season == seasonMap[3]){
        cur_dataset_in = Q4dataIn;
        cur_dataset_out = Q4dataOut;


    }
    dayFilterClick(cur_day);
    last_seasonClicked = season; // keep track of last square pressed
}



var drawStations = function() {
        
        var xScale = d3.scale.linear()
                .domain([d3.min(stationData, function(d) { return parseFloat(d['Longitude']); }),
                        d3.max(stationData, function(d) { return parseFloat(d['Longitude']); })])
                .range([0, mapWidth]);

        var yScale = d3.scale.linear()
                .domain([d3.min(stationData, function(d) { return parseFloat(d['Latitude']); }),
                        d3.max(stationData, function(d) { return parseFloat(d['Latitude']); })])
                .range([mapHeight, 0]);

        station = svgMap.selectAll('.station')
                .data(stationData)

        station
                .enter()
                .append('svg:circle')
                .attr('class', 'station')
                .attr('r', 3)
                .attr('cx', function(d) {return xScale(d['Longitude'])})
                .attr('cy', function(d) {return yScale(d['Latitude'])})
                .attr('highlighted', 'off')
                .style('fill', dotDefault);
                // .on('click', function(d) {
                //         var dot = d3.select(this);
                //         if (dot.attr('highlighted') == 'off') {
                //                 highlight(d, true);
                //                 dot.style('fill', dotToggle)
                //                         .attr('highlighted', 'on')
                //                         .moveToFront();
                //         } else {
                //                 highlight(d, false);
                //                 dot.style('fill', dotDefault)
                //                         .attr('highlighted', 'off');
                //         }
                        
                // });
        // .style('fill', function(d) {if (d['Address'] == '15th St & Constitution Ave NW') {return 'pink';} else {return dotDefault;}});
 

        svgMap.append('svg:rect')
                .attr("width", mapWidth)
                .attr("height", mapHeight)
                .style('fill', 'rgba(0, 0, 0, 0.0)')
                .style('stroke', 'black')
                .moveToFront()
                .on('mousemove', function(d) {
                        drawHighlightRect();
                        
                })
                .on('mousedown', function(d) {
                        downX = d3.event.pageX;
                        downY = d3.event.pageY;
                        highlightRect
                                .attr('x', downX)
                                .attr('y', downY)
                                .moveToFront();
                        console.log(downX, downY)
                        mouseDown = true;
                })
                .on('mouseup', function(d) {
                        resolveMouseUp();

                })
                .on('mouseover', function(d) { d3.select(this).style('cursor', 'pointer')})
                .on('mouseout', function(d) { d3.select(this).style('cursor', 'default')});
}

function resolveMouseUp() {
        upX = d3.event.pageX;
        upY = d3.event.pageY;
        console.log(upX, upY)
        mouseDown = false;
        highlightRect
                .attr('width', 0)
                .attr('height', 0);
                

        d3.selectAll('.station')
                .attr('fill', function(d) {
                        dot = d3.select(this);
                        if (dot.attr('cx') <= Math.max(upX, downX) 
                                && dot.attr('cx') >= Math.min(upX, downX)  
                                && dot.attr('cy') <= Math.max(upY, downY)  
                                && dot.attr('cy') >= Math.min(upY, downY) ) {
                                        // if (dot.attr('highlighted') == 'off') {
                                        if (dot.style('fill') != selectionColors[(selectionCount + 5) % 6]){
                                                highlight(d, true);
                                                dot.style('fill', selectionColors[selectionCount])
                                                        .attr('highlighted', 'on')
                                        } else {
                                                highlight(d, false);
                                                dot.style('fill', dotDefault)
                                                        .attr('highlighted', 'off');
                                        }
                                }
        })
        console.log(selectionCount);
        selectionCount = (selectionCount % 6) + 1;
        console.log('changed to ')
        console.log(selectionCount)
        
        
}

function drawHighlightRect() {
        if (mouseDown) {
                curX = d3.event.pageX;
                curY = d3.event.pageY; 
                dX = curX - downX;
                dY = curY - downY
                if (dX >= 0) {
                        if (dY >= 0) {
                                highlightRect
                                        .attr('width', dX)
                                        .attr('height', dY);
                        } else {
                                highlightRect
                                        .attr('width', dX)
                                        .attr('height', Math.abs(dY))
                                        .attr('y', curY)
                        }
                } else {
                        if (dY >= 0) {
                                highlightRect
                                        .attr('width', Math.abs(dX))
                                        .attr('x', curX)
                                        .attr('height', dY);
                        } else {
                                highlightRect
                                        .attr('width', Math.abs(dX))
                                        .attr('x', curX)
                                        .attr('height', Math.abs(dY))
                                        .attr('y', curY)
                        }
                }
                
        }
}

// var colors = ['blue', 'green', 'red', 'orange', 'black', 'pink'];
function highlight(d, turnOn) {
        // console.log("#c-"+d['Address'].replace(/\W/g, ''))
        if(turnOn) {
                d3.selectAll("#c-"+d['Address'].replace(/\W/g, ''))     
                        .style('stroke-width', 2)
                        // .style('stroke', function(d) { return colors[Math.floor(Math.random() * colors.length)]})
                        .style('stroke', selectionColors[selectionCount])
                        .moveToFront();
        } else {
                d3.selectAll("#c-"+d['Address'].replace(/\W/g, '')) 
                        .style('stroke-width', 1)
                        // .style('stroke', function(d) { return colors[Math.floor(Math.random() * colors.length)]})
                        .style('stroke', pathDefault);
        }
        

}



var drawPlot = function(day_filter,data_set, isInPlot) {
        // data_set = Q1dataIn;
        
        maxY = d3.max(d3.values(Q3dataIn), function(d) {
                return d3.max(d3.values(d['Thursday']))
        });
        
        xScaleLine = d3.scale.linear()
                .domain([0, 23.5])
                .range([0, inPlotWidth]);
        
        yScaleLine = d3.scale.linear()
                .domain([0, maxY])
                .range([outPlotWidth, 0]);
        if (isInPlot) {
                 svg = svgInPlot
        } else {
                svg = svgOutPlot
        }

        xAxisBottom = d3.svg.axis()
                .scale(xScaleLine)
                .orient('bottom')
                .ticks(5)
                .tickSize(5);
        xAxisG = svg.append('g')
                .attr('class', 'axis')
                .attr('transform', 'translate(0,' + inPlotHeight + ')')
                .call(xAxisBottom)
        xAxisTop = d3.svg.axis()
                .scale(xScaleLine)
                .orient('top')
                // .ticks(topTicks)
                // .tickSize(topTicks);
        xAxisG = svg.append('g')
                .attr('class', 'axis')
                .attr('transform', 'translate(0,' + 0 + ')')
                .call(xAxisTop)
        yAxisLeft = d3.svg.axis()
                .scale(yScaleLine)
                .orient('left')
                .ticks(5)
                .tickSize(5);
        yAxisG = svg.append('g')
                .attr('class', 'axis')
                .attr('transform', 'translate(' + 0 + ',0)')
                .call(yAxisLeft);
        yAxisRight = d3.svg.axis()
                .scale(yScaleLine)
                .orient('right')
                // .ticks(rightTicks)
                // .tickSize(rightTicks);
        yAxisG = svg.append('g')
                .attr('class', 'axis')
                .attr('transform', 'translate(' + inPlotWidth + ',0)')
                .call(yAxisRight);

        title = svg.append('svg:text')
                .attr('x', 10)
                .attr('y', 30)
                .text('Bikes In')
                .style('font-size', '24px');

        
        lines = svg.selectAll('.lines')
                .data(d3.values(data_set))
                .enter();

        lineFunction = d3.svg.line()
                .x(function(d) { return d.x; })
                .y(function(d) { return d.y; })
                .interpolate("linear");
        
        lines.append('svg:path')
                .attr('id', function(d) { return 'c-'+d['Address'].replace(/\W/g, ''); })
                .attr('class', 'lines')
                .attr('d', function(d) { return lineFunction(generateLineData(d,day_filter)); })
                .attr('stroke', pathDefault)
                .attr('stroke-width', 1)
                .attr('fill', 'none')
                .on('click', function(d) {console.log(d3.select(this).attr('id'))})
}

function generateLineData(d,day_filter) {
        if (!(day_filter in d)) {
                // console.log("skipped it",d)
                return [{"x": xScaleLine(0), "y": yScaleLine(0)},
                        {"x": xScaleLine(23.5), "y": yScaleLine(0)}];
        }

        lineData = []

        for (var x=0; x < 24; x=x+0.5) {
                if (x in d[day_filter]) {
                        lineData.push({"x": xScaleLine(x), "y": yScaleLine(d[day_filter][x])});
                } else {
                        lineData.push({"x": xScaleLine(x), "y": yScaleLine(0)});
                }
        }

        for (x in d[day_filter]) {
                lineData.push({"x": xScaleLine(x), "y": yScaleLine(d[day_filter][x])});
        }

        return lineData;

}

function generateLineDataIn(d,day_filter) {
        if (!(day_filter in d)) {
                // console.log("skipped it",d)
                return [{"x": xScaleLine(0), "y": yScaleLine(0)},
                        {"x": xScaleLine(23.5), "y": yScaleLine(0)}];
        }

        lineData = []

        for (var x=0; x < 24; x=x+0.5) {
                if (x in d[day_filter]) {
                        lineData.push({"x": xScaleLine(x), "y": yScaleLine(d[day_filter][x])});
                } else {
                        lineData.push({"x": xScaleLine(x), "y": yScaleLine(0)});
                }
        }

        for (x in d[day_filter]) {
                lineData.push({"x": xScaleLine(x), "y": yScaleLine(d[day_filter][x])});
        }

        return lineData;

}

d3.selection.prototype.moveToFront = function() {
        return this.each(function(){
          this.parentNode.appendChild(this);
        });
};
      
d3.selection.prototype.moveToBack = function() {  
        return this.each(function() { 
                var firstChild = this.parentNode.firstChild; 
                if (firstChild) { 
                this.parentNode.insertBefore(this, firstChild); 
                } 
        });
};

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
                                                    Q3dataOut = data['data'];
                                                    d3.json(getQ4dataOut, function(error, data) {
                                                            Q4dataOut = data['data'];
                                                            cur_dataset_in = Q1dataIn;
                                                            cur_dataset_out = Q1dataOut;
                                                            cur_day = 'Monday';
                                                            last_seasonClicked = 'Winter';
                                                            last_dayClicked = 'Monday';

                                                            d3.select("."+last_seasonClicked)
                                                                .style('fill', 'white')
                                                                .style('stroke', 'rgb(255,50,30)');
                                                            d3.select("."+last_dayClicked)
                                                                .style('fill', 'white')
                                                                .style('stroke', 'rgb(255,50,30)');

                                                            drawStations();
                                                            drawPlot('Monday',cur_dataset_in, true);
                                                            drawPlot('Monday',cur_dataset_out, false);

                                                        });
                                                });
                                        });
                                });                        
                        });
                });
        });
});
});

