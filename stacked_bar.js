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
    {x: <size of bar>, y: <bar order position>, label: <string>}

  // String to add to the front of all the id and class names
    tag = <string>

  // The max total value of the x axis
    x_max_total = <number>

  // The max value of the y axis
    y_max = <number>
*/
funcCreateStackedBar = function(margin, height, width, data, tag,
                                x_max_total, y_max) {
  StackedBar = {};
  StackedBar.Margin = margin;
  StackedBar.Height = height;
  StackedBar.Width = width;
  StackedBar.Data = data;
  StackedBar.Tag = tag;
  StackedBar.XMax = x_max_total;
  StackedBar.YMax = y_max;

  // Making the scales
  StackedBar.Scale = {
    x: d3.scale.linear()
      .range([0,StackedBar.Width])
      .domain([0,StackedBar.XMax]),

    y: d3.scale.linear()
      .range(["#ccc","#0000ff"])
      .domain([1,StackedBar.YMax])
  }

  // Preparing the data
  StackedBar.Data.sort(function(a,b) {return a.y - b.y;});
  var currTotal = 0;
  for (var i = 0; i < StackedBar.Data.length; i++) {
    StackedBar.Data[i].dx = currTotal;
    currTotal += StackedBar.Data[i].x;
  }

  StackedBar.DrawGraph = function(svg) {
    StackedBar = this;
    StackedBar.Svg = svg;

    StackedBar.SvgGroup = StackedBar.Svg
      .attr("id", StackedBar.Tag+"-stacked-bar")
      .attr("width", StackedBar.Width + StackedBar.Margin.left + 
            StackedBar.Margin.right)
      .attr("height", StackedBar.Height + StackedBar.Margin.top + 
            StackedBar.Margin.bottom)
      .append("g")
      .attr("transform", "translate(" + StackedBar.Margin.left + "," + 
            StackedBar.Margin.top + ")");

    // Tooltip
    StackedBar.Tooltip = d3.select("body")
      .append("div")
      .attr("class","stacked-bar-tooltip")
      .style("position","absolute")
      .style("z-index","10")
      .style("visibility","hidden");
    
    // Draw Graph
    StackedBar.Bars = StackedBar.SvgGroup.selectAll(".stacked-bar")
      .data(StackedBar.Data)
      .enter().append("g")
        .attr("class","stacked-bar")
      .attr("id", function(d) { return StackedBar.Tag+"stacked-bar-"+d.y;} );

    StackedBar.Bars.append("rect")
        .attr("class", function(d) { return "stacked-rect-"+d.y; })
        .attr("id", function(d) { return StackedBar.Tag+"stacked-rect-"+d.y;} )
        .style("fill", function(d) { return StackedBar.Scale.y(d.y);} )
        .attr("x", function(d) { return StackedBar.Scale.x(d.dx); })
        .attr("width", function(d) { return StackedBar.Scale.x(d.x); })
        .attr("height", StackedBar.Height)
        .on("mouseover", function(d) {
          StackedBar.Tooltip.style("visibility","visible")
            .style("top",(event.pageY-10)+"px")
            .style("left",(event.pageX+10)+"px")
            .text(d.label);
        })
      .on("mouseout", function(d) {
        StackedBar.Tooltip.style("visibility","hidden");
      });

    StackedBar.Bars.append("text")
      .attr("class", "stacked-bar-text")
      .attr("id", StackedBar.Tag+"-stacked-bar-text")
      .attr("x", function(d) {return StackedBar.Scale.x(d.dx+(d.x/2));})
      .attr("y",StackedBar.Height/2)
      .attr("dy", "0.5em")
      .text(function(d) { return d.y; });
  };

  return StackedBar;
}
