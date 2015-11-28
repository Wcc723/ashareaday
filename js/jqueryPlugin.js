;(function($){
 $.fn.plugin=function(opt){
  var f=$.fn.plugin;
  $.extend(f, {
    version: '0.1.0.0',
    set: {
      on: 'click',
      text: 'Hello World Default'
    }
  });
  $.extend(f, {
    api: function(){
      return 'API';
    }
  }); 
  var func=function(that, set){
    var initialize=function(){
      that.on(set.on, function(){
         sub();
      });
    }
    var sub=function(){
        //BLAHBLAHBLAH....
    }
    {
      initialize();
    }
  }
  return this.each(function(){ 
    var set=$.extend(f.set, opt);
    func($(this), set);
  });
 }
})(jQuery);