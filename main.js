var margin = {top: 20, right: 20, bottom: 30, left: 50};
var width = 960 - margin.left - margin.right;
var height = 500 - margin.top - margin.bottom;

var gradedItem0 = funcCreateLineGraph(margin, height, width,
                                      data.GradedItems[0].graph, "graded0");
gradedItem0.Scale.x.domain([0,100]);
gradedItem0.DrawGraph();

var weekLineGraph = funcCreateLineGraph(margin, height, width,
                                        data.WeekActivity, "week-activity");
weekLineGraph.XAxis.ticks(data.WeekActivity.length)
  .tickFormat(function(d,i){
    return data.WeekActivity[i].label;
  });
weekLineGraph.DrawGraph();


var overallLineGraph = funcCreateLineGraph(margin, height, width,
                                           data.OverallActivity,
                                           "overall-activity");
overallLineGraph.Scale.x.domain(
  d3.extent(data.OverallActivity, function(d) { return d.x; }));
overallLineGraph.DrawGraph();