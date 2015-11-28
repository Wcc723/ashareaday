; (function ($) {
    $.fn.aTypeFilter = function (settings) {
        var _defaultSettings = {
            dataName: 'styletype'
        };
        var _settings = $.extend(_defaultSettings, settings);
        return this.each(function () {
            aTypeFilter($(this), _settings);
        });
        function aTypeFilter($this, _a) {		
			var $block = $this	;
			var data=_a.dataName
			
			 $block.find('a').click(function(){
				 var that=null, val=null;
				that=$(this);
				val=that.html();
				$('section').each(				
					function(){
						if(!$(this).data(data)) return
						if($(this).data(data).match(val)) 
							$(this).show();
						else 
							$(this).hide();
						})
				})	;		
        }
    };
})(jQuery);
