var md2html = require('../lib').md2html;

md2html({
  srcPath:__dirname + '/hello.md',
  destPath:__dirname + '/hello.html',
  lib:'github-flavored-markdown',
//  lib:'markdown',
//  lib:'node-markdown',
  callback:function (html, filepath) {
    console.log('output file:');
    console.log('[path]', filepath);
    console.log('[length]', html.length);
    console.log('[html]\n', html.substr(0, 200) + '..');
  }

});