var margin_activity = {top: 20, right: 20, bottom: 0, left: 0};
var width_activity = window.innerWidth/2.2;
var height_activity = window.outerWidth/4.5;

var margin_multiple_top = {top: 20, right: 20, bottom: 0, left: 0};
var width_multiple_top = window.innerWidth/3.3;
var height_multiple_top = window.outerWidth/5.5;

var margin_multiple_down = {top: 0, right: 0, bottom: 0, left: 0};
var width_multiple_down = window.innerWidth/12;
var height_multiple_down = window.outerWidth/24;

///////////////////////

/* Week Activity */
var weekLineGraph = funcCreateLineGraph(margin_activity, height_activity, width_activity, data.WeekActivity, "week-activity");
weekLineGraph.XAxis.ticks(data.WeekActivity.length);
  // TODO
  // .tickFormat(function(d,i){ 
  //   return data.WeekActivity[i].label;
  // });
svg = d3.select("#activity-week-container").append("svg");
weekLineGraph.DrawGraph(svg);

/* Overall Activity */
var overallLineGraph = funcCreateLineGraph(margin_activity, height_activity, width_activity, data.OverallActivity, "overall-activity");
overallLineGraph.Scale.x.domain(
  d3.extent(data.OverallActivity, function(d) { return d.x; }));
overallLineGraph.XAxis.ticks(data.OverallActivity.length)
  .tickFormat(function(d,i){
    //console.log(d);
    var format = d3.time.format("%Y-%m-%d");
    //console.log(i + ":" + format(new Date(data.OverallActivity[i].x)))
    var date = format(new Date(data.OverallActivity[i].x));
    return date; /*not working yet*/
  });

svg = d3.select("#activity-overall-container").append("svg");
overallLineGraph.DrawGraph(svg);

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
  .text(function(d,i){
    if (i===0) return "Homework";
    else if (i===1) return "Quizzes";
    else return "Fake Homework"
  });
smallMultiples.append("div")
  .attr("class", "top-multiple")
  .attr("id", function(d,i) {
    return "top-multiple"+i;
  });


/* Draw line/status/attempt graph, but set display to block/none */
for (var i=0; i<data.GradedItems.length; i++) { 

  // line graph  
  var top1 = funcCreateLineGraph(margin_multiple_top, height_multiple_top, width_multiple_top, data.GradedItems[i].gradeDistroGraph.data, "top_line"+i);
  top1.XAxis.ticks(data.WeekActivity.length);
  // TODO
  // .tickFormat(function(d,i){
  //   return data.WeekActivity[i].label;
  // });
  svg = d3.select("#top-multiple"+i).append("svg").attr("class","top-svg");
  top1.DrawGraph(svg);

  //status graph 
  var status_data = [];
  $.each(data.GradedItems[i].statusGraph.data, function(i,e_i) {
    var d = [];
    
    $.each(e_i, function(j, e_j) {
      var b = {};
      b.x = e_j.count;
      b.y = e_j.label;
      b.percentage = e_j.percentage;
      b.label = e_j.count + " (" + e_j.percentage + ")";
      d.push(b);
    });

    status_data.push(d);
  });

  var top2 = funcCreateStackedBarGraph(margin_multiple_top, height_multiple_top, width_multiple_top, status_data, "top_status"+i, data.GradedItems[i].itemTitles, data.GradedItems[i].statusGraph.y_range)
  svg = d3.select("#top-multiple"+i).append("svg").attr("display","none").attr("class","top-svg");
  top2.DrawGraph(svg);

  // attempt graph 
  attempt_data = [];
  $.each(data.GradedItems[i].attemptsGraph.data, function(i,e_i) {
    var d = [];

    $.each(e_i, function(j, e_j) {
      var b = {};
      b.x = e_j.x;
      b.y = e_j.y;
      b.percentage = e_j.percentage;
      b.label = e_j.y + " (" + e_j.percentage + ")";
      d.push(b);
    });

    attempt_data.push(d);
  });

  var top3 = funcCreateStackedBarGraph(margin_multiple_top, height_multiple_top, width_multiple_top, attempt_data, "top_attempt"+i, data.GradedItems[i].itemTitles, data.GradedItems[i].attemptsGraph.y_range)
  svg = d3.select("#top-multiple"+i).append("svg").attr("display","none").attr("class","top-svg");
  top3.DrawGraph(svg);

}
  
/* Down 3 */
var downMultiples = smallMultiples.append("div")
  .attr("class", "down-multiple")
  .attr("id", function(d,i) {
    return "down-multiple"+i;
  });
d3.selectAll('.down-multiple').each(function(parantD) {
  d3.select(this).selectAll(".down")
    .data([400,500,600])
    .enter().append("div")
    .attr("class", "down")
    .attr("id", function(d,i) {
      return "down"+i;
    })
    .text("click me")
    .on("click", function(d,i) {
      console.log(parantD);
      if (i==0) {
        d3.select("svg#top_line"+parantD+"-line-graph").attr("display","block");
        d3.select("svg#top_status"+parantD+"-stacked-bar-graph").attr("display","none");
        d3.select("svg#top_attempt"+parantD+"-stacked-bar-graph").attr("display","none");
      }
      else if (i==1) {
        d3.select("svg#top_line"+parantD+"-line-graph").attr("display","none");
        d3.select("svg#top_status"+parantD+"-stacked-bar-graph").attr("display","block");
        d3.select("svg#top_attempt"+parantD+"-stacked-bar-graph").attr("display","none");
      }
      else if (i==2) {
        d3.select("svg#top_line"+parantD+"-line-graph").attr("display","none");
        d3.select("svg#top_status"+parantD+"-stacked-bar-graph").attr("display","none");
        d3.select("svg#top_attempt"+parantD+"-stacked-bar-graph").attr("display","block");
      }
      else {
        console.log("something is wrong");
      }
    });
});
  

