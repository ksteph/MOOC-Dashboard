var margin_activity = {top: 0, right: 0, bottom: 0, left: 0};
var width_activity = window.innerWidth/2;
var height_activity = window.outerWidth/6;

var margin_multiple_top = {top: 0, right: 0, bottom: 0, left: 0};
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

function callBack(i) {
  return function() {
    alert('i is: '+ i);
  }
}

/* Graded Items */

// var smallMultiples = d3.select("#container-multiple")
//   .data(data.GradedItems)
//   .enter().append("div")
//   .text("")

for (var i=0; i<data.GradedItems.length; i++) {
  /* Add top & down divs */
  // top div
  var smallMultiples = d3.select("#container-multiple").append("div")
    .attr("id", "small-multiple"+i)
    .attr("class", "small-multiple");
  smallMultiples.append("div").attr("id", "top-multiple"+i).attr("class", "top-multiple");
  smallMultiples.append("div").attr("id", "down-multiple"+i).attr("class", "down-multiple");
  
  // Add 3 down divs, class name 'down'
  var downMultiples = d3.select("#down-multiple"+i);

  downMultiples.append("div").attr("class","down").attr("id", "down"+i+"1")
    .on("click", function(d){
      //console.log("0: "+i);
      callBack(i);
      //console.log(d3.select("svg#top_line"+i+"-line-graph"));
      d3.select("svg#top_line"+i+"-line-graph").attr("display","block");
      d3.select("svg#top_status"+i+"-line-graph").attr("display","none");
      d3.select("svg#top_attempt"+i+"-line-graph").attr("display","none");
    });
  downMultiples.append("div").attr("class","down").attr("id", "down"+i+"2")
    .on("click", function(d){
        console.log("1: "+i);
        d3.select("svg#top_line"+i+"-line-graph").attr("display","none");
        d3.select("svg#top_status"+i+"-line-graph").attr("display","block");
        d3.select("svg#top_attempt"+i+"-line-graph").attr("display","none");
    });
  downMultiples.append("div").attr("class","down").attr("id", "down"+i+"3")
    .on("click", function(d){
        console.log("2: "+i);
        d3.select("svg#top_line"+i+"-line-graph").attr("display","none");
        d3.select("svg#top_status"+i+"-line-graph").attr("display","none");
        d3.select("svg#top_attempt"+i+"-line-graph").attr("display","block");
    });

  /* Add top multiple */
  // line graph 
  var top1 = funcCreateLineGraph(margin_multiple_top, height_multiple_top, width_multiple_top, data.WeekActivity, "top_line"+i);
  top1.XAxis.ticks(data.WeekActivity.length)
  .tickFormat(function(d,i){
    return data.WeekActivity[i].label;
  });
  svg = d3.select("#top-multiple"+i).append("svg");
  top1.DrawGraph(svg);

  // status graph 
  var top2 = funcCreateLineGraph(margin_multiple_top, height_multiple_top, width_multiple_top, data.OverallActivity, "top_status"+i);
  top2.Scale.x.domain(
    d3.extent(data.OverallActivity, function(d) { return d.x; }));
  top2.XAxis.ticks(data.OverallActivity.length)
  .tickFormat(function(d,i){
    var format = d3.time.format("%Y-%m-%d");
    var date = format(new Date(data.OverallActivity[i].x));
    return date;
  });
  svg = d3.select("#top-multiple"+i).append("svg").attr("display","none");
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
  svg = d3.select("#top-multiple"+i).append("svg").attr("display","none");
  top3.DrawGraph(svg);

  /* Add bottom multiple */ 
  var down1 = funcCreateLineGraph(margin_multiple_down, height_multiple_down, width_multiple_down, data.WeekActivity, "down_line"+i);
  down1.XAxis.ticks(data.WeekActivity.length)
  .tickFormat(function(d,i){
    return data.WeekActivity[i].label;
  });
  svg = d3.select("#down-multiple"+i+" #down"+i+"1").append("svg");
  down1.DrawGraph(svg);

  var down2 = funcCreateLineGraph(margin_multiple_down, height_multiple_down, width_multiple_down, data.OverallActivity, "down_status"+i);
  down2.Scale.x.domain(
    d3.extent(data.OverallActivity, function(d) { return d.x; }));
  down2.XAxis.ticks(data.OverallActivity.length)
  .tickFormat(function(d,i){
    var format = d3.time.format("%Y-%m-%d");
    var date = format(new Date(data.OverallActivity[i].x));
    return date;
  });
  svg = d3.select("#down-multiple"+i+" #down"+i+"2").append("svg");
  down2.DrawGraph(svg);

  var down3 = funcCreateLineGraph(margin_multiple_down, height_multiple_down, width_multiple_down, data.OverallActivity, "down_attempt"+i);
  down3.Scale.x.domain(
    d3.extent(data.OverallActivity, function(d) { return d.x; }));
  down3.XAxis.ticks(data.OverallActivity.length)
  .tickFormat(function(d,i){
    var format = d3.time.format("%Y-%m-%d");
    var date = format(new Date(data.OverallActivity[i].x));
    return date;
  });
  svg = d3.select("#down-multiple"+i+" #down"+i+"3").append("svg");
  down3.DrawGraph(svg);


};





