/*
Expected parameters:
  // The margins of the SVG
    margin = <object>
      {top: <number>, bottom: <number>, right: <number>, left: <number>};

  // The height of the SVG
    height = <number>;

  // The width of the SVG
    width = <number>;
  
  // The data is an array of arrays. Each array represents one line to graph
    datatum = <object>
    {x: <number>, y: <number>, label: <string>}

  // String to add to the front of all the id and class names
    tag = <string>

  // The range of the x-axis
    x_range = [<number>,<number>]

  // The range of the y-axis
    y_range = [<number>,<number>]
*/

funcCreateMultiLineGraph = function(margin, height, width, data, tag,
                                    x_range, y_range) {
  graph = {};
  graph.Margin = margin;
  graph.Height = height;
  graph.Width = width;
  graph.Data = data;
  graph.Tag = tag;
  graph.XScaleDomain = x_range;
  graph.YScaleDomain = y_range;

  graph.Margin.axisLeft = graph.Margin.left + 50;
  graph.Margin.axisBottom = graph.Margin.bottom + 50;

  $.each(graph.Data, function(i,e_1) {
    $.each(e_1, function(j, e_j) {
      e_j.graph = i;
    });
  });

  // Making the scales
  graph.Scale = {
    x: d3.scale.linear()
      .domain(graph.XScaleDomain)
      .range([
        0,
        graph.Width-graph.Margin.axisLeft-graph.Margin.right
      ]),

    y: d3.scale.linear()
      .domain(graph.YScaleDomain)
      .range([graph.Height-graph.Margin.axisBottom, 0]),

    color: d3.scale.ordinal()
      .domain([0,(graph.Data.length-1)])
      .range(["#111","#c00","#0c0","#00c","#cc0","#0cc","#c0c","#f00", "#0f0", "#00f"])
  };

  // Set up axes
  graph.XAxis = d3.svg.axis()
    .scale(graph.Scale.x)
    .orient("bottom");

  graph.YAxis = d3.svg.axis()
    .scale(graph.Scale.y)
    .orient("left");

  // Create the lines
  graph.Line = d3.svg.line()
    .x(function(d) { return graph.Scale.x(d.x); })
    .y(function(d) { return graph.Scale.y(d.y); });

  graph.DrawGraph = function(svg) {
    graph = this;
    graph.Svg = svg;

    graph.SvgGroup = graph.Svg
      .attr("id", graph.Tag+"-line-graph")
      .attr("width", graph.Width)
      .attr("height", graph.Height)
      .append("g")
      .attr("transform", "translate(" + graph.Margin.axisLeft + "," + 
            graph.Margin.top + ")");

    // Draw Graph
    //   Draw Axis
    graph.SvgGroup.append("g")
      .attr("class", "axis")
      .attr("id", graph.Tag+"-x-axis")
      .attr("transform", "translate(0," +
            (graph.Height-graph.Margin.axisBottom) + ")")
      .call(graph.XAxis);
    
    graph.SvgGroup.append("g")
      .attr("class", "axis")
      .attr("id", graph.Tag+"-y-axis")
      .call(graph.YAxis)
      .append("text")
      .attr("class", "axis-label")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Number of students");
    
    //   Draw Lines
    graph.SvgLineGroups = graph.SvgGroup.selectAll(".g-single-line-graph")
      .data(graph.Data)
      .enter().append("g")
      .attr("class","g-single-line-graph")
      .attr("id",function(d,i) { return graph.Tag+"-g-single-line-graph-"+i; });

    graph.SvgLineGroups.append("path")
      .attr("class", "line-graph")
      .attr("id", function(d,i) { return graph.Tag+"-line-"+i; })
      .style("stroke", function(d,i) { return graph.Scale.color(i); })
      .attr("d", function(d) { return graph.Line(d); })
      .on("mouseover", function(d) {
        svg_id = "#"+d3.select(this).node().parentNode.parentNode.parentNode.id;

        d3.select(svg_id).selectAll(".g-single-line-graph")
          .style("opacity", 0.2);

        g_id = "#"+d3.select(this).node().parentNode.id;

        d3.select(g_id).style("opacity",1);
      })
      .on("mouseout", function(d) {
        svg_id = "#"+d3.select(this).node().parentNode.parentNode.parentNode.id;

        d3.select(svg_id).selectAll(".g-single-line-graph")
          .style("opacity", 1);
      });

    //   Find tooltip div or if not there create
    graph.Tooltip = d3.select("#special-tooltip");
    if (graph.Tooltip[0][0] == null) { // "[0][0]" Hacky but it works :-/
      graph.Tooltip = d3.select("body")
        .append("div")
        .attr("id","special-tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden");
    }
    
    //   Create points on line graph
    graph.SvgLineGroups.selectAll("point")
      .data(function(d) { return d; })
      .enter().append("g:circle")
      .attr("class", "point")
      .attr("id", graph.Tag+"-point")
      .attr("cx", function(d,i){
        return graph.Scale.x(d.x);
      })
      .attr("cy", function(d,i){
        return graph.Scale.y(d.y);
      })
      .attr("r", 5)
      .style("fill", function(d) { return graph.Scale.color(d.graph); })
      .on("mouseover", function(d){
        d3.select(this).attr("opacity", "0.6");
        graph.Tooltip.style("visibility", "visible")
    	  .style("top", (event.pageY-10)+"px")
          .style("left",(event.pageX+10)+"px")
    	  .text(d.label);

        svg_id = "#"+d3.select(this).node().parentNode.parentNode.parentNode.id;

        d3.select(svg_id).selectAll(".g-single-line-graph")
          .style("opacity", 0.2);

        g_id = "#"+d3.select(this).node().parentNode.id;

        d3.select(g_id).style("opacity",1);
      })
      .on("mouseout", function(d){
        d3.select(this).attr("opacity", "1.0");
        graph.Tooltip.style("visibility", "hidden")

        svg_id = "#"+d3.select(this).node().parentNode.parentNode.parentNode.id;

        d3.select(svg_id).selectAll(".g-single-line-graph")
          .style("opacity", 1);
      });
  };

  return graph;
};
