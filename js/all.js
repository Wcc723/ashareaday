(function() {
  $(function() {
    var $win, loadPageModule, randomnumber, scrollPoint, seoPush, titleWrite, _WebTitle, _articleArea, _articleH1, _articleH1Area, _articleTime, _articleTimeArea, _cssCurrent, _currnetUrl, _jsCurrent, _mainMenuArea, _showNum, _url;

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
    _showNum = 15;
    randomnumber = Math.floor(Math.random() * 1000);
    $('head').append('<script src="js/facebook-share.js" type="text/javascript"></script>');
    $.ajax({
      url: 'leftmenu.html'
    }).done(function(leftmenu) {
      $('#leftmenu').html(leftmenu);
      $('#main-menu').find('li').hide();
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
      $('#main-menu').find('li').slice(0, _showNum).show();
      $('.more').click(function(event) {
        event.preventDefault();
        _showNum = _showNum + _showNum;
        return $('#main-menu').find('li').slice(0, _showNum).show();
      });
      $('.aTypeFilter').find('a').click(function(event) {
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
      if (_currnetUrl.length > 0) {
        _url = _currnetUrl;
        loadPageModule();
        return $(_mainMenuArea).find('a').each(function() {
          if ($(this).find('time').html().match(_currnetUrl)) {
            _articleTime = $(this).find('time').html();
            _articleH1 = $(this).find('span').html();
            return titleWrite();
          }
        });
      } else {
        return $(_mainMenuArea).find('li:first-child').find('a').click();
      }
    });
    $('.ajax').click(function(event) {
      var _ajaxUrl;

      event.preventDefault();
      _url = $(this).attr('href');
      _articleH1 = $(this).attr('data-title');
      _ajaxUrl = location.host + location.pathname + '#' + _url;
      location.hash = _url;
      titleWrite();
      return loadPageModule();
    });
    seoPush = function(evt) {
      var state;

      if (history.pushState) {
        state = {
          title: $('title').html(),
          url: location.href,
          _PUrl: _url
        };
        return window.history.pushState(state, document.title, state.href);
      }
    };
    window.addEventListener('popstate', function(evt) {
      var state;

      if (history.state) {
        state = evt.state;
        _currnetUrl = state._PUrl;
        _articleTime = state._PUrl;
        _url = state._PUrl;
        _articleH1 = state.title;
        location.hash = _url;
        loadPageModule();
        return titleWrite();
      }
    }, false);
    titleWrite = function(evt) {
      $('title').html(_articleH1 + ' - ' + _WebTitle);
      $(_articleH1Area).html(_articleH1);
      return $(_articleTimeArea).html(_articleTime);
    };
    loadPageModule = function(evt) {
      return $.ajax({
        url: _url + '.html'
      }).done(function(mainArticle) {
        var _cssTemp, _jsTemp;

        $(_articleArea).html(mainArticle);
        _jsTemp = $(_articleArea).find('.js').html();
        _cssTemp = $(_articleArea).find('.css').html();
        if (_jsCurrent.match(_jsTemp)) {

        } else {
          $('.js-connect').html('<script src="js/' + _jsTemp + '.js?' + randomnumber + '" type="text/javascript"></script>');
          _jsCurrent = _jsCurrent + _jsTemp;
        }
        if (_cssCurrent.match(_cssTemp)) {

        } else {
          $('.css-connect').append('<link href="stylesheets/' + _cssTemp + '.css?' + randomnumber + '" rel="stylesheet" type="text/css"/>');
          _cssCurrent = _cssCurrent + _cssTemp;
        }
        $('.js-storage').html(_jsCurrent);
        $('.css-storage').html(_cssCurrent);
        return seoPush();
      });
    };
    scrollPoint = $('.main-header').height();
    return $win = $(window).scroll(function() {
      if ($win.scrollTop() > scrollPoint) {
        return $('.fixed-nav').addClass('blur');
      } else {
        return $('.fixed-nav').removeClass('blur');
      }
    });
  });

}).call(this);
