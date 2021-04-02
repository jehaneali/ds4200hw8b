var marginLine = { top: 20, right: 40, bottom: 260, left: 50 },
    width = 960 - marginLine.left - marginLine.right,
    height = 500 - marginLine.top - 60;

// parse the date / time
// var parseTime = d3.timeParse("%d-%b-%y");

// set the ranges
var x = d3.scaleLinear().range([0, width]);
var y0 = d3.scaleLinear().range([height, 0]);
//var y1 = d3.scaleLinear().range([height, 0]);

// define the 1st line
var valueline = d3.line()
    .x(function (d) { return x(d.percent); })
    .y(function (d) { return y0(d.biology); });

// define the 2nd line
var valueline2 = d3.line()
    .x(function (d) { return x(d.percent); })
    .y(function (d) { return y0(d.businessManagement); });

// define the 3rd line
var valueline3 = d3.line()
    .x(function (d) { return x(d.percent); })
    .y(function (d) { return y0(d.civilEng); });

// define the 4th line
var valueline4 = d3.line()
    .x(function (d) { return x(d.percent); })
    .y(function (d) { return y0(d.communications); });

// define the 5th line
var valueline5 = d3.line()
    .x(function (d) { return x(d.percent); })
    .y(function (d) { return y0(d.compSci); });

// define the 6th line
var valueline6 = d3.line()
    .x(function (d) { return x(d.percent); })
    .y(function (d) { return y0(d.econ); });

// define the 7th line
var valueline7 = d3.line()
    .x(function (d) { return x(d.percent); })
    .y(function (d) { return y0(d.education); });

// define the 8th line
var valueline8 = d3.line()
    .x(function (d) { return x(d.percent); })
    .y(function (d) { return y0(d.nursing); });

// define the 9th line
var valueline9 = d3.line()
    .x(function (d) { return x(d.percent); })
    .y(function (d) { return y0(d.philosophy); });

// define the 10th line
var valueline10 = d3.line()
    .x(function (d) { return x(d.percent); })
    .y(function (d) { return y0(d.poliSci); });

// define the 11th line
var valueline11 = d3.line()
    .x(function (d) { return x(d.percent); })
    .y(function (d) { return y0(d.psychology); });

// append the svg obgect to the body of the page
// appends a 'group' element to 'svg'
// moves the 'group' element to the top left margin
var svg = d3.select("#line").append("svg")
    .attr("width", width + marginLine.left + marginLine.right)
    .attr("height", height + marginLine.top + marginLine.bottom)
    .append("g")
    .attr("transform",
        "translate(" + marginLine.left + "," + marginLine.top + ")");

// get the data
d3.csv("topDeg.csv").then(function (data) {

    // scale the range of the data
    x.domain([0, 100]);
    y0.domain([0, 215000]);

    // add the valueline path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("id", "blueLine")
        .style("stroke", "#1a86a8")
        .attr("d", valueline);

    // add the valueline2 path.
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("id", "redLine")
        .style("stroke", "#dd3232")
        .attr("d", valueline2);

    // add valueLine3
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("id", "greenLine")
        .style("stroke", "#a1ce5e")
        .attr("d", valueline3);

    // add valueLine4
    svg.append("path")
        .data([data])
        .attr("class", "line")
        .attr("id", "orangeLine")
        .style("stroke", "#fbaf5f")
        .attr("d", valueline4);

    // add valueLine5
    svg.append("path")
    .data([data])
    .attr("class", "line")
    .attr("id", "yellowLine")
    .style("stroke", "#facf63")
    .attr("d", valueline5);

    // add valueLine6
    svg.append("path")
    .data([data])
    .attr("class", "line")
    .attr("id", "pinkLine")
    .style("stroke", "#ec008c")
    .attr("d", valueline6);

    // add valueLine7
    svg.append("path")
    .data([data])
    .attr("class", "line")
    .attr("id", "purpleLine")
    .style("stroke", "#391242")
    .attr("d", valueline7);

    // add the X Axis
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x));

    // add the Y0 Axis
    svg.append("g")
        .attr("class", "axisSteelBlue")
        .call(d3.axisLeft(y0));

    // add the Y1 Axis
    //   svg.append("g")
    //       .attr("class", "axisRed")
    //       .attr("transform", "translate( " + width + ", 0 )")
    //       .call(d3.axisRight(y1));

    // add the blue line legend
    svg.append("text")
        .attr("x", 0)
        .attr("y", height + marginLine.top + 40)
        .attr("class", "legend")
        .style("fill", "#1a86a8")
        .on("click", function () {
            // determine if current line is visible
            var active = blueLine.active ? false : true,
                newOpacity = active ? 0 : 1;
            // hide or show the elements
            d3.select("#blueLine").style("opacity", newOpacity);
            // update whether or not the elements are active
            blueLine.active = active;
        })
        .text("Biology");

    // add the red line legend
    svg.append("text")
        .attr("x", 0)
        .attr("y", height + marginLine.top + 60)
        .attr("class", "legend")
        .style("fill", "#dd3232")
        .on("click", function () {
            // determine if current line is visible
            var active = redLine.active ? false : true,
                newOpacity = active ? 0 : 1;
            // hide or show the elements
            d3.select("#redLine").style("opacity", newOpacity);
            // update whether or not the elements are active
            redLine.active = active;
        })
        .text("Business Management");

    svg.append("text")
        .attr("x", 0)
        .attr("y", height + marginLine.top + 80)
        .attr("class", "legend")
        .style("fill", "#a1ce5e")
        .on("click", function () {
            // determine if current line is visible
            var active = greenLine.active ? false : true,
                newOpacity = active ? 0 : 1;
            // hide or show the elements
            d3.select("#greenLine").style("opacity", newOpacity);
            // update whether or not the elements are active
            greenLine.active = active;
        })
        .text("Civil Engineering");

        svg.append("text")
        .attr("x", 0)
        .attr("y", height + marginLine.top + 100)
        .attr("class", "legend")
        .style("fill", "#fbaf5f")
        .on("click", function () {
            // determine if current line is visible
            var active = orangeLine.active ? false : true,
                newOpacity = active ? 0 : 1;
            // hide or show the elements
            d3.select("#orangeLine").style("opacity", newOpacity);
            // update whether or not the elements are active
            orangeLine.active = active;
        })
        .text("Communications");

        svg.append("text")
        .attr("x", 0)
        .attr("y", height + marginLine.top + 120)
        .attr("class", "legend")
        .style("fill", "#facf63")
        .on("click", function () {
            // determine if current line is visible
            var active = yellowLine.active ? false : true,
                newOpacity = active ? 0 : 1;
            // hide or show the elements
            d3.select("#yellowLine").style("opacity", newOpacity);
            // update whether or not the elements are active
            yellowLine.active = active;
        })
        .text("Computer Science");

        svg.append("text")
        .attr("x", 0)
        .attr("y", height + marginLine.top + 140)
        .attr("class", "legend")
        .style("fill", "#ec008c")
        .on("click", function () {
            // determine if current line is visible
            var active = pinkLine.active ? false : true,
                newOpacity = active ? 0 : 1;
            // hide or show the elements
            d3.select("#pinkLine").style("opacity", newOpacity);
            // update whether or not the elements are active
            pinkLine.active = active;
        })
        .text("Economics");

        svg.append("text")
        .attr("x", 0)
        .attr("y", height + marginLine.top + 160)
        .attr("class", "legend")
        .style("fill", "#391242")
        .on("click", function () {
            // determine if current line is visible
            var active = purpleLine.active ? false : true,
                newOpacity = active ? 0 : 1;
            // hide or show the elements
            d3.select("#purpleLine").style("opacity", newOpacity);
            // update whether or not the elements are active
            purpleLine.active = active;
        })
        .text("Education");

});