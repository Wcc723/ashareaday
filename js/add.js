require([
  'jquery-2.0.2.min',
  'aTypeFilter',
  'run_prettify',
  'aCart',
  'demo/a_banner'
], function () {
  console.log($);
  //aCart 
  $('.cart').pg_cart({
	    	SmoothSliding: true, //Window Event
            TopController: '.scrolltop',
            scrollBtn:'._scrollBtn',
            AnchorPoint:'.cart'
	    });
		
	//aTypeFilter 
	    $('.aTypeFilter').aTypeFilter({
	});
      
  //abanner
  $('.a_banner').a_banner_ani({
      animateMode: 'slider' 
    });
	
});


	
//pjax
	 /*$.pjax({
        selector: '.pjax',
        container: '#pjax-container', //內容替換的容器
        show: 'fade',  //展現的動畫，支持默認和fade, 可以自定義動畫方式，這里為自定義的function即可。
        cache: false,  //是否使用緩存
        storage: true,  //是否使用本地存儲
        titleSuffix: '', //標題後綴
        filter: function(){},
        callback: function(){}
    })*/