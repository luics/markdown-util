module = QUnit.module;

QUnit.module('markdown-util');

test("import", function () {
  ok(require('../lib'), "index.js");
  ok(require('../lib/util.js'), "util.js");
});

var util = require('../lib');
//test("arguments", function () {
//
//});
//
//test("result", function () {
//
//});

