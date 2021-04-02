//code based on Adietya Pandey's D3 Bar Chart Lecture code in DS4200

// d3.csv("regionalAvgStart.csv").then(function(data2) {

  var data1 = [
    {region: "California", mean: 40000},
    {region: "Northeastern", mean: 16000},
    {region: "Midwestern", mean: 80000}
 ];
 
 var data2 = [
    {region: "California", mean: 70000},
    {region: "Northeastern", mean: 10000},
    {region: "Midwestern", mean: 20000}
 ];

    const widthBar = 1000
    const heightBar = 450
    const margin = {left:50, right:50, bottom:50, top:50}
    
    // setting up color palette
    const colorScale = d3.scaleOrdinal()
    .domain(["California", "Northeastern", "Midwestern","Southern", "Western"])
    .range(["#551843", "#C07BB8", "#a35556", "#EDB4B4", "#C22328"]);
   
    //create svg element
    const svgB = d3
      .select("#bar")
      .append("svg")
      .attr("width", widthBar-margin.left-margin.right)
      .attr("height", heightBar - margin.top - margin.bottom)
      .attr("viewBox", [0, 0, widthBar, heightBar]);
     
    const yBar = d3.scaleLinear().domain([0,100000])
    .range([heightBar-margin.bottom,margin.top])
    
    const xBar = d3
      .scaleBand()
      .domain(d3.range(data2.length))
      .range([margin.left, widthBar - margin.right])
      .padding(0.2)
    
      //draw rectangles
    svgB.selectAll("rect")
    .data(data2)
    .join("rect")
    .attr("x", (d,i) => xBar(i))
    .attr("y", (d) => yBar(d.mean))
    .attr("height", (d)=> yBar(0)- yBar(d.mean))
    .attr("width", xBar.bandwidth())
    .attr("fill", function(d) {return colorScale(d.region)})
    
    //create y axis
    function yAxis(g) {
      g.attr("transform", `translate(${margin.left}, 0)`)
        .call(d3.axisLeft(yBar).ticks(null, data2.format))
        .attr("font-size", '20px')
    }
    
    //create x axis
    function xAxis(g) {
      g.call(d3.axisBottom(xBar).tickFormat(i => data2[i].region))
      .attr("transform", `translate(0,${heightBar - margin.bottom})`)
      .attr("font-size", '15px')
    }

    // function update(data) {

    //   var u = svgB.selectAll("rect")
    //     .data(data)
    
    //   u
    //     .enter()
    //     .join("rect")
    //     .merge(u)
    //     .transition()
    //     .duration(1000)
    //       .attr("x", function(d) { return xBar(d.region); })
    //       .attr("y", function(d) { return yBar(d.mean); })
    //       .attr("width", xBar.bandwidth())
    //       .attr("height", function(d) { return heightBar - yBar(d.mean); })
    //       .attr("fill", "#69b3a2")
    // }

    // update(data1)
    

    
    //append x and y axis
    svgB.append("g").call(xAxis)
    svgB.append("g").call(yAxis)
  //  });