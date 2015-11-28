$ ->
	#val
	_DefaultContry = '高雄市'
	_mainList = '#main-list'
	_listItemC = 'listItem'
	_listItem = '.'+_listItemC+''
	_dataItem = ''
	_listControl = '<tr class="control"><td colspan="2" class="stationSel"><a href="#">測站資訊</a></td><td colspan="2" class="mapSel"><a href="#">地圖顯示</a></td></tr>'

	#json
	epaAPI =  'http://opendata.epa.gov.tw/ws/Data/UV/?$orderby=PublishAgency&$skip=0&$top=1000&format=json&callback=?'
	_SiteName = []
	list = ''
	epaData = $.getJSON( epaAPI, ->
		format: 'json'
	).done((msg)->
		console.log(msg)
		$.each(msg, (i, item)->
			if(item.County == _DefaultContry)
				console.log(item)
				list = '<tr><td>'+ item.SiteName+'</td><td>'+ item.PublishTime+'</td><td>'+ item.TWD97Lon+'</td><td>'+ item.UVI+'</td></tr>'				
				$('.itemlist').append(list)

		)	
	)
