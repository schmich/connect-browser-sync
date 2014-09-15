#!/usr/bin/env node

var assert = require('assert');
var connect = require('connect');
var http = require('http');
var browserSync = require('browser-sync');
var connectBrowserSync = require('../index');
var request = require('request');

var bs = browserSync.init([], { debugInfo: false, host: '127.0.0.1' });
var app = connect().use(connectBrowserSync(bs)).use(function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body>ok</body></html>');
});

var port = 9001;
var server = http.createServer(app).listen(port, function() {
  request('http://127.0.0.1:' + port, function(err, response, body) {
    if (err) {
      assert.fail('Error in request.');
    }

    if (!/ok/i.test(body)) {
      assert.fail('"ok" not found in response.');
    }

    if (!/<\s*script/i.test(body)) {
      assert.fail('<script> tag not found in response.');
    }

    process.exit();
  });
});

setTimeout(function() {
  assert.fail('Test did not complete within 30 seconds.');
}, 30 * 1000);
