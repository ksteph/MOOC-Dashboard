var CONSTANTS = {
    zoom_scale : 1.1,
    zoom_in_limit : 30.0,
    zoom_out_limit : 0.3,
    pan_step : 10,
};

var Container = (function(Container) {
  Container.TransMatrix = [1,0,0,1,0,0];
  Container.MousePos = [0,0];
  Container.WinMousePos = [0,0];
  Container.BMouseDown = false;
  Container.DragOldMousePos = [0,0];
  Container.DragStartMousePos = [0,0];
  Container.DragEndMousePos = [0,0];

  Container.setup = function() {
    // Creating data

    // Done with data

    window.addEventListener('keydown', Container.winKeyDown, false);
    window.addEventListener('mousemove', Container.winMouseMove, false);
    window.addEventListener('mouseup', Container.winMouseUp, false);

    d3.select("#container-div")
    .on("mousewheel", Container.svgMouseWheel)
    .on("mousedown", Container.svgMouseDown);

    Container.Svg = d3.select("#week-activity-line-graph")
    .on("mousemove", Container.mouseMove);

    Container.SvgG = Container.Svg.select("g")
    // .attr("id", "container-svg-group")
    .attr("transform", "matrix("+Container.TransMatrix.join(' ')+")");

    // Container.SvgG = Container.Svg.append("g")
    // .attr("id", "container-svg-group")
    // .attr("transform", "matrix("+Container.TransMatrix.join(' ')+")");

    // Container.SvgG.append("circle")
    //   .attr("r", 100)
    //   .attr("cx", 100)
    //   .attr("cy", 100)
    //   .attr("fill", "blue");
    // Container.SvgG.append("text")
    //   .text("test")
    //   .attr("x", 100)
    //   .attr("y", 100);

    Container.update();
  }

  Container.update = function() {
  }

  Container.pan = function(dx,dy) {
    if (Container.SvgG == null)
      return;
       
    Container.TransMatrix[4] += dx;
    Container.TransMatrix[5] += dy;
    
    var matrix = "matrix("+Container.TransMatrix.join(' ')+")";
    Container.SvgG.attr("transform", matrix);
  }

  Container.panUp = function(){ Container.pan(0,CONSTANTS.pan_step); }
  Container.panDown = function(){ Container.pan(0,-CONSTANTS.pan_step); }
  Container.panRight = function(){ Container.pan(CONSTANTS.pan_step,0); }
  Container.panLeft = function(){ Container.pan(-CONSTANTS.pan_step,0); }

  Container.zoomIn = function() { Container.zoom(CONSTANTS.zoom_scale); }
  Container.zoomOut = function() { Container.zoom(1.0/CONSTANTS.zoom_scale); }

  Container.zoom = function(scale) {
    if (Container.SvgG == null)
      return;
      
    if (Container.TransMatrix[0]*scale > CONSTANTS.zoom_in_limit || 
        Container.TransMatrix[0]*scale < CONSTANTS.zoom_out_limit)
      return;

    for(var i = 0; i < Container.TransMatrix.length; i++) {
      Container.TransMatrix[i] *= scale;
    }

    Container.TransMatrix[4] += (1-scale)*Container.MousePos[0];
    Container.TransMatrix[5] += (1-scale)*Container.MousePos[1];

    var matrix = "matrix("+Container.TransMatrix.join(' ')+")";
    Container.SvgG.attr("transform", matrix);
  }

  Container.winKeyDown = function(event) {
    switch(event.keyCode) {
      case 37: // left arrow
        Container.panLeft();
        break;
      case 38: // up arrow
        Container.panDown();
        break;
      case 39: // right arrow
        Container.panRight();
        break;
      case 40: // down arrow
        Container.panUp();
        break;
      case 187: // + key
        Container.zoomIn();
        break;
      case 189: // - key
        Container.zoomOut();
        break;
      case 32: // space bar (use for testing)
        break;
      default:
        break; // Do nothing
    }
  }

  Container.winMouseMove = function(e) {
    Container.WinMousePos = [e.clientX,e.clientY];
    if (Container.BMouseDown) {
      var dx = -1*(Container.DragOldMousePos[0]-Container.WinMousePos[0]);
      var dy = -1*(Container.DragOldMousePos[1]-Container.WinMousePos[1]);
      Container.DragOldMousePos = Container.WinMousePos;

      if (Container.BMouseDown)
        Container.pan(dx,dy);
    }
  }

  Container.winMouseUp = function(event) {
    if (Container.BMouseDown) {
      Container.BMouseDown = false;
      Container.DragEndMousePos = Container.WinMousePos;
      d3.select("#map-svg").style("cursor", "default");
    }
  }

  Container.svgMouseWheel = function() {
    if (d3.event.wheelDelta > 0)
      Container.zoomIn();
    else
      Container.zoomOut();
    d3.event.preventDefault();
  }

  Container.svgMouseDown = function() {
    if(d3.event.which==1) {  // event.which == 1 -> left btn, 2 -> right btn
      Container.BMouseDown = true;
      Container.DragOldMousePos = Container.WinMousePos;
      Container.DragStartMousePos = Container.WinMousePos;
      d3.select("#map-svg").style("cursor", "move");
      d3.event.preventDefault();
    }
  }

  Container.mouseMove = function() {
    Container.MousePos = d3.mouse(this);
  }

  return Container;
})({});

var test = (function() {})();

// ===== What run after define everything ====
  // Map.setup();
  // Map.import("simple.map");
