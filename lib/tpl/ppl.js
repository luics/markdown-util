/**
 * Page Plugin Loader.
 *
 * @author luics<luics.king@gmail.com>
 * @date 2012-10-20
 * @license MIT
 * @future support more libs?
 *
 * Usage:
 *
 * A extension entry defined like:
 * function __ppl_main($){
 *   console.log('__ppl_main', $);
 * }
 *
 * You can define option like:
 * __ppl_main_opt = {
 *   lib: 'jquery'
 * }
 *
 * default __ppl_main_opt.lib is jQuery, now we support jQuery, tangram.
 */
;//safe in min js
(function () {
  console = window.console || {};
  console.log = console.log || function () {
  };

  console.log('PPL(Page Plugin Loader) loaded');
  var plugin = window.__ppl_main;
  if (!plugin) return;

  /**
   * Simple js loader
   */
  function loadJs(url) {
    document.write(unescape("%3Cscript src='" + url + "' type='text/javascript'%3E%3C/script%3E"));
  }

  function getLib(libName) {
    //TODO more libs
    var lib;
    if ('jquery' === libName) {
      lib = window.jQuery;
    } else if ('tangram' === libName) {//a lib from tangram.baidu.com
      lib = window.baidu;
    }
    return lib;
  }

  function main() {
    var opt = plugin.opt || {},
      libName = ((opt.lib || 'jquery') + '').toLowerCase();

    // Load jquery if necessary
    if (!getLib(libName)) {
      if ('jquery' === libName) {
        loadJs('http://code.jquery.com/jquery-latest.min.js');
      } else if ('tangram' === libName) {
        loadJs('http://fe.bdimg.com/tangram/2.0.0.1.js'); //cdn
      }
    }

    // Watch jquery loading
    var tmLoad = setInterval(function () {
      //console.log(libName, 'loading');
      if (!getLib(libName)) return;
      clearInterval(tmLoad);


      // TODO try to execute after page loaded?
      console.log(libName, 'loaded');
      plugin(getLib(libName));
    }, 10);
  }

  main();
})();