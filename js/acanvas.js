(function() {
  $(function() {
    var buildColorBar, buildStage, canvasHeight, canvasWidth, changeColor, colorCtrl, colorObj, drawPen, getMousePos, layer, penCtrl, penEvet, penMove, penMoveListener, stage, thisColor;

    colorObj = {
      white: '#fff',
      black: '#333333',
      red: '#E60044',
      orange: '#FF9023',
      green: '#1FC79E',
      blue: '#3474B8',
      purple: '#8248B8'
    };
    colorCtrl = $('#colorBar');
    thisColor = '';
    canvasWidth = $('#canvas').width();
    canvasHeight = $('#canvas').height();
    changeColor = function(evt) {
      return colorCtrl.find('a').on('click', function(evt) {
        thisColor = $(this).attr('data-color');
        $(this).addClass('current').siblings().removeClass('current');
        return buildStage(thisColor);
      });
    };
    buildColorBar = function() {
      var i;

      for (i in colorObj) {
        colorCtrl.append("<a data-color=" + colorObj[i] + " style=\"background-color:" + colorObj[i] + "\"></a>");
      }
      return changeColor();
    };
    buildColorBar();
    stage = new Kinetic.Stage({
      container: 'canvas',
      width: canvasWidth,
      height: canvasHeight
    });
    layer = new Kinetic.Layer();
    buildStage = function(thisColor) {
      var rect;

      rect = new Kinetic.Rect({
        x: 0,
        y: 0,
        width: stage.getWidth(),
        height: stage.getHeight(),
        fill: thisColor
      });
      layer.add(rect);
      return stage.add(layer);
    };
    penCtrl = $('#pen');
    penEvet = false;
    penCtrl.on('click', function() {
      if (penEvet === false) {
        $(this).addClass('current');
        penEvet = true;
        return penMoveListener();
      } else {
        $(this).removeClass('current');
        penEvet = false;
        delete penMoveListener();
        return delete penMove();
      }
    });
    penMoveListener = function() {
      canvas.addEventListener('mousedown', function(evt) {
        return canvas.addEventListener('mousemove', penMove, false);
      });
      return canvas.addEventListener('mouseup', function() {
        return canvas.removeEventListener('mousemove', penMove, false);
      });
    };
    penMove = function(evt) {
      var mousePos;

      mousePos = getMousePos(canvas, evt);
      return drawPen(mousePos.x, mousePos.y);
    };
    drawPen = function(x, y) {
      var penLayer, penLine;

      penLayer = new Kinetic.Layer();
      _pos.push(x, y);
      console.log(_pos);
      penLine = new Kinetic.Line({
        points: [x, y],
        stroke: thisColor,
        strokeWidth: 8,
        lineCap: 'round',
        lineJoin: 'round',
        draggable: true
      });
      penLayer.add(penLine);
      return stage.add(penLayer);
    };
    return getMousePos = function(canvas, evt) {
      var canvasRect;

      canvasRect = canvas.getBoundingClientRect();
      return {
        x: evt.clientX - canvasRect.left,
        y: evt.clientY - canvasRect.top
      };
    };
  });

}).call(this);
