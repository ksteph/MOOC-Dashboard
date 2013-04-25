var margin = {top: 20, right: 20, bottom: 10, left: 50};

var width = window.innerWidth/2.1 - margin.left - margin.right;
var height = window.outerWidth/4.2 - margin.top - margin.bottom;

/* Graded Items */
for (var i=0; i<2; i++) {
  /* Add divs */
  var divMultiples = d3.select("body div#container-multiples").append("div")
    .attr("id", "multiples"+i)
    .attr("class", "multiples");
  divMultiples.append("div").attr("id", "multiples-title"+i).attr("class", "multiples-title").text(data.GradedItems[i].title);
  divMultiples.append("div").attr("id", "multiples-pie"+i).attr("class", "multiples-pie");
  divMultiples.append("div").attr("id", "multiples-line"+i).attr("class", "multiples-line");
  divMultiples.append("div").attr("id", "multiples-bar"+i).attr("class", "multiples-bar");
  
  /* Add pie chart */
  var pieChart0 = funcCreatePieChart(margin, height/2, width/2,
                                      data.GradedItems[i].groups, "groups"+i);
  var svg = d3.select("body div#multiples-pie"+i).append("svg");
  pieChart0.DrawGraph(svg);
  
  /* Add line chart */
  var gradedItem0 = funcCreateLineGraph(margin, height/2, width/2,
                                        data.GradedItems[i].graph, "graded"+i);
  gradedItem0.Scale.x.domain([0,100]);
  var svg = d3.select("body div#multiples-line"+i).append("svg");
  gradedItem0.DrawGraph(svg);

  /* Add stacked bar chart */
  d3.select("body div#container-multiples").append("div").attr("class", "stackedbar-title").text("Grade");
  var stackedBar0 = funcCreateStackedBar(margin, height/4, width,
                                        data.GradedItems[i].attempts, "stackedbar"+i, data.CurrentActiveStudents, data.MaxAttempts);
  var svg = d3.select("body div#multiples-bar"+i).append("svg");
  stackedBar0.DrawGraph(svg);

};



/* Week Activity */
var weekActivityTitle = d3.select("body div#container-activity").append("div").attr("id","title-weekActivity").text("Activity this week");
var weekLineGraph = funcCreateLineGraph(margin, height, width,
                                        data.WeekActivity, "week-activity");
weekLineGraph.XAxis.ticks(data.WeekActivity.length)
  .tickFormat(function(d,i){
    return data.WeekActivity[i].label;
  });
svg = d3.select("body div#container-activity").append("svg");
weekLineGraph.DrawGraph(svg);

/* Overall Activity */
var overallActivityTitle = d3.select("body div#container-activity").append("div").attr("id","title-overallActivity").text("Active students");
var overallLineGraph = funcCreateLineGraph(margin, height, width,
                                           data.OverallActivity,
                                           "overall-activity");
overallLineGraph.Scale.x.domain(
  d3.extent(data.OverallActivity, function(d) { return d.x; }));
overallLineGraph.XAxis.ticks(data.OverallActivity.length)
  .tickFormat(function(d,i){
    var format = d3.time.format("%Y-%m-%d");
    return new Date(data.WeekActivity[i].x); /*not working yet*/
  });

svg = d3.select("body div#container-activity").append("svg");
overallLineGraph.DrawGraph(svg);