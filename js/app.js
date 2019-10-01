// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

// Create an SVG wrapper, append an SVG group that will hold our chart,
// and shift the latter by left and top margins.
var svg = d3
  .select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append an SVG group
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);


//load csv file
d3.csv('data/data.csv', function(error, data) {
    // if theres an error, throw an error
    if (error) throw error;

    //print data
  console.log(data);

    data.forEach(function(d){
        d.poverty = +d.poverty;
        d.smokes = +d.smokes;
    });

     // Configure axis
    let xPoverty= d3.scaleLinear()
        .domain(d3.extent(data, d => d.poverty))
        .range([0, width]);


    let ySmokes = d3.scaleLinear()
        .domain(d3.extent(data, d => d.smokes))
        .range([height, 0]);
    
    let bottomAxis = d3.axisBottom(xPoverty);
    let leftAxis = d3.axisLeft(ySmokes);

    chartGroup.append("g")
              .classed("axis", true)
              .attr("transform", `translate(0, ${height})`)
              .call(bottomAxis);

   
    chartGroup.append("g")
              .classed("axis", true)
              .call(leftAxis);

   let circlesGroup = chartGroup.selectAll("circle")
                                .data(data)
                                .enter()
                                .append('g')
                                .classed('element-group',true);
                                
                                
                                
   circlesGroup.append('circle')
                .attr("cx", d => xPoverty(d.poverty)) 
                .attr("cy", d => ySmokes(d.smokes))
                .attr("r", 20)
                .attr("fill", "pink")
                .attr("opacity", ".5")
                .classed('circle', true);
  
    circlesGroup.append('text')
                .style('text-anchor', 'middle')
                .attr("x", d => xPoverty(d.poverty))
                .attr("y", d => ySmokes(d.smokes))
                .attr('dy', '.3em')
                .text(function(d){
                                    return d.abbr
                                })
                .classed('circle-text', true);


    chartGroup.append("text")
    .attr("transform", `translate(${width / 3}, ${height + margin.top + 20})`)
    .text("Percentage of Population in Poverty");

    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height/1.2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Percentage of Population that Smokes");

});