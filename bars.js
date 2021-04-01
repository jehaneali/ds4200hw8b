//code based on Adietya Pandey's D3 Bar Chart Lecture code in DS4200

d3.csv("regionalAvg.csv").then(function(data2) {

    const width = 1000
    const height = 450
    const margin = {left:50, right:50, bottom:50, top:50}
    
    // setting up color palette
    const colorScale = d3.scaleOrdinal()
    .domain(["California", "Northeastern", "Midwestern","Southern", "Western"])
    .range(["#551843", "#C07BB8", "#a35556", "#EDB4B4", "#C22328"]);
   
    //create svg element
    const svgB = d3
      .select("#bar")
      .append("svg")
      .attr("width", width-margin.left-margin.right)
      .attr("height", height - margin.top - margin.bottom)
      .attr("viewBox", [0, 0, width, height]);
     
    const y = d3.scaleLinear().domain([0,100000])
    .range([height-margin.bottom,margin.top])
    
    const x = d3
      .scaleBand()
      .domain(d3.range(data2.length))
      .range([margin.left, width - margin.right])
      .padding(0.2)
    
      //draw rectangles
    svgB.selectAll("rect")
    .data(data2)
    .join("rect")
    .attr("x", (d,i) => x(i))
    .attr("y", (d) => y(d.mean))
    .attr("height", (d)=> y(0)- y(d.mean))
    .attr("width", x.bandwidth())
    .attr("fill", function(d) {return colorScale(d.region)})
    
    //create y axis
    function yAxis(g) {
      g.attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(y).ticks(null, data2.format))
        .attr("font-size", '20px')
    }
    
    //create x axis
    function xAxis(g) {
      g.call(d3.axisBottom(x).tickFormat(i => data2[i].region))
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .attr("font-size", '15px')
    }
    
    //append x and y axis
    svgB.append("g").call(xAxis)
    svgB.append("g").call(yAxis)
   });