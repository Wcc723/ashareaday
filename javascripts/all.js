(function() {
  $(function() {
    var loadPageModule, titleWrite, _WebTitle, _articleArea, _articleH1, _articleH1Area, _articleTime, _articleTimeArea, _cssCurrent, _currnetUrl, _jsCurrent, _mainMenuArea, _url;

    _articleH1Area = '.article-h1';
    _articleTimeArea = '.article-time';
    _articleArea = '.article';
    _mainMenuArea = '#main-menu';
    _WebTitle = $('title').html();
    _currnetUrl = location.hash.substring(1);
    _articleTime = null;
    _articleH1 = null;
    _url = null;
    _jsCurrent = '';
    _cssCurrent = '';
    $.ajax({
      url: 'leftmenu.html'
    }).done(function(leftmenu) {
      $('#leftmenu').append(leftmenu);
      $(_mainMenuArea).find('a').click(function(event) {
        var _ajaxUrl;

        event.preventDefault();
        _url = $(this).find('time').html();
        _ajaxUrl = location.host + location.pathname + '#' + _url;
        location.hash = _url;
        _articleTime = $(this).find('time').html();
        _articleH1 = $(this).find('span').html();
        titleWrite();
        return loadPageModule();
      });
      if (_currnetUrl.length > 0) {
        _url = _currnetUrl;
        loadPageModule();
        $(_mainMenuArea).find('a').each(function() {
          if ($(this).find('time').html().match(_currnetUrl)) {
            _articleTime = $(this).find('time').html();
            _articleH1 = $(this).find('span').html();
            return titleWrite();
          }
        });
      } else {
        $(_mainMenuArea).find('li:first-child').find('a').click();
      }
      return $('.aTypeFilter').find('a').click(function(event) {
        var that, val;

        event.preventDefault();
        that = $(this);
        val = that.html();
        return $(_mainMenuArea).find('a').each(function() {
          if ($(this).data('styletype').match(val)) {
            return $(this).show();
          } else {
            return $(this).hide();
          }
        });
      });
    });
    titleWrite = function(evt) {
      $('title').html(_articleH1 + ' - ' + _WebTitle);
      $(_articleH1Area).html(_articleH1);
      return $(_articleTimeArea).html(_articleTime);
    };
    return loadPageModule = function(evt) {
      return $.ajax({
        url: _url + '.html'
      }).done(function(mainArticle) {
        var _cssTemp, _jsTemp;

        $(_articleArea).html(mainArticle);
        _jsTemp = $(_articleArea).find('.js').html();
        _cssTemp = $(_articleArea).find('.css').html();
        if (_jsCurrent.match(_jsTemp)) {

        } else {
          $('.js-connect').append('<script src="js/' + _jsTemp + '.js" type="text/javascript"></script>');
          _jsCurrent = _jsCurrent + _jsTemp;
        }
        if (_cssCurrent.match(_cssTemp)) {

        } else {
          $('.css-connect').append('<link href="stylesheets/' + '_cssTemp' + '.css"/>');
          _cssCurrent = _cssCurrent + _cssTemp;
        }
        $('.js-storage').html(_jsCurrent);
        return $('.css-storage').html(_cssCurrent);
      });
    };
  });

}).call(this);
