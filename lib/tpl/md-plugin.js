/**
 * Markdown Plugin based on PPL(Page Plugin Loader).
 *
 * @author luics<luics.king@gmail.com>
 * @date 2012-10-20
 * @license MIT
 *
 * Feature:
 * Add contents for page changed from markdown formation.
 *
 * Usage:
 * You can define an option:
 * __markdown_ppl_opt = {
 *   contents: ['h2', 'h3', 'h4'],
 *   top: ['h2', 'h3', 'h4', 'h5', 'h6']
 * }
 */
;//safe in min js
(function () {
  console = window.console || {};
  console.log = console.log || function () {
  };
  function fm() {
    var len = arguments.length;
    if (len == 0) {
      return '';
    } else if (len == 1) {
      return arguments[0];
    }

    var res = arguments[0], i;
    for (i = 1; i < len; ++i) {
      var re = new RegExp('\\{' + (i - 1) + '\\}', 'g');
      res = res.replace(re, arguments[i]);
    }
    return res;
  }

  console.log('Markdown Plugin loaded');
  /**
   * PPL(Page Plugin Loader) entry
   * @param $ js lib reference, default is window.jQuery
   */
  window.__ppl_main = function ($) {
    console.log('Markdown Plugin', $);
    var opt = window.__markdown_ppl_opt || {},
      contents = opt.contents || ['h2', 'h3', 'h4'],
      top = opt.top || ['h2', 'h3', 'h4', 'h5', 'h6'];

    if (contents.length > 0) addContents($, contents);
    if (top.length > 0) addTop($, top);
  }

  /**
   * PPL(Page Plugin Loader) option
   */
  window.__ppl_main_opt = {
    lib:'jquery'
  }

  /**
   * Add Contents for page
   */
  function addContents($, contents) {
    console.log('addContents', contents);
    var body = document.getElementsByTagName('BODY');
    if (!body) return;

    var $body = $(body[0]),
      contentsStyle = [
        'position:fixed;right:1em;top:1em;',
        'padding:0.5em;min-width:120px;',
        'font-size:90%;line-height:18px;',
        'border:1px solid #aaa;background: #F9F9F9;'
      ].join(''),
      html = [],
      order = [],
      hash = [];

    for (var i = 0; i < contents.length; ++i) {
      order[i] = 0;
      hash[i] = '';
    }

    function indexOf(tag) {
      for (var i = 0; i < contents.length && contents[i].toLowerCase() !== tag; ++i);
      return i;
    }

    $(contents.join(',')).each(function (i, obj) {
      var index = indexOf(obj.tagName.toLowerCase());
      order[index]++;
      hash[index] = $(obj).text();
      for (var j = index + 1; j < contents.length; ++j) {
        // Clear low level order
        order[j] = 0;
        hash[j] = '';
      }
      var anchor = hash.slice(0, index + 1).join('-');
      //anchor = '__id_' + tag + Math.floor(9999999 * Math.random());

      // Add anchor
      $(obj).append(fm('<a name="{0}" style="color:#333;"></a>', anchor));
      // Add contents item
      html.push(fm('<div style="padding-left:{0}em;"><a href="#{2}" style="text-decoration:none;">{1}</a></div>',
        index * 1.5, order.slice(0, index + 1).join('.') + ' ' + hash[index], anchor));
    });

    var $contentsWrap = $(fm(['<div style="{0}">',
        '<div style="text-align: center;height:22px;line-height:22px;">',
        '<b>Contents</b> <a href="javascript:;">hide</a>',
        '</div>',
        '<div>{1}</div>',
        '</div>'].join(''), contentsStyle, html.join(''))).prependTo($body),
      $toggle = $contentsWrap.find('> :first').find('> :last'),
      $contents = $contentsWrap.find('> :last');
    console.log($contentsWrap, $toggle, $contents);

    $toggle.click(function () {
      $contents.slideToggle();
      $toggle.html($toggle.html() === 'show' ? 'hide' : 'show');
    });
  }

  /**
   * Add "to Top" link for mark h
   */
  function addTop($, top) {
    console.log('addTop', top);

    $(top.join(',')).each(function (i, obj) {
      //$(obj).append(' <a href="#" style="display:none;font-size: 12px;color: #333;">Top</a>');
      $(obj).prepend(['<div style="position: relative;width: 1px;">',
        '<a href="javascript:;" style="position:absolute;width:1.2em;left:-1.2em;font-size:0.8em;display:inline-block;visibility:hidden;color:#333;text-align:left;text-decoration: none;">',
        '&#10022;</a>',
        '</div>'].join(''));

      var $prefix = $(this).find(':first').find(':first');
      //var $top = $(this).find('a:last');
      //console.log($prefix, $top);
      var rawCol = $(obj).css('background-color');
      $(obj).mouseover(
        function () {
          $prefix.css('height', $(this).css('height'));
          $prefix.css('line-height', $(this).css('line-height'));
          $prefix.css('visibility', 'visible');
          $(this).css('background-color', '#FFF8D7');
        }).mouseout(function () {
          $prefix.css('visibility', 'hidden');
          $(this).css('background-color', rawCol);
        });
    });
  }

  /**
   * Load ppl.js
   */
  document.write(unescape("%3Cscript src='http://raw.github.com/luics/markdown-util/master/lib/tpl/ppl.js' type='text/javascript'%3E%3C/script%3E"));
})();
