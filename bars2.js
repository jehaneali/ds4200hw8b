// code based on https://bl.ocks.org/Chi-Loong/e3389dfb6873c85caf445f0faba52ec4
const colorScale = d3.scaleOrdinal()
    .domain(["California", "Northeastern", "Midwestern","Southern", "Western"])
    .range(["#551843", "#a1ce5e", "#facf63", "#EDB4B4", "#a2d0cf"]);
   

var data = [
    { region: "California", mean: 51032 },
    { region: "Northeastern", mean: 48496 },
    { region: "Southern", mean: 44521 },
    { region: "Western", mean: 44414 },
    { region: "Midwestern", mean: 44414 }
];

var data1 = [
    { region: "California", mean: 93132 },
    { region: "Northeastern", mean: 91352 },
    { region: "Southern", mean: 79505 },
    { region: "Western", mean: 78200 },
    { region: "Midwestern", mean: 78180 }
];

let marginBar2 = { top: 20, right: 20, bottom: 60, left: 60 },
    widthBar2 = 500 - marginBar2.left - marginBar2.right,
    heightBar2 = 500 - marginBar2.top - marginBar2.bottom;
let chart = d3.select("#chart")
    .append("g")
    .attr("transform", "translate(" + marginBar2.left + "," + marginBar2.top + ")");
// Add scales
let xScale = d3.scaleBand()
    .domain(data.map(function (d) { return d.region; }))
    .rangeRound([0, widthBar2])
    .padding(0.1);
let yScale = d3.scaleLinear()
    .domain([0, 100000])
    .rangeRound([heightBar2, 0]);
// Add x-axis
chart.append("g")
    .attr("class", "axis axis-x")
    .attr("transform", "translate(0," + heightBar2 + ")")
    .call(d3.axisBottom(xScale));
// Add y-axis
chart.append("g")
    .attr("class", "axis axis-y")
    .call(d3.axisLeft(yScale).ticks(10));

//Sample enter, update and exit loop
function drawChart(dataSet) {

    //xScale domain needs to change based on data set
    xScale.domain(dataSet.map(function (d) { return d.region; }));
    chart.select("g .axis-x")
        .transition()
        .duration(1000)
        .call(d3.axisBottom(xScale));

    chart.append("text")
        .attr("x", 150)
        .attr("y", heightBar2 + marginBar2.top + 20)
        .attr("class", "legend")
        .style("fill", "#000000")
        .text("Region");

    chart.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - marginBar2.left)
      .attr("x",0 - (heightBar2 / 2) - 50)
      .attr("dy", "1em")
      .attr("class", "legend")
      .style("fill", "middle")
      .text("Median Mid-Career Salary ($)");      

    chart.selectAll("rect")
        .data(dataSet)
        .join(
            enter => enter
                .append("rect")
                .attr("x", d => xScale(d.region))
                .attr("y", d => yScale(d.mean))
                .attr("width", 0)
                .attr("height", 0)
                .attr("class", "svgRect")
                .attr("fill", function(d) {return colorScale(d.region)})
                .call(enter => enter.transition()
                    .duration(1000)
                    .attr("width", xScale.bandwidth())
                    .attr("height", d => heightBar2 - yScale(d.mean))
                ),
            update => update
                .call(update => update.transition()
                    .duration(1000)
                    .attr("x", d => xScale(d.region))
                    .attr("y", d => yScale(d.mean))
                    .attr("width", xScale.bandwidth())
                    .attr("height", d => heightBar2 - yScale(d.mean))
                ),
            exit => exit
                .call(exit => exit.transition()
                    .duration(1000)
                    .attr("width", 0)
                    .attr("height", 0)
                    .remove()
                )
        );
}
d3.select("#bt1").on("click", function () {
    drawChart(data);
});
d3.select("#bt2").on("click", function () {
    drawChart(data1);
});
drawChart(data);

