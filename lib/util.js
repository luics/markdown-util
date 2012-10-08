var fs = require('fs');

/**
 * Get generator.
 *
 * @param {object} option
 *   {string} option.tplStyle, optional, default is "github", we support:
 *     "github"
 *     "markdownpad"
 *   {string} option.tplCustomFilePath, optional
 *   {string} option.tplCustomMarkdownToken, optional, default is "{{MARKDOWN}}"
 *   {string} option.tplCustomTitleToken, optional, default is "{{TITLE}}"
 *   {string} option.tplCustomCssToken, optional, default is "{{CSS}}"
 *   {string} option.tplCustomEncoding, optional, default is "utf-8"
 */
exports = module.exports = function createMarkdownUtil(option) {
  option = option || {};
  var tplStyle = option.tplStyle || 'github',
    custom = !!option.tplCustomFilePath,
    tplFilePath = custom ? option.tplCustomFilePath : (__dirname + '/tpl/tpl-' + tplStyle + '.html'),
    tplMarkdownToken = custom ? (option.tplCustomMarkdownToken || '{{MARKDOWN}}') : '{{MARKDOWN}}' ,
    tplTitleToken = custom ? (option.tplCustomTitleToken || '{{TITLE}}') : '{{TITLE}}' ,
    tplCssToken = custom ? (option.tplCustomCssToken || '{{CSS}}') : '{{CSS}}' ,
    tplEncoding = custom ? (option.tplCustomEncoding || 'utf-8') : 'utf-8';

  var TPL = fs.readFileSync(tplFilePath, tplEncoding);

  /**
   * Generate html file for markdown file.
   *
   * @param {object} option
   *   {string} option.srcPath, required
   *   {string} option.destPath, optional
   *   {function} option.callback, optional
   *   {string} option.lib, optional node lib, default is "github-flavored-markdown" , we support:
   *     "github-flavored-markdown"
   *     "markdown"
   *     "node-markdown"
   *   {string} option.encoding, optional, default is "utf-8"
   *   {string} option.title, optional
   *   {string} option.css, optional
   */
  return function (option) {
    option = option || {};
    if (!option.srcPath) {
      throw new Error('srcPath & callback should not be empty');
    }
    var srcPath = option.srcPath,
      destPath = option.destPath || srcPath + '-' + (+new Date) + '.html',
      callback = option.callback || null,
      encoding = option.encoding || 'utf-8',
      title = option.title || '',
      css = option.css || '',
      lib = option.lib || 'github-flavored-markdown';

    // Read from srcPath
    fs.readFile(srcPath, encoding, function (err, mdtext) {
      if (err) throw err;
      var html;

      // Markdown text 2 html
      if ('github-flavored-markdown' === lib) {
        html = require(lib).parse(mdtext, "isaacs/npm");
      } else if ('markdown' === lib) {
        html = require(lib).markdown.toHTML(mdtext);
      } else if ('node-markdown' === lib) {
        html = require("node-markdown").Markdown(mdtext);
      } else {
        throw new Error(lib + ' not supported now!');
      }

      // Template Replace
      html = TPL.replace(tplMarkdownToken, html).replace(tplTitleToken, title).replace(tplCssToken, css);

      // Write 2 destPath
      fs.writeFile(destPath, html, encoding, function (err) {
        if (err) throw err;
        if (callback) callback(html, destPath);
      });
    });
  };
}

