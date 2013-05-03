var margin_activity_week = {top: 20, right: 0, bottom: 20, left: -20};
var width_activity_week = window.innerWidth/3;
var height_activity_week = window.innerHeight;

var margin_activity_overall = {top: 0, right: 0, bottom: 25, left: -100};
var width_activity_overall = window.innerWidth*1.5;
var height_activity_overall = window.innerHeight/3.5;

var margin_multiple_top = {top: 10, right: 20, bottom: 0, left: 0};
var width_multiple_top = window.innerWidth/3.3;
var height_multiple_top = window.innerHeight/3.5;

var margin_multiple_down = {top: 0, right: 0, bottom: 0, left: 0};
var width_multiple_down = window.innerWidth/12;
var height_multiple_down = window.innerHeight/12;

///////////////////////

/* Week Activity */
// Make sure draw line in right order
data.WeekActivity.sort(function(a,b){ return a.x-b.x; });

// Convert line graph data into bar graph data
var weekBarData = [];
var weekXLabels = [];
var weekYMax = 0;
$.each(data.WeekActivity, function(i,e) {
  var d = {};
  d.x = e.y;

  if (d.x > weekYMax)
    weekYMax = d.x;
  
  if (e.label.match(/hw/i))
    d.y = "Homework";
  else if (e.label.match(/quiz/i))
    d.y = "Quiz";
  else if (e.x_label.match(/v\d/i))
    d.y = "Video";
  else
    d.y = "Other";
  
  d.label = e.label + " (" + d3.format(",")(d.x) + " students)";
  d.percentage = 100;
  
  weekBarData.push([d]);

  weekXLabels.push(e.x_label);
});

// Commenting and leaving this code here as sample code on how to create the vertical bar graph.
// var tmp = funcCreateStackedBarGraph(margin_activity, width_activity, height_activity, weekBarData, "tmp", weekXLabels, [0,weekYMax], true);
// var svgTmp = d3.select("body").append("svg")
// tmp.Scale.stackColor.range(["b72567","009fe2","77519a","898b8f"]);
// tmp.DrawGraph(svgTmp);
// d3.select("#tmp-y-axis").selectAll(".tick").selectAll("text")
//   .attr("transform", "rotate(45) translate(-5,5)")
//   .style("text-anchor", "end");

var weekBarGraph = funcCreateStackedBarGraph(margin_activity_week, height_activity_week, width_activity_week, weekBarData, "week-activity", weekXLabels, [0,weekYMax], true);
svg = d3.select("#activity-week-container").append("svg")
  .attr("viewBox", "0 0 "+width_activity_week+" "+height_activity_week);
weekBarGraph.Scale.stackColor.range(["b72567","009fe2","77519a","898b8f"]);
weekBarGraph.DrawGraph(svg);
d3.select("#week-activity-y-axis").selectAll(".tick").selectAll("text")
  .attr("transform", "rotate(45) translate(-5,5)")
  .style("text-anchor", "end");    
     

/* Overall Activity */
var overallLineGraph = funcCreateLineGraph(margin_activity_overall, height_activity_overall, width_activity_overall, data.OverallActivity, "overall-activity");
overallLineGraph.Scale.x.domain(
  d3.extent(data.OverallActivity, function(d) { return d.x; }));
overallLineGraph.XAxis.ticks(10)
  .tickFormat(function(d,i){
    var format = d3.time.format("%Y-%m-%d");
    return format(new Date(d*1000));
  });

svg = d3.select("#activity-overall-container").append("svg")
  .attr("viewBox", "0 0 "+width_activity_overall+" "+height_activity_overall);
overallLineGraph.DrawGraph(svg);
d3.select("#overall-activity-x-axis").selectAll("text")
  .attr("transform", function(d){
    return "rotate(-20) translate(-12,0)"
  });

/////////////////////

/* Top 1 */
var smallMultiples = d3.select("#container-multiple").selectAll(".small-multiple")
  .data([0,1,2])
  .enter().append("div")
  .attr("class", "small-multiple")
  .attr("id", function(d,i) {
    return "small-multiple"+i;
  })
smallMultiples.append("div")
  .attr("class", "small-multiple-title")
  .attr("id", function(d,i) {
    return "small-multiple-title"+i;
  })
smallMultiples.append("div")
  .attr("class", "fixed-multiple")
  .attr("id", function(d,i) {
    return "fixed-multiple"+i;
  })
smallMultiples.append("div")
  .attr("class", "top-multiple")
  .attr("id", function(d,i) {
    return "top-multiple"+i;
  });

d3.select("#small-multiple-title0").append("div").attr("class","left").text("Homework: ");
d3.select("#small-multiple-title0").append("div").attr("class","right").text("Grade Distribution (Submitted)");
d3.select("#small-multiple-title1").append("div").attr("class","left").text("HW Practice: ");
d3.select("#small-multiple-title1").append("div").attr("class","right").text("Grade Distribution (Submitted)");
d3.select("#small-multiple-title2").append("div").attr("class","left").text("Quiz: ");
d3.select("#small-multiple-title2").append("div").attr("class","right").text("Grade Distribution (Submitted)");

////

var storage_matrix = []; //dirty code

/* Draw line/status/attempt graph, but set display to block/none */
for (var i=0; i<data.GradedItems.length; i++) { 
  // line graph  
  var line_data = [];
  var titles = data.GradedItems[i].itemTitles;
  var parantI = i;

  var tmpData = [];
  var tmpXLabel = [];

  $.each(data.GradedItems[i].gradeDistroGraph.data, function(i2,e_i) {
    var d = [];
    var tD = [];

    $.each(e_i, function(j, e_j) {
      var b = {};
      b.x = e_j.x*100;
      b.y = e_j.y;
      b.percentage = e_j.percentage;
      b.label = data.GradedItems[parantI].itemTitles[i] + " (" + e_j.label + ")";
      d.push(b);

      var tB = {};
      tB.x = e_j.y;
      tB.y = e_j.x*100;
      tB.label = data.GradedItems[parantI].itemTitles[i] + " (" + e_j.label + 
        " ["+d3.format(".0f")(e_j.percentage*100)+"%]"+")";
      tB.percentage = e_j.percentage;
      tD.push(tB);
    });

    line_data.push(d);
    tmpData.push(tD.sort(function(a,b){return a.y-b.y}));
    tmpXLabel.push(data.GradedItems[i].itemTitles[i2].slice(0,2));
  });

  var tmp = funcCreateStackedBarGraph(margin_multiple_top, height_multiple_top, width_multiple_top, tmpData, "tmp", tmpXLabel, data.GradedItems[i].gradeDistroGraph.y_range);
  tmp.Scale.stackColor = d3.scale.linear()
    .domain([0,50,100])
    .range(["#f00","#fff","#0f0"]);
  tmp.Mini.Scale.stackColor = tmp.Scale.stackColor;
  $.each(tmp.StackColorDomain, function(i2,e_i) {
    tmp.StackColorDomain[i2] = i2*(100.0/tmp.StackColorDomain.length);
  });
  // tmp.StackColorDomain[0] = 0;
  // tmp.StackColorDomain[tmp.StackColorDomain.length-1] = 100;
  
  var svgTmp = d3.select("body").append("svg")
  tmp.DrawGraph(svgTmp);
  

  var top1 = funcCreateMultiLineGraph(margin_multiple_top, height_multiple_top, width_multiple_top, line_data, "top_line"+i, data.GradedItems[i].gradeDistroGraph.x_range, data.GradedItems[i].gradeDistroGraph.y_range);
  top1.XAxis.ticks(10); // data.WeekActivity.length
  top1.Scale.color.range(["#3D9AD1","#3D51D1","#733DD1","#3DD1BE","#3DD173","#E9BBA0","#D1BE3D","#D13D51","#D1733D","#A0CEE9","#D13D9B"]);
  svg = d3.select("#top-multiple"+i).append("svg").attr("class","top-svg")
    .attr("viewBox", "0 0 "+width_multiple_top+" "+height_multiple_top);
  top1.DrawGraph(svg);
  storage_matrix.push(top1);
  d3.select("#top_line"+i+"-x-axis").selectAll("text")
  .style("font-size", "8px");

  //status graph 
  var parantI = i;
  var status_data = [];
  var max = 0;
  var min = 0;
  var xLabel = [];

  $.each(data.GradedItems[i].statusGraph.data, function(i,e_i) {
    var d = [];
    var pos = 0;
    var neg = 0;
    xLabel.push(data.GradedItems[parantI].itemTitles[i].slice(0,2));

    $.each(e_i, function(j, e_j) {
      var b = {};
      b.x = e_j.count;
      b.y = e_j.label;
      b.percentage = e_j.percentage;
      f = d3.format("2f");
      b.label = data.GradedItems[parantI].itemTitles[i] + " - "+ e_j.label + " (" + f(e_j.percentage*100) + "%: "+e_j.count+" Students)";

      if ((b.y == "Not Started") && (b.x > 0))
        b.x = b.x*-1;

      if (b.x > 0)
        pos = pos + b.x;
      if (b.x < 0)
        neg = neg + b.x;

      d.push(b);
    });

    if (pos > max)
      max = pos;
    if (neg < min)
      min = neg;

    status_data.push(d);
  });

  // Top 1, status, fixed
  var top1 = funcCreateStackedBarGraph({top: 10, right: 20, bottom: 0, left: 0}, height_multiple_top, width_multiple_top, status_data, "top_status"+i, data.GradedItems[i].itemTitles, [min,max])
  top1.Scale.stackColor.range(["#ff9b8e","#8EC6E8","#FFE796"]);
  top1.XAxis.tickFormat(function(d,i){
    return xLabel[i];
  });
  top1.YAxis.tickFormat(function(d,i){
    if (d < 0)
      return d3.format(",")(d*-1);
    else
      return d3.format(",")(d);;
  });
  svg = d3.select("#fixed-multiple"+i).append("svg").attr("display","block").attr("class","top-svg")
    .attr("viewBox", "0 0 "+width_multiple_top+" "+height_multiple_top);
  top1.DrawGraph(svg);
  top1.Rects.attr("opacity",0.8);
  //storage_matrix.push(top1);
  d3.select("#top_status"+i+"-x-axis").selectAll("text");


  // Top 2, attempt graph 
  var attempt_data = [];
  var xMax = 0;
  var xSum = 0;
  xLabel = [];

  $.each(data.GradedItems[i].attemptsGraph.data, function(i,e_i) {
    var d = [];
    xSum = 0;
    xLabel.push(data.GradedItems[parantI].itemTitles[i].slice(0,2));

    $.each(e_i, function(j, e_j) {
      var b = {};
      b.x = e_j.x;

      //Calculate x_range manually
      xSum = xSum + b.x;
      if (xSum>xMax) xMax = xSum;

      if (e_j.y > 10)
        b.y = "10+"
      else
        b.y = e_j.y;

      b.percentage = e_j.percentage;
      f = d3.format("2f");
      if (e_j.y>10) b.label = data.GradedItems[parantI].itemTitles[i]+ " (10+ attempts:" + f(e_j.percentage*100) + "%)";
      else if (e_j.y==1) b.label = data.GradedItems[parantI].itemTitles[i] + " (" + e_j.y + " attempt: " + f(e_j.percentage*100) + "%)";
      else b.label = data.GradedItems[parantI].itemTitles[i] + " (" + e_j.y + " attempts: " + f(e_j.percentage*100) + "%)";
      
      // If have attempts that are not zero don't need this one.
      if (!((b.x == 0) && (e_i.length > 1)))
        d.push(b);
    });

    attempt_data.push(d);
  });

  var top2 = funcCreateStackedBarGraph({top: 10, right: 20, bottom: 0, left: 0}, height_multiple_top, width_multiple_top, attempt_data, "top_attempt"+i, data.GradedItems[i].itemTitles, [0, xMax])
  svg = d3.select("#top-multiple"+i).append("svg").attr("display","block").attr("class","top-svg")
    .attr("viewBox", "0 0 "+width_multiple_top+" "+height_multiple_top);
  top2.Scale.stackColor.range(["#ffebeb","#ffd6d6","#ffc2c2","#ffadad","#ff9999","#ff8585","#ff7070","#ff5c5c","#ff4747","#ff3333","#ff1f1f"]);
  top2.XAxis.tickFormat(function(d,i){
    return xLabel[i];
  });
  top2.DrawGraph(svg);
  top2.Rects.attr("opacity",0.8);
  storage_matrix.push(top2);
  d3.select("#top_attempt"+i+"-x-axis").selectAll("text");

  // Top 3, grade, display none  
  var line_data = [];
  var titles = data.GradedItems[i].itemTitles;
  
  $.each(data.GradedItems[i].gradeDistroGraph.data, function(i,e_i) {
    var d = [];

    $.each(e_i, function(j, e_j) {
      var b = {};
      b.x = e_j.x*100;
      b.y = e_j.y;
      b.percentage = e_j.percentage;
      b.label = data.GradedItems[parantI].itemTitles[i] + " (" + e_j.label + ")";
      d.push(b);
    });

    line_data.push(d);
  });

  var top3 = funcCreateMultiLineGraph(margin_multiple_top, height_multiple_top, width_multiple_top, line_data, "top_line"+i, data.GradedItems[i].gradeDistroGraph.x_range, data.GradedItems[i].gradeDistroGraph.y_range);
  top3.XAxis.ticks(10); // data.WeekActivity.length
  top3.Scale.color.range(["#3D9AD1","#3D51D1","#733DD1","#3DD1BE","#3DD173","#E9BBA0","#D1BE3D","#D13D51","#D1733D","#A0CEE9","#D13D9B"]);
  svg = d3.select("#top-multiple"+i).append("svg").attr("display","none").attr("class","top-svg")
    .attr("viewBox", "0 0 "+width_multiple_top+" "+height_multiple_top);
  top3.DrawGraph(svg);
  storage_matrix.push(top3);
  d3.select("#top_line"+i+"-x-axis").selectAll("text")
  .style("font-size", "8px");
}
  

/* Down 3 */
var downMultiples = smallMultiples.append("div")
  .attr("class", "down-multiple")
  .attr("id", function(d,i) {
    return "down-multiple"+i;
  });
d3.selectAll('.down-multiple').each(function(parantD) {
  d3.select(this).selectAll(".down")
    .data([400,500])
    .enter().append("div")
    .attr("class", "down")
    .attr("id", function(d,i) {
      return "down"+parantD+i;
    })
    .append("svg")
    .attr("id", function(d,i) {
      return "down-svg"+i;
    })
    .on("click", function(d,i) {
      if (i==0) {
        $("#down-multiple"+parantD+" .down").removeClass("active");
        $("#down-multiple"+parantD+" #down"+parantD+i).addClass("active");
        d3.select("svg#top_line"+parantD+"-line-graph").attr("display","none");
        d3.select("svg#top_attempt"+parantD+"-stacked-bar-graph").attr("display","block");
        d3.select("#small-multiple"+parantD+" .small-multiple-title .right").text("Grade Distribution (Submitted)");  
      }
      else if (i==1) {
        $("#down-multiple"+parantD+" .down").removeClass("active");
        $("#down-multiple"+parantD+" #down"+parantD+i).addClass("active");
        d3.select("svg#top_line"+parantD+"-line-graph").attr("display","block");
        d3.select("svg#top_attempt"+parantD+"-stacked-bar-graph").attr("display","none");
        d3.select("#small-multiple"+parantD+" .small-multiple-title .right").text("Student Status");
      }
      // else if (i==2) {
      //   $("#down-multiple"+parantD+" .down").removeClass("active");
      //   $("#down-multiple"+parantD+" #down"+parantD+i).addClass("active");
      //   d3.select("svg#top_line"+parantD+"-line-graph").attr("display","none");
      //   d3.select("svg#top_status"+parantD+"-stacked-bar-graph").attr("display","none");
      //   d3.select("svg#top_attempt"+parantD+"-stacked-bar-graph").attr("display","block");
      //   d3.select("#small-multiple"+parantD+" .small-multiple-title .right").text("Student Attempts (for attempts > 0)");
      // }
      else {
        console.log("something is wrong");
      }
    });
});

$("#down00").addClass("active");
$("#down10").addClass("active");
$("#down20").addClass("active");

for (var i=0; i<3; i++) {
  for (var k=0; k<2; k++) {
    svg = d3.select("#down-multiple"+i+" #down"+i+k+" svg")
      .attr("viewBox", "0 0 "+width_multiple_down+" "+height_multiple_down)
      .attr("display","block");
    storage_matrix[i*3+k].DrawMiniGraph(svg, height_multiple_down, width_multiple_down, margin_multiple_down);
    svg.selectAll("rect").attr("opacity", 0.8);
  }
}





