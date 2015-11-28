; (function ($) {
    $.fn.pg_cart = function (settings) {
        var _defaultSettings = {
            smoothSliding: true, //Window Event
            topController: '.scrolltop',
            anchorPoint:'', //對齊物件
			scrollBtn:'.scrollBtn',
			reDistant:'5'
        };
        var _settings = $.extend(_defaultSettings, settings);
        return this.each(function () {
            pg_cart($(this), _settings);
        });
        function pg_cart($this, _settings) {
			var _selfPoint = new Array;			
			var _Point = new Array;
            var $block = $this,
            _anchorPoint = _settings.anchorPoint,
			_scrollBtn = _settings.scrollBtn,
            _topController = _settings.topController,
			_reDistant = parseInt(_settings.reDistant)
			if (_anchorPoint == '') _anchorPoint=$block;
            _Point[$this] = $(_anchorPoint).offset().top;
            _selfPoint[$this] = $block.offset().top;		
			var 	_reDistant 
            //var _kk = $(document).scrollTop();
                    var $win = $(window).scroll(function () {
                        //$($block).stop().animate({ top: $(document).scrollTop()-_Point }, 300);
                        if ($win.scrollTop() > _Point[$this]) {
                          if(_settings.smoothSliding ==true)  {
							  $($block).stop().animate({ top: $(document).scrollTop()- _selfPoint[$this]+_reDistant}, 0);
							  }
						  if(_settings.smoothSliding ==false) {
							   $($block).css({position: 'fixed', top: 0 +_reDistant});
							   }
                        } else {
                            $($block).stop().css({
                                position: 'absolute',
                                top : '0'
                            });
                        }
                    });                 
                   $block.find(_topController).click(function () {
                        //_scrollid = $(this).attr('data-scroll');
                        $('html,body').animate({ scrollTop: $('body').offset().top }, 500);
                        return false;
                   });   
				    $block.find(_scrollBtn).click(function () {
       					 _scrollid = $(this).attr('href');
       					 	$('html,body').animate({ scrollTop: $(_scrollid).offset().top }, 800);
       						 return false;
    				});
        }
    };
})(jQuery);

