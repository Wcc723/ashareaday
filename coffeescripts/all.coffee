$ ->
	#default setup
	_articleH1Area = '.article-h1'
	_articleTimeArea = '.article-time'
	_articleArea = '.article'
	_mainMenuArea = '#main-menu'
	_WebTitle = $('title').html()
	_currnetUrl = location.hash.substring(1)
	_articleTime = null
	_articleH1 = null
	_url = null
	_jsCurrent = ''
	_cssCurrent = ''
	_showNum = 15
	randomnumber = Math.floor(Math.random()*1000)
	#
	$('head').append('<script src="js/facebook-share.js" type="text/javascript"></script>')
	#menu function
	$.ajax(
		url: 'leftmenu.html'
	).done (leftmenu)->
		$('#leftmenu').html(leftmenu)
		$('#main-menu').find('li').hide()		
		$(_mainMenuArea).find('a').click (event)->
			event.preventDefault()			
			_url = $(this).find('time').html()			
			_ajaxUrl = location.host + location.pathname + '#' + _url
			location.hash = _url
			_articleTime = $(this).find('time').html()
			_articleH1 = $(this).find('span').html()			
			titleWrite()
			loadPageModule()
			

		$('#main-menu').find('li').slice(0,_showNum).show()
		$('.more').click (event)->
			event.preventDefault()
			_showNum = _showNum + _showNum
			$('#main-menu').find('li').slice(0,_showNum).show()
		
	#aTypeFilter
		$('.aTypeFilter').find('a').click (event)->
			event.preventDefault()
			that = $(this)
			val = that.html()
			$(_mainMenuArea).find('a').each ->
				if $(this).data('styletype').match(val)
					$(this).show()
				else
					$(this).hide()


	#page load			
		if(_currnetUrl.length > 0)	
			_url = _currnetUrl
			loadPageModule()
			$(_mainMenuArea).find('a').each ->
				if $(this).find('time').html().match(_currnetUrl)
					_articleTime = $(this).find('time').html()
					_articleH1 = $(this).find('span').html()
					titleWrite()					
					
					
					
		else
			$(_mainMenuArea).find('li:first-child').find('a').click()

	#ajax page
	$('.ajax').click (event)->
		event.preventDefault()		
		_url = $(this).attr('href')	
		_articleH1 = $(this).attr('data-title')
		_ajaxUrl = location.host + location.pathname + '#' + _url		
		location.hash = _url
		titleWrite()		
		loadPageModule()	
		



	#seo unfinish
	#window.onpopstate = seoPush(event.state)
	seoPush = (evt)->
		if(history.pushState)
			state = 
				title: $('title').html(),
				url: location.href,
				_PUrl: _url		
			window.history.pushState(state, document.title, state.href)

	window.addEventListener('popstate',(evt) ->
		if (history.state)
			state = evt.state
			_currnetUrl = state._PUrl
			_articleTime = state._PUrl
			_url = state._PUrl
			_articleH1 = state.title
			location.hash = _url
			loadPageModule()
			titleWrite()
    #do something(state.url, state.title);
	, false)



	#titleWrite function
	titleWrite = (evt)->
		$('title').html(_articleH1 + ' - ' + _WebTitle)
		$(_articleH1Area).html(_articleH1)
		$(_articleTimeArea).html(_articleTime)
		


	#load page,css,js
	loadPageModule = (evt)->
		$.ajax(
			url: _url + '.html'
		).done (mainArticle)->
			$(_articleArea).html(mainArticle)
			_jsTemp = $(_articleArea).find('.js').html()	
			_cssTemp = $(_articleArea).find('.css').html()	
			#js import
			if _jsCurrent.match(_jsTemp) 
			else
				$('.js-connect').html('<script src="js/'+_jsTemp+'.js?'+randomnumber+'" type="text/javascript"></script>')
				_jsCurrent = _jsCurrent + _jsTemp 

			if _cssCurrent.match(_cssTemp) 
			else
				$('.css-connect').append('<link href="stylesheets/' + _cssTemp + '.css?'+randomnumber+'" rel="stylesheet" type="text/css"/>')
				_cssCurrent = _cssCurrent + _cssTemp 

			$('.js-storage').html(_jsCurrent)
			$('.css-storage').html(_cssCurrent)
			seoPush()

	#滾下來糊掉
	scrollPoint = $('.main-header').height()
	$win = $(window).scroll(->	  
		if $win.scrollTop() > scrollPoint
			$('.fixed-nav').addClass('blur')	
		else
			$('.fixed-nav').removeClass('blur')	
	)		
				
				


## garbage area
#$(_articleArea).load(_currnetUrl + '.html')
#$(_articleArea).load(_url+'.html')
#if _jsCurrent.match(_jsTemp) 
#else
	#$('.js-connect').html('<script src="js/'+_jsTemp+'.js" type="text/javascript"></script>')
	#_jsCurrent = _jsCurrent + _jsTemp 