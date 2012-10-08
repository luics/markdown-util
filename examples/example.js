var markdownTemplate = require('../lib');

var callback = function (html, filepath) {
  console.log('output file:');
  console.log('[path]', filepath);
  console.log('[length]', html.length);
  console.log('[html]\n', html.substr(0, 200) + '..');
};

// Use github template
var githubTpl = markdownTemplate({
  tplStyle:'github'
});
githubTpl({
  srcPath:__dirname + '/hello.md',
  destPath:__dirname + '/tmp/hello-github.html',
  title:"Markdown Cheat Sheet",
  callback:callback
});

// Use markdownpad template (Custom File)
var markdownpadTpl = markdownTemplate({
  tplCustomFilePath:__dirname + '/../lib/tpl/tpl-markdownpad.html',
  tplCustomToken:'{{MARKDOWN}}',
  tplTitleToken:'{{TITLE}}',
  tplCssToken:'{{CSS}}',
  tplCustomEncoding:'utf-8'
});
markdownpadTpl({
  srcPath:__dirname + '/hello.md',
  destPath:__dirname + '/tmp/hello-markdownpad.html',
  callback:callback,
  title: "Custom Markdown Template",
  css: "body{padding:0 10px;}"
});
