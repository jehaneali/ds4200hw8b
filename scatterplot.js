// code based on https://bl.ocks.org/d3noob/5680dd0089abdc5b15f188d5efe48852

// set the dimensions and margins of the graph
var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;


// set the ranges
var x = d3.scaleLinear().range([0, width]);
var y = d3.scaleLinear().range([height, 0]);

// define the line
var valueline = d3.line()
    .x(function(d) { return x(d.startingMedian); })
    .y(function(d) { return y(d.midMedian); });

    var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#scatter").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

// Get the data
d3.csv("cleanedMajorSalaries.csv").then(function(data) {

  // format the data
//   data.forEach(function(d) {
//       d.date = parseTime(d.date);
//       d.close = +d.close;
//   });

  // Scale the range of the data
  x.domain([30000, d3.max(data, function(d) { return d.startingMedian; })]);
  y.domain([30000, 110000]);

  // Add the valueline path.
//   svg.append("path")
//       .data([data])
//       .attr("class", "line")
//       .attr("d", valueline);
      
  // Add the scatterplot
  svg.selectAll("dot")
     .data(data)
   .enter().append("circle")
     .attr("r", 5)
     .attr("cx", function(d) { return x(d.startingMedian); })
     .attr("cy", function(d) { return y(d.midMedian); })
     .on("mouseover", function(event,d) {
       div.transition()
         .duration(200)
         .style("opacity", .9);
       div.html(d.major)
         .style("left", (event.pageX) + "px")
         .style("top", (event.pageY - 28) + "px");
       })
     .on("mouseout", function(d) {
       div.transition()
         .duration(500)
         .style("opacity", 0);
       });
  
  


  // Add the X Axis
  svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

  // Add the Y Axis
  svg.append("g")
      .call(d3.axisLeft(y));


});