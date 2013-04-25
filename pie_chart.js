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
    {count: <number>, percentage: <float less than 1>, label: <string>}

  // String to add to the front of all the id and class names
    tag = <string>
*/
funcCreatePieChart = function(margin, height, width, data, tag) {
  PieChart = {};
  PieChart.Margin = margin;
  PieChart.Height = height;
  PieChart.Width = width;
  PieChart.Data = data;
  PieChart.Tag = tag;

  PieChart.Radius = Math.min(PieChart.Width, PieChart.Height) / 2;

  PieChart.Arc = d3.svg.arc()
    .outerRadius(PieChart.Radius - 10)
    .innerRadius(0);

  PieChart.Layout = d3.layout.pie()
    .sort(null)
    .value(function(d) { return d.count; });

  PieChart.DrawGraph = function(svg) {
    PieChart = this;
    PieChart.Svg = svg;

    PieChart.SvgGroup = PieChart.Svg
      .attr("id", PieChart.Tag+"-pie-chart")
      .attr("width", PieChart.Width + PieChart.Margin.left + 
            PieChart.Margin.right)
      .attr("height", PieChart.Height + PieChart.Margin.top + 
            PieChart.Margin.bottom + 50)
      .append("g")
      .attr("transform", "translate(" + PieChart.Width/2 + "," + 
            PieChart.Height/2 + ")");

    // Tooltip
    PieChart.Tooltip = d3.select("body")
      .append("div")
      .attr("class","pie-chart-tooltip")
      .attr("id",PieChart.Tag+"pie-chart-tooltip")
      .style("position","absolute")
      .style("z-index","10")
      .style("visibility","hidden");

    PieChart.ArcGroups = PieChart.SvgGroup.selectAll(".arc")
      .data(PieChart.Layout(PieChart.Data))
      .enter().append("g")
      .attr("class", "arc");

    PieChart.ArcGroups.append("path")
      .attr("class", function(d) {return "arc-path-"+d.data.label;})
      .attr("id", function(d) {return PieChart.Tag+"-arc-path-"+d.data.label;})
      .attr("d", PieChart.Arc)
      .on("mouseover", function(d) {
        PieChart.Tooltip.style("visibility","visible")
          .style("top",(event.pageY-10)+"px")
          .style("left",(event.pageX+10)+"px")
          .text(d.data.label+": "+d.data.count+" students");
      })
      .on("mouseout", function(d) {
        PieChart.Tooltip.style("visibility","hidden");
      });


    PieChart.ArcGroups.append("text")
      .attr("transform", function(d) { return "translate(" +
                                      PieChart.Arc.centroid(d) + ")"; })
      .attr("dy",".35em")
      .style("text-anchor", "middle")
      .text(function(d) { return d.data.label; });
      
  };
  
  return PieChart;
};