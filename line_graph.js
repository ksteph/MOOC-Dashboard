/*
Expected parameters:
  // The margins of the SVG
    margin = <object>
      {top: <number>, bottom: <number>, right: <number>, left: <number>};

  // The height of the SVG
    height = <number>;

  // The width of the SVG
    width = <number>;
  
  // The data, expected as an array in desired order of the below objects
    data = <object>
    {x: <number>, y: <number>, label: <string>}

  // String to add to the front of all the id and class names
    tag = <string>
*/

funcCreateLineGraph = function(margin, height, width, data, tag) {
  LineGraph = {};
  LineGraph.Margin = margin;
  LineGraph.Height = height;
  LineGraph.Width = width;
  LineGraph.Data = data;
  LineGraph.Tag = tag;

  // Making the scales
  LineGraph.Scale = {
    x: d3.scale.linear()
      .range([0, LineGraph.Width])
      .domain([
        0,
        d3.max(
          LineGraph.Data, function(d) { return d.x; })
      ]),

    y: d3.scale.linear()
      .range([LineGraph.Height, 0])
      .domain([
        0,
        d3.max(
          LineGraph.Data, function(d) { return d.y; })
      ])
  };

  // Set up axes
  LineGraph.XAxis = d3.svg.axis()
    .scale(LineGraph.Scale.x)
    .orient("bottom");

  LineGraph.YAxis = d3.svg.axis()
    .scale(LineGraph.Scale.y)
    .orient("left");

  // Create the lines
  LineGraph.Line = d3.svg.line()
    .x(function(d) { return LineGraph.Scale.x(d.x); })
    .y(function(d) { return LineGraph.Scale.y(d.y); });

  LineGraph.DrawGraph = function(svg) {
    LineGraph = this;
    LineGraph.Svg = svg;

    LineGraph.SvgGroup = LineGraph.Svg
      .attr("id", LineGraph.Tag+"-line-graph")
      .attr("width", LineGraph.Width + LineGraph.Margin.left + 
            LineGraph.Margin.right)
      .attr("height", LineGraph.Height + LineGraph.Margin.top + 
            LineGraph.Margin.bottom + 50)
      .append("g")
      .attr("transform", "translate(" + LineGraph.Margin.left + "," + 
            LineGraph.Margin.top + ")");

    // Draw Graph
    LineGraph.SvgGroup.append("g")
      .attr("class", "axis")
      .attr("id", LineGraph.Tag+"-x-axis")
      .attr("transform", "translate(0," + LineGraph.Height + ")")
      .call(LineGraph.XAxis);
    
    LineGraph.SvgGroup.append("g")
      .attr("class", "axis")
      .attr("id", LineGraph.Tag+"-y-axis")
      .call(LineGraph.YAxis)
      .append("text")
      .attr("class", "axis-label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Number of students");
    
    LineGraph.SvgGroup.append("path")
      .datum(LineGraph.Data)
      .attr("class", "line-graph")
      .attr("id", LineGraph.Tag+"-line")
      .attr("d", LineGraph.Line);

    LineGraph.Tooltip = d3.select("body")
      .append("div")
      .style("position", "absolute")
      .style("z-index", "10")
      .style("visibility", "hidden");
    
    LineGraph.Points = LineGraph.SvgGroup.selectAll("point")
      .data(LineGraph.Data)
      .enter().append("g:circle")
      .attr("class", "point")
      .attr("id", LineGraph.Tag+"-point")
      .attr("cx", function(d,i){
        return LineGraph.Scale.x(d.x);
      })
      .attr("cy", function(d,i){
        return LineGraph.Scale.y(d.y);
      })
      .attr("r", 5)
      .on("mouseover", function(d){
        d3.select(this).attr("opacity", "0.6");
        LineGraph.Tooltip.style("visibility", "visible")
    	  .style("top", (event.pageY-10)+"px")
          .style("left",(event.pageX+10)+"px")
    	  .text(d.label);
      })
      .on("mouseout", function(d){
        d3.select(this).attr("opacity", "1.0");
        LineGraph.Tooltip.style("visibility", "hidden")
      });
  };

  return LineGraph;
};
