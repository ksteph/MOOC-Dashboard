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

  graph.Mini = {
    Data: graph.Data,
    Tag: graph.Tag+"-mini",
    xRange: graph.xRange,
    yRange: graph.yRange,
  };

  graph.Margin.axisLeft = graph.Margin.left + 60;
  graph.Margin.axisBottom = graph.Margin.bottom + 50;
  graph.ZeroLineX2 = graph.Width-graph.Margin.axisLeft-graph.Margin.right;

  // Loop through data to get what want
  /* Creating data:
     x - x-axis label
     y0 - bottom of bar on y-axis
     y1 - top of bar on y-axis
     label - "color" of this bar
     tooltip - text for tooltip
  */
  graph.StackColorDomain = [];
  bHasNumbers = false;
  $.each(data, function(i,e_i) {
    var d = {};

    var currTotal = 0;
    var negAry = [];
    var posAry = [];
    $.each(e_i,function(j,e_j) {
      if (e_j.x < 0)
        currTotal += e_j.x;

      if (e_j.x < 0)
        negAry.push(e_j);
      else 
        posAry.push(e_j);
    });

    d.x = graph.xRange[i];
    d.bars = [];

    $.each(negAry.concat(posAry), function(j,e_j) {
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

      if (typeof b.color == "number")
        bHasNumbers = true;

      if($.inArray(b.color, graph.StackColorDomain) == -1) {
        graph.StackColorDomain.push(b.color);
      }
    });

    graph.Data.push(d);
  });

  // Hacky but will do for now
  if (bHasNumbers) {
    graph.StackColorDomain.sort(function(a,b) {
      if ((typeof a == "number") && (typeof b == "number"))
        return a-b;
      else if (typeof a == "number")
        return -1;
      else
        return 1;
    });
  }

  // Making the scales
  graph.Scale = {
    x: d3.scale.ordinal()
      .domain(graph.xRange)
      .rangeRoundBands([
        0,
        (graph.Width-graph.Margin.axisLeft-graph.Margin.right)],
                       .3),

    y: d3.scale.linear()
      .domain(graph.yRange) // yRange is the range of the y-axis values
      .range([
        (graph.Height-graph.Margin.axisBottom),
        graph.Margin.top
      ]),
    
    stackColor: d3.scale.ordinal()
      .domain(graph.StackColorDomain)
      .range(["#ffeeee","#ffebeb","#ffd8d8","#ffc4c4","#ffb1b1","#ff9d9d","#ff8989","#ff7676","#ff6262","#ff4e4e","#ff3b3b"])
  };

  graph.Mini.Scale = {
    x: d3.scale.ordinal()
      .domain(graph.xRange),

    y: d3.scale.linear()
      .domain(graph.yRange), // yRange is the range of the y-axis values

    stackColor: graph.Scale.stackColor
  };


  // Setup axis
  graph.XAxis = d3.svg.axis()
    .scale(graph.Scale.x)
    .orient("bottom");

  graph.YAxis = d3.svg.axis()
    .scale(graph.Scale.y)
    .orient("left");

  graph.DrawBars = function(graph, bInteractive) {
    if (bInteractive) {
      graph.Tooltip = d3.select("#special-tooltip");
      if (graph.Tooltip[0][0] == null) { // "[0][0]" Hacky but it works :-/
        graph.Tooltip = d3.select("body")
          .append("div")
          .attr("id","special-tooltip")
          .style("position", "absolute")
          .style("z-index", "10")
          .style("visibility", "hidden");
      }
    }

    // Draw Graph
    graph.GStackedBars = graph.SvgGroup.selectAll(".stacked-bar")
      .data(graph.Data)
      .enter().append("g")
      .attr("class", "stacked-bar")
      .attr("transform", function(d) {
        return "translate("+graph.Scale.x(d.x)+",0)";
      });
    
    graph.Rects = graph.GStackedBars.selectAll("rect")
      .data(function(d) { return d.bars; })
      .enter().append("rect")
      .attr("width", graph.Scale.x.rangeBand())
      .attr("y", function(d) { return graph.Scale.y(d.y1); })
      .attr("height", function(d) {
        return graph.Scale.y(d.y0) - graph.Scale.y(d.y1);
      })
      .style("fill", function(d) { return graph.Scale.stackColor(d.color); });

    if (bInteractive) {
      graph.Rects
        .on("mouseover", function(d) {
          graph.Tooltip.style("visibility", "visible")
    	    .style("top", (event.pageY-10)+"px")
            .style("left",(event.pageX+10)+"px")
    	    .text(d.tooltip);
        })
        .on("mouseout", function(d){
          graph.Tooltip.style("visibility", "hidden")
        });

      // Add Legend
      var legendMarginLeft = 5;
      var legendHeight = (graph.Height-graph.Margin.axisBottom-graph.Margin.top)/
        graph.StackColorDomain.length;
      var legendWidth = (graph.Margin.axisLeft-legendMarginLeft)/3.5;
      var isNumber = (typeof graph.StackColorDomain[0]) == "number";

      graph.Legend = graph.SvgGroup.append("g")
        .attr("class","g-legend")
        .attr("transform","translate(-"+(graph.Margin.axisLeft)+",0)")
        .selectAll(".legend")
        .data(graph.StackColorDomain)
        .enter().append("g")
        .attr("class","legend")
        .attr("id",function(d,i) { return graph.Tag+"-legend-"+i; })
        .attr("transform", function(d,i) {
          return "translate(" + legendMarginLeft + ","+
            (graph.Height-graph.Margin.axisBottom-((i+1)*(legendHeight))) + ")";
        });
      
      graph.Legend.append("rect")
        .attr("class","stacked-bar-graph-legend")
        .attr("height", legendHeight)
        .attr("width", legendWidth)
        .style("fill", graph.Scale.stackColor);

      graph.Legend.append("text")
        .attr("class","axis-label")
        .attr("transform", function(d) {
          var str = "translate("+(legendWidth/2)+","+(legendHeight/2)+")";
          if (isNumber)
            return str;
          else
            return str + " rotate(-90)";
        })
        .attr("dy", ".35em")
        .style("font-size","9px")
        .style("text-anchor", "middle")
        .text(function(d,i) { return d; });
    }

    // Add zero-line if needed
    if (graph.yRange[0] < 0) {
      graph.SvgGroup.append("line")
        .attr("class","axis")
        .attr("x1", 0)
        .attr("x2", graph.ZeroLineX2)
        .attr("y1", graph.Scale.y(0))
        .attr("y2", graph.Scale.y(0))
    }
  };

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

    graph.DrawBars(graph,true);

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

  };
  
  // This scaling is not quite right, but the best can do for now.
  graph.DrawMiniGraph = function(svg, height, width, margin) {
    graph = this;
    graph.Mini.Svg = svg;
    graph.Mini.Height = height;
    graph.Mini.Width = width;
    graph.Mini.Margin = margin;

    graph.Mini.Margin.axisLeft = graph.Mini.Margin.left;
    graph.Mini.Margin.axisBottom = graph.Mini.Margin.bottom;

    var scaleX = graph.Mini.Width/graph.Width;
    var scaleY = graph.Mini.Height/graph.Height;

    graph.Mini.Scale.x.rangeRoundBands([
      0,
      graph.Width-((graph.Mini.Margin.left+graph.Mini.Margin.right)/scaleX),
    ],
                                      .1);
    graph.Mini.Scale.y.range([graph.Height-((graph.Mini.Margin.bottom+graph.Mini.Margin.top)/scaleY), graph.Mini.Margin.top]),

    graph.Mini.SvgGroup = graph.Mini.Svg
      .attr("id", graph.Mini.Tag+"-line-graph")
      .attr("width", graph.Mini.Width)
      .attr("height", graph.Mini.Height)
      .append("g")
      .attr("transform", "translate(" + graph.Mini.Margin.left + "," + 
            graph.Mini.Margin.top + ") scale("+scaleX+","+scaleY+")");

    graph.Mini.ZeroLineX2 = graph.Width-graph.Margin.left-graph.Margin.right;

    graph.DrawBars(graph.Mini, false);
  };

  return graph;
};