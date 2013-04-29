var margin = {top: 20, right: 20, bottom: 10, left: 50};

var width = window.innerWidth/3 - margin.left - margin.right;
var height = window.outerWidth/8 - margin.top - margin.bottom;

/* Graded Items */
for (var i=0; i<data.GradedItems.length; i++) {
  /* Add top & down divs */
  var smallMultiples = d3.select("#container-multiple").append("div")
    .attr("id", "small-multiple"+i)
    .attr("class", "small-multiple");
  smallMultiples.append("div").attr("id", "top-multiple"+i).attr("class", "top-multiple");
  smallMultiples.append("div").attr("id", "down-multiple"+i).attr("class", "down-multiple");

  // Add 3 down divs, class name 'down'
  var downMultiples = d3.select("#down-multiple"+i);
  downMultiples.append("div").attr("id", "down1").attr("class","down")
    .on("click", function(d){
      console.log("bkj");
    });
  downMultiples.append("div").attr("id", "down2").attr("class","down");
  downMultiples.append("div").attr("id", "down3").attr("class","down");

  /* Add top multiple */ 
  var top1 = funcCreateLineGraph(margin, height, width,
                                        data.WeekActivity, "week-activity");
  top1.XAxis.ticks(data.WeekActivity.length)
  .tickFormat(function(d,i){
    return data.WeekActivity[i].label;
  });
  svg = d3.select("#top-multiple"+i).append("svg");
  top1.DrawGraph(svg);

  /* Add bottom multiple */ 
  var down1 = funcCreateLineGraph(margin, height/10, width/10,
                                        data.WeekActivity, "week-activity");
  down1.XAxis.ticks(data.WeekActivity.length)
  .tickFormat(function(d,i){
    return data.WeekActivity[i].label;
  });
  svg = d3.select("#down-multiple"+i+" #down1").append("svg");
  down1.DrawGraph(svg);

  var down2 = funcCreateLineGraph(margin, height/10, width/10,
                                        data.WeekActivity, "week-activity");
  down2.XAxis.ticks(data.WeekActivity.length)
  .tickFormat(function(d,i){
    return data.WeekActivity[i].label;
  });
  svg = d3.select("#down-multiple"+i+" #down2").append("svg");
  down2.DrawGraph(svg);

  /* Add pie chart */
  // var pieChart0 = funcCreatePieChart(margin, height/1.5, width/2,
  //                                     data.GradedItems[i].groups, "groups"+i);
  // var svg = d3.select("body div#multiples-pie"+i).append("svg");
  // pieChart0.DrawGraph(svg);
  
  // /* Add line chart */
  // var gradedItem0 = funcCreateLineGraph(margin, height/2, width/2,
  //                                       data.GradedItems[i].graph, "graded"+i);
  // gradedItem0.Scale.x.domain([0,100]);
  // var svg = d3.select("body div#multiples-line"+i).append("svg");
  // gradedItem0.DrawGraph(svg);

  // /* Add stacked bar chart */
  // d3.select("body div#multiples-bar"+i).append("div").attr("id", "stackedbar-title"+i).attr("class", "stackedbar-title").text("Number of Attempts");
  // var stackedBar0 = funcCreateStackedBar(margin, height/6, width/1.1,
  //                                       data.GradedItems[i].attempts, "stackedbar"+i, data.CurrentActiveStudents, data.MaxAttempts);
  // var svg = d3.select("body div#multiples-bar"+i).append("svg");
  // stackedBar0.DrawGraph(svg);

};



///////////////////////

/* Week Activity */
var weekLineGraph = funcCreateLineGraph(margin, height, width,
                                        data.WeekActivity, "week-activity");
weekLineGraph.XAxis.ticks(data.WeekActivity.length)
  .tickFormat(function(d,i){
    return data.WeekActivity[i].label;
  });
svg = d3.select("#activity-week-container").append("svg");
weekLineGraph.DrawGraph(svg);

/* Overall Activity */
var overallLineGraph = funcCreateLineGraph(margin, height, width,
                                           data.OverallActivity,
                                           "overall-activity");
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






