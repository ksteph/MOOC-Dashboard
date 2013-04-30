var margin_activity = {top: 20, right: 20, bottom: 0, left: 0};
var width_activity = window.innerWidth/2.2;
var height_activity = window.outerWidth/6;

var margin_multiple_top = {top: 20, right: 20, bottom: 0, left: 0};
var width_multiple_top = window.innerWidth/3;
var height_multiple_top = window.outerWidth/8;

var margin_multiple_down = {top: 0, right: 0, bottom: 0, left: 0};
var width_multiple_down = window.innerWidth/12;
var height_multiple_down = window.outerWidth/24;

///////////////////////

function function2(num){
  console.log(num); 
}

///////////////////////

/* Week Activity */
var weekLineGraph = funcCreateLineGraph(margin_activity, height_activity, width_activity, data.WeekActivity, "week-activity");
weekLineGraph.XAxis.ticks(data.WeekActivity.length)
  .tickFormat(function(d,i){
    return data.WeekActivity[i].label;
  });
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

////////////

/* Top 1 */
var smallMultiples = d3.select("#container-multiple").selectAll(".small-multiple")
  .data([0,1,2])
  .enter().append("div")
  .attr("class", "small-multiple")
  .attr("id", function(d,i) {
    return "small-multiple"+i;
  })
smallMultiples.append("div")
  .attr("class", "top-multiple")
  .attr("id", function(d,i) {
    return "top-multiple"+i;
  });

/* Draw line/status/attempt graph, but set display to block/none */
for (var i=0; i<data.GradedItems.length; i++) { 
  // line graph  
  var top1 = funcCreateLineGraph(margin_multiple_top, height_multiple_top, width_multiple_top, data.WeekActivity, "top_line"+i);
  top1.XAxis.ticks(data.WeekActivity.length)
  .tickFormat(function(d,i){
    return data.WeekActivity[i].label;
  });
  svg = d3.select("#top-multiple"+i).append("svg").attr("class","top-svg");
  top1.DrawGraph(svg);

  //status graph 
  var top2 = funcCreateLineGraph(margin_multiple_top, height_multiple_top, width_multiple_top, data.OverallActivity, "top_status"+i);
  top2.Scale.x.domain(
    d3.extent(data.OverallActivity, function(d) { return d.x; }));
  top2.XAxis.ticks(data.OverallActivity.length)
  .tickFormat(function(d,i){
    var format = d3.time.format("%Y-%m-%d");
    var date = format(new Date(data.OverallActivity[i].x));
    return date;
  });
  svg = d3.select("#top-multiple"+i).append("svg").attr("display","none").attr("class","top-svg");
  top2.DrawGraph(svg);

  // attempt graph 
  var top3 = funcCreateLineGraph(margin_multiple_top, height_multiple_top, width_multiple_top, data.OverallActivity, "top_attempt"+i);
  top3.Scale.x.domain(
    d3.extent(data.OverallActivity, function(d) { return d.x; }));
  top3.XAxis.ticks(data.OverallActivity.length)
  .tickFormat(function(d,i){
    var format = d3.time.format("%Y-%m-%d");
    var date = format(new Date(data.OverallActivity[i].x));
    return date;
  });
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
    .text("aa")
    .on("click", function(d,i) {
      console.log(parantD);
      if (i==0) {
        d3.select("svg#top_line"+parantD+"-line-graph").attr("display","block");
        d3.select("svg#top_status"+parantD+"-line-graph").attr("display","none");
        d3.select("svg#top_attempt"+parantD+"-line-graph").attr("display","none");
      }
      else if (i==1) {
        d3.select("svg#top_line"+parantD+"-line-graph").attr("display","none");
        d3.select("svg#top_status"+parantD+"-line-graph").attr("display","block");
        d3.select("svg#top_attempt"+parantD+"-line-graph").attr("display","none");
      }
      else if (i==2) {
        d3.select("svg#top_line"+parantD+"-line-graph").attr("display","none");
        d3.select("svg#top_status"+parantD+"-line-graph").attr("display","none");
        d3.select("svg#top_attempt"+parantD+"-line-graph").attr("display","block");
      }
      else {
        console.log("something is wrong");
      }
    });
});
  

