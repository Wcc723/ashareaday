$ ->
	colorObj =
		white: '#fff'
		black: '#333333'
		red: '#E60044'
		orange: '#FF9023'
		green: '#1FC79E'
		blue: '#3474B8'
		purple: '#8248B8'
	colorCtrl = $('#colorBar')
	thisColor = ''
	canvasWidth = $('#canvas').width()
	canvasHeight = $('#canvas').height()


	#build	
	changeColor = (evt)->		
		colorCtrl.find('a').on 'click', (evt)->
			#evt.preventDefault()
			thisColor = $(this).attr('data-color')
			$(this).addClass('current').siblings().removeClass('current')
			buildStage(thisColor)
	buildColorBar = ->
		for i of colorObj	
			#colorCtrl.append colorObj[i]
			colorCtrl.append "<a data-color=" + colorObj[i] + " style=\"background-color:" + colorObj[i] + "\"></a>"
		changeColor()	
	buildColorBar()
	
	
	#canvas build
	stage = new Kinetic.Stage(
		container: 'canvas'
		width: canvasWidth
		height: canvasHeight
	)
	layer = new Kinetic.Layer()

	buildStage = (thisColor)->
		rect = new Kinetic.Rect(
			x: 0
			y: 0
			width: stage.getWidth()
			height: stage.getHeight()
			fill: thisColor
		)
		layer.add(rect)
		stage.add(layer)



	#pen event
	penCtrl = $('#pen')
	penEvet = false
	penCtrl.on('click', ->		
		if penEvet is false
			$(this).addClass('current')
			penEvet = true	
			penMoveListener()
		else
			$(this).removeClass('current')
			penEvet = false
			delete penMoveListener()
			delete penMove()
			#事件刪不掉
			
	)
	penMoveListener = ->
		canvas.addEventListener('mousedown', (evt)->
			canvas.addEventListener('mousemove', penMove, false)
		)
		canvas.addEventListener('mouseup', ->
			canvas.removeEventListener('mousemove', penMove, false)
		)

	penMove = (evt)->
		mousePos = getMousePos(canvas, evt)
		drawPen(mousePos.x,mousePos.y)
	drawPen = (x,y)->		
		penLayer = new Kinetic.Layer()
		
		_pos.push(x,y)
		console.log(_pos)
		penLine = new Kinetic.Line(
			points: [x,y],
			stroke: thisColor,
			strokeWidth: 8,
			lineCap: 'round',
			lineJoin: 'round',
			draggable: true
		)
		penLayer.add(penLine)
		stage.add(penLayer)

	getMousePos = (canvas, evt)-> 
		canvasRect = canvas.getBoundingClientRect()		
		x: evt.clientX - canvasRect.left
		y: evt.clientY - canvasRect.top
