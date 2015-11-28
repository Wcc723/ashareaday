;(function($){
	document.ondragstart = function () { return false; }; 
	$.fn.a_banner_ani=function(settings){
		var _defaultSettings={
			/*css 設定*/
			width : 640,
			height : 320,
			/*css 設定*/
		animateMode: 'slider', //動畫模式 fade , slider
		seamlessMode : true ,//slider 下的無接縫模式,fade版無此功能
		startIndex : 1,			// 預設要先顯示那一張
		fadeOutSpeed : 2000,	// 淡出的速度
		fadeInSpeed : 3000,		// 淡入的速度
		animateSpeed :500 , //slider動畫速度
		defaultZ : 10,		// 預設的 z-index
		isHover :false,		//在滑鼠移入後才會開始動畫
		isAutoplay:true, // 自動撥放
		controlA : true, //數字選單是否顯示
		controlA_num :true,// 顯示數字或是圖片
		controlB : true, //左右切換選單是否顯示
		powerSlider : false ,//按壓滑動功能,不要開 開了你會怕
		speed : 2000, //自動撥放速率 , slider 的每張停留時間
		controller : '.control' ,//控制器CSS
		wrapTag:'.wrap', //動畫框預設class
		contentTag: 'ul', //動會內框
		showTag : 'li' ,//播放之圖片或內容框
		Responsive : true //自適應網頁調整
	};		
	var _settings=$.extend(_defaultSettings,settings);
	return this.each(function(){
		a_banner_ani($(this),_settings);
	});
	function a_banner_ani($this,_settings){
			// 先把其它圖片的變成透明
			var $block = $this,			
			_width = _settings.width,
			height = _settings.height,
			_fadeOutSpeed = _settings.fadeOutSpeed ,	
			_fadeInSpeed = _settings.fadeInSpeed, 	
			_defaultZ  = _settings.defaultZ, 			
			_isHover = _settings.isHover, 
			_speed = _settings.speed,
			_controlA = _settings.controlA,
			_controlA_num = _settings.controlA_num,
			_isAutoplay = _settings.isAutoplay,
			_startIndex = _settings.startIndex,
			_controller = _settings.controller,
			_showTag = _settings.showTag,
			_wrapTag = _settings.wrapTag,
			_animateSpeed = _settings.animateSpeed,
			_contentTag = _settings.contentTag,
			_seamlessMode = _settings.seamlessMode,
			_Responsive = _settings.Responsive,
			_isComplete = true;
			//載入預設值
			var _timer = new Array;
			var _showIndex = new Array;
			var _isComplete = new Array;
			var _width = new Array;
			var ad_length = new Array;
			var Reposition = new Array
						_isComplete[$this] = true;  //避免重複點擊連續觸發			
			$ad = $block.find(_showTag),_showIndex[$this] = _startIndex-1	;	// 預設要先顯示那一張
			if (_Responsive==true) {$block.css('max-width','100%');}
			//if ($block.find(".control")) $block.append("<div class='control'></div>")
			// 組出右下的按鈕		
			var str = '';			
			for(var i=0;i<$ad.length;i++){
				ad_length[$this]=$ad.length
				str += '<a href="#"><span>' +(i + 1)+'</span></a>';
			};			
			var $controlA = $block.find(_controller).html($(str)).find('a'); 
			// 當按鈕被點選時
			// 若要變成滑鼠滑入來切換時, 可以把 click 換成 mouseover
			if (_controlA == false){ $block.find(_controller).css('display', 'none') }; //隱藏數字按鈕
			if (_controlA_num == false)  $block.find(_controller).find('a span').css("display","none");//隱藏數字按鈕的數字		
			switch(_settings.animateMode){			
				case 'slider':
				var $wrap = $block.find(_wrapTag), 
				$contentTag = $wrap.find(_contentTag), 
				$showTag = $block.find(_showTag),			
			// 加入計時器, 輪播時間及控制開關
			timer = _speed,
			_stop = false;			 
			_width[$this] = $showTag.outerWidth();
			
			 //CSS標準化
			 $block.css('position','relative'); 
			 $wrap.css('position','absolute');
			 if ( $wrap.width() < 99999){ $wrap.css('width','99999px');}
			 
			 //CSS標準化end			 
			 
			 $showTag.css('float','left');
			 $contentTag.css('position','absolute');
			 $block.find(".control").css('position','absolute').css('z-index',_defaultZ+20);
			 //if(_seamlessMode==true) $contentTag.append($contentTag.html()); //無接縫模式下
			 var showTagfirst = $contentTag.find(_showTag+':first-child')
			 if(_seamlessMode==true) $contentTag.html($contentTag.html()+$contentTag.html()+$contentTag.html()); //無接縫模式下
			 
			 var _seamlessA = new Array; //判斷是否為最後一張
			 _seamlessA[$this] = false,			 
			 Reposition[$this] = 0;
			 if(_seamlessMode==true) Reposition[$this]=ad_length[$this] * _width[$this];		
			 $contentTag.animate({left:(_width[$this] * (_showIndex[$this]) + Reposition[$this]) * -1  },0);
			 $controlA.click(function(){	
				// 若動畫未完成前不接受其它新的事件
				if(!_isComplete[$this]) return false;
				_isComplete[$this] = false;
				// 取得目前點擊的號碼
				_showIndex[$this] = $(this).text() * 1 - 1;
				// 移動相對應的區域 如果是無接縫模式，將會依照無接縫規則移動
				if (_seamlessA[$this]==false){
					
					$(this).parent().parent().find($contentTag).stop().animate({left:(_width[$this] * (_showIndex[$this]) + Reposition[$this]) * -1  },_animateSpeed, function(){_isComplete[$this] = true;});	
				}else{
					if (_showIndex[$this]!=0){
						$(this).parent().parent().find($contentTag).stop().animate({left:(_width[$this] * ad_length[$this] + ((_showIndex[$this])*_width[$this])-Reposition[$this]) * -1},_animateSpeed, function(){
							_isComplete[$this] = true;
							_seamlessA[$this]=false;
							$(this).parent().parent().find($contentTag).stop().animate({left:(_width[$this] * (_showIndex[$this]) + Reposition[$this]) * -1},0);
						});
					}else{
						$(this).parent().parent().find($contentTag).stop().animate({left:(_width[$this] * ad_length[$this] + Reposition[$this]) * -1},_animateSpeed, function(){
							_isComplete[$this] = true;
							_seamlessA[$this]=false;
							$(this).parent().parent().find($contentTag).stop().animate({left:(_width[$this] * (_showIndex[$this]) + Reposition[$this]) * -1},0);
						});
					}
				}
				
				$(this).addClass('on').siblings().removeClass('on');	// 讓 a 加上 .on 
				if(!_isHover){
				// 啟動計時器
				_timer[$this] = setTimeout(autoPlayS, _speed + _fadeInSpeed);			
			}
			return false;
		}).mouseenter(function(){
						if (!_isComplete[$this])  return false;
                        _isComplete[$this] = false;
                        _showIndex[$this] = $(this).text() * 1 - 1;
                        $(this).parent().parent().find($contentTag).stop().animate({left:(_width[$this] * (_showIndex[$this]) + Reposition[$this]) * -1  },0, function() {
                            _isComplete[$this] = true;
                        });
						$(this).addClass('on').siblings().removeClass('on'); 
						
                    }).focus(function(){
			$(this).blur();
		}).eq(_showIndex[$this]).addClass('on');	
			// next image & pre image btn
			$block.find('.next,.pre').css('display','none'); //隱藏next&pre物件			
			$block.hover(function(){				
				if (_settings.controlB == true)  $block.find('.next,.pre').stop().fadeTo(500, 1)				
			},function(){
				$block.find('.next,.pre').stop().fadeTo(300, 0)
			});
			$block.find('.next').click(function(){
				if(!_isComplete[$this]) return false;
				if (_showIndex[$this]+1 < ad_length[$this]){
					_showIndex[$this]++;
					$controlA.eq(_showIndex[$this]).click();
					return false;		
				}
				else{
					if(_seamlessMode==true) _seamlessA[$this]=true;
					_showIndex[$this] = 0;
					$controlA.eq(0).click();						
					return false;	
				}
			});
			$block.find('.pre').click(function(){
				if(!_isComplete[$this]) return false;
				if (_showIndex[$this] > 0){
					_showIndex[$this] --;
					$controlA.eq(_showIndex[$this]).click();
					return false;		
				}
				else{
					if(_seamlessMode==true) _seamlessA[$this]=true;
					_showIndex[$this] = ad_length[$this]-1;
					$controlA.eq(_showIndex[$this]).click();
					return false;	
				}
				});// next image & pre image btn end ;
			
			//計時器
			$block.hover(function(){
			_isHover = true; 	// 停止計時器
			clearTimeout(_timer[$this]);
		}, function(){
			_isHover = false; 	// 啟動計時器
			_timer[$this] = setTimeout(autoPlayS, _speed);
		}) ;			
			
			function autoPlayS(){  // 自動點擊下一個
			if (_isAutoplay==true){ // 計時器判斷
				if(_isHover) return;
				_showIndex[$this] = (_showIndex[$this] + 1) % $controlA.length;
				if (_showIndex[$this]!=0) {	
					$controlA.eq(_showIndex[$this]).click();	
				}else {
					if (_seamlessMode== true) _seamlessA[$this]=true; 
					$controlA.eq(0).click();
				};
			}
		}			
			_timer[$this] = setTimeout(autoPlayS, _speed);	// 啟動計時器
			//setInterval(autoPlay, _speed); 
			
			break;
			
			case 'fade':

			$ad.css({
				opacity: 0,
				zIndex: _defaultZ - 1
			}).eq(_showIndex[$this]).css({
				opacity: 1,
				zIndex: _defaultZ
			});
			$block.find(_showTag).css('position','absolute');
			$controlA.click(function(){
				// 若動畫未完成前不接受其它新的事件
				if(!_isComplete[$this]) return false;
				_isComplete[$this] = false;
				// 取得目前點擊的號碼
				_showIndex[$this] = $(this).text() * 1 - 1;
				
				// 顯示相對應的區域並把其它區域變成透明
				$(this).parent().parent().find(_showTag).eq(_showIndex[$this]).stop().fadeTo(_fadeInSpeed, 1).css('zIndex', _defaultZ).animate({left:0},500).siblings(_showTag).stop().fadeTo(_fadeOutSpeed, 0).css('zIndex', _defaultZ - 1).animate({left:0},500 , function(){_isComplete[$this] = true;});			
				$(this).addClass('on').siblings().removeClass('on');	// 讓 a 加上 .on 
				if(!_isHover){
				// 啟動計時器
				_timer[$this] = setTimeout(autoPlayF, _speed + _fadeInSpeed);
			}
			return false;
		}).mouseenter(function(){
						if (!_isComplete[$this])  return false;
                        _isComplete[$this] = false;
                        _showIndex[$this] = $(this).text() * 1 - 1;
                        $(this).parent().parent().find(_showTag).eq(_showIndex[$this]).stop().fadeTo(0, 1).css('zIndex', _defaultZ).animate({left: 0}, 0).siblings(_showTag).stop().fadeTo(0, 0).css('zIndex', _defaultZ - 1).animate({left: 0}, 0, function() {
                            _isComplete[$this] = true;
                        });
						$(this).addClass('on').siblings().removeClass('on'); 
						
                    }).focus(function(){
			$(this).blur();
		}).eq(_showIndex[$this]).addClass('on');	
		
			$(this).find(_showTag).css('position','absolute'); //power slider 	滑動控制的圖像啟動
			

			
			//power slider 	滑動控制器
			if (_settings.powerSlider == true){
				var dragging = false;
				var iX;
				$block.find(_showTag).mousedown(function(e) {				
					dragging = true;
					iX = e.pageX - this.offsetLeft ;
					
					$block.find(_showTag).mousemove(function(e) {
						if (dragging) {
							var mouse_x = e.pageX;
							var oX = mouse_x - iX;
							$(this).css({"left":oX + "px"});			   
							
							return false;
						}});
				});
				$block.find(_showTag).bind('mouseup' ,function(e) {
					var regex=/px/gi; 
					var aa=$(this).css("left").replace(regex,"");	
					
					if(aa>0){
						if (_showIndex[$this] > 0){
							_showIndex[$this] --;
							$controlA.eq(_showIndex[$this]).click();						
						}
						else{
							_showIndex[$this] = ad_length[$this]-1;
							$controlA.eq(_showIndex[$this]).click();
						}
					}
					else {
						if (_showIndex[$this]+1 < ad_length[$this]){
							_showIndex[$this]++;
							$controlA.eq(_showIndex[$this]).click();	
						}
						else{
							_showIndex[$this] = 0;
							$controlA.eq(0).click();
						}				 
					}	
					dragging = false;
					$(this)[0].releaseCapture();
					e.cancelBubble = true;
					$block.find(_showTag).css('position','inherit');
					return false;	
				});
			}
			//power slider 	滑動控制器
			// next image & pre image btn
			$block.find('.next,.pre').css('display','none'); //隱藏next&pre物件			
			$block.hover(function(){				
				if (_settings.controlB == true)  $block.find('.next,.pre').fadeTo(500, 1)				
			},function(){
				$block.find('.next,.pre').fadeTo(300, 0)
			});
			$block.find('.next').click(function(){
				if(!_isComplete[$this]) return false;
				if (_showIndex[$this]+1 < ad_length[$this]){
					_showIndex[$this]++;
					$controlA.eq(_showIndex[$this]).click();
					return false;		
				}
				else{
					_showIndex[$this] = 0;
					$controlA.eq(0).click();
					return false;	
				}
			});
			$block.find('.pre').click(function(){
				if(!_isComplete[$this]) return false;
				if (_showIndex[$this] > 0){
					_showIndex[$this] --;
					$controlA.eq(_showIndex[$this]).click();
					return false;		
				}
				else{
					_showIndex[$this] = ad_length[$this]-1;
					$controlA.eq(_showIndex[$this]).click();
					return false;	
				}
				});// next image & pre image btn end ;
			
		//計時器
		$block.hover(function(){
			_isHover = true; 	// 停止計時器
			clearTimeout(_timer[$this]);
		}, function(){
			_isHover = false; 	// 啟動計時器
			_timer[$this] = setTimeout(autoPlayF, _speed);
		}) ;			
		
			function autoPlayF(){  // 自動點擊下一個
			if (_isAutoplay==true){ // 計時器判斷
				if(_isHover) return;
				_showIndex[$this] = (_showIndex[$this] + 1) % $controlA.length;
				$controlA.eq(_showIndex[$this]).click();
				//alert (_showIndex[$this])
			}
		}			
			_timer[$this] = setTimeout(autoPlayF, _speed);	// 啟動計時器
			//setInterval(autoPlay, _speed); 
			

			break;
			
			

			
			
		}}
	};
})(jQuery);