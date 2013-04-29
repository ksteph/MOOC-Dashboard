/*
Expected parameters:
  // The margins of the SVG
    margin = <object>
      {top: <number>, bottom: <number>, right: <number>, left: <number>};

  // The height of the SVG
    height = <number>;

  // The width of the SVG
    width = <number>;
  
  // The data, expected as an array of arrays in desired order of the
  // below objects
    datum = <object>
    {x: <data value>, y: <label of bar>, label: <string>, 
      percentage: <percent this bar is of entire stack of bars>}

  // String to add to the front of all the id and class names
    tag = <string>

  // Array of label for each bar in order 
    x_axis_range = [<title 1>,<title 2>,...]

  // Range of the y-axis values
    y_axis_range = [<min number>,<max number>]

*/
funcCreateStackedBarGraph = function(margin, height, width, data, tag,
                                     x_axis_range, y_axis_range) {
  var graph = {};
  graph.Margin = margin;
  graph.Height = height;
  graph.Width = width;
  graph.Data = [];
  graph.Tag = tag;
  graph.xRange = x_axis_range;
  graph.yRange = y_axis_range;

  graph.Margin.axisLeft = graph.Margin.left + 50;
  graph.Margin.axisBottom = graph.Margin.bottom + 50;

  // Loop through data to get what want
  /* Creating data:
     x - x-axis label
     y0 - bottom of bar on y-axis
     y1 - top of bar on y-axis
     label - "color" of this bar
     tooltip - text for tooltip
  */
  graph.StackColorDomain = [];
  $.each(data, function(i,e_i) {
    var d = {};

    var currTotal = e_i[0].x;
    if (currTotal > 0) currTotal = 0;

    d.x = graph.xRange[i];
    d.bars = [];

    $.each(e_i, function(j,e_j) {
      var b = {};
      b.y0 = currTotal;
      if (e_j.x > 0) {
        currTotal = currTotal + e_j.x;
      } else {
        currTotal = currTotal - e_j.x;
      }
      b.y1  = currTotal;
      b.color  = e_j.y;
      b.tooltip  = e_j.label;

      d.bars.push(b);

      if($.inArray(b.color, graph.StackColorDomain) == -1) {
        graph.StackColorDomain.push(b.color);
      }
    });

    graph.Data.push(d);
  });

  // Making the scales
  graph.Scale = {
    x: d3.scale.ordinal()
      .domain(graph.xRange)
      .rangeRoundBands([
        0,
        (graph.Width-graph.Margin.axisLeft-graph.Margin.right)],
                       .1),

    y: d3.scale.linear()
      .domain(graph.yRange) // yRange is the range of the y-axis values
      .range([
        (graph.Height-graph.Margin.axisBottom),
        graph.Margin.top
      ]),
    
    stackColor: d3.scale.ordinal()
      .domain(graph.StackColorDomain)
      .range(["#111","#c00","#0c0","#00c","#cc0","#0cc","#c0c","#ccc"])
  };

  // Setup axis
  graph.XAxis = d3.svg.axis()
    .scale(graph.Scale.x)
    .orient("bottom");

  graph.YAxis = d3.svg.axis()
    .scale(graph.Scale.y)
    .orient("left");

  graph.DrawGraph = function(svg) {
    graph = this;
    graph.Svg = svg;

    // Setup SVG
    graph.SvgGroup = graph.Svg
      .attr("id", graph.Tag+"-stacked-bar-graph")
      .attr("class", "stacked-bar-graph")
      .attr("width", graph.Width)
      .attr("height", graph.Height)
      .append("g")
      .attr("transform","translate("+ graph.Margin.axisLeft + "," +
            graph.Margin.top + ")");

    // Draw Graph
    graph.SvgGroup.append("g")
      .attr("class","axis")
      .attr("id",graph.Tag+"-x-axis")
      .attr("transform","translate(0,"+(graph.Height-graph.Margin.axisBottom)+")")
      .call(graph.XAxis);

    graph.SvgGroup.append("g")
      .attr("class","axis")
      .attr("id",graph.Tag+"-y-axis")
      .call(graph.YAxis)
      .append("text")
      .attr("transform","rotate(-90)")
      .attr("y",6)
      .attr("dy",".5em")
      .style("text-anchor","end")
      .text("Number of Students");

    // Add zero-line if needed
    if (graph.yRange[0] < 0) {
      graph.SvgGroup.append("line")
        .attr("class","axis")
        .attr("x1", 0)
        .attr("x2", graph.Width-graph.Margin.axisLeft-graph.Margin.right)
        .attr("y1", graph.Scale.y(0))
        .attr("y2", graph.Scale.y(0))
    }

    graph.GStackedBars = graph.SvgGroup.selectAll(".stacked-bar")
      .data(graph.Data)
      .enter().append("g")
      .attr("class", "stacked-bar")
      .attr("transform", function(d) {
        return "translate("+graph.Scale.x(d.x)+",0)";
      });
    
    graph.GStackedBars.selectAll("rect")
      .data(function(d) { return d.bars; })
      .enter().append("rect")
      .attr("width", graph.Scale.x.rangeBand())
      .attr("y", function(d) { return graph.Scale.y(d.y1); })
      .attr("height", function(d) {
        return graph.Scale.y(d.y0) - graph.Scale.y(d.y1);
      })
      .style("fill", function(d) { return graph.Scale.stackColor(d.color); });
  }

  return graph;
};