// code based on https://bl.ocks.org/d3noob/5680dd0089abdc5b15f188d5efe48852

// set the dimensions and margins of the graph
var marginScatter = {top: 20, right: 20, bottom: 30, left: 50},
    widthScatter = 960 - marginScatter.left - marginScatter.right,
    heightScatter = 500 - marginScatter.top - marginScatter.bottom;


// set the ranges
var xScatter = d3.scaleLinear().range([0, widthScatter]);
var yScatter = d3.scaleLinear().range([heightScatter, 0]);

// define the line
var valueline = d3.line()
    .x(function(d) { return xScatter(d.startingMedian); })
    .y(function(d) { return yScatter(d.midMedian); });

    var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);


// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svgScatter = d3.select("#scatter").append("svg")
    .attr("width", widthScatter + marginScatter.left + marginScatter.right)
    .attr("height", heightScatter + marginScatter.top + marginScatter.bottom)
  .append("g")
    .attr("transform",
          "translate(" + marginScatter.left + "," + marginScatter.top + ")");

// Get the data
d3.csv("cleanedMajorSalaries.csv").then(function(data) {

  // format the data
//   data.forEach(function(d) {
//       d.date = parseTime(d.date);
//       d.close = +d.close;
//   });

  // Scale the range of the data
  xScatter.domain([30000, d3.max(data, function(d) { return d.startingMedian; })]);
  yScatter.domain([30000, 110000]);

  // Add the valueline path.
//   svg.append("path")
//       .data([data])
//       .attr("class", "line")
//       .attr("d", valueline);
      
  // Add the scatterplot
  svgScatter.selectAll("dot")
     .data(data)
   .enter().append("circle")
     .attr("r", 5)
     .attr("cx", function(d) { return xScatter(d.startingMedian); })
     .attr("cy", function(d) { return yScatter(d.midMedian); })
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
  svgScatter.append("g")
      .attr("transform", "translate(0," + heightScatter + ")")
      .call(d3.axisBottom(xScatter));

  // Add the Y Axis
  svgScatter.append("g")
      .call(d3.axisLeft(yScatter));


});