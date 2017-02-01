#!/usr/bin/env node

var assert = require('assert');
var connect = require('connect');
var http = require('http');
var browserSync = require('browser-sync');
var connectBrowserSync = require('../index');
var request = require('request');

var content = '7d0b94d0-c6ec-11e4-8830-0800200c9a66';

function createApp(options = {}) {
  var bs = browserSync.create().init({ logSnippet: false, host: '127.0.0.1' });
  return connect().use(connectBrowserSync(bs, options)).use(function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><head><title>Test</title></head><body>' + content + '</body></html>');
  });
}

describe('connect-browser-sync', function () {
  it('serves a page with tags injected into <body>', function (done) {
    this.timeout(30 * 1000);

    var app = createApp();
    var port = 9001;
    var server = http.createServer(app).listen(port, function () {
      request('http://127.0.0.1:' + port, function (err, response, payload) {
        if (err) {
          assert.fail('Error in request.');
        }

        if (payload.indexOf(content) < 0) {
          assert.fail('"' + content + '" not found in response.');
        }

        if (!/<body>.*?<script[^]*?>[^]*?<\/body>/i.test(payload)) {
          assert.fail('<script> tag not found in <body>.');
        }

        done();
      });
    });
  });

  it('serves a page with tags injected into <head>', function (done) {
    this.timeout(30 * 1000);

    var app = createApp({ injectHead: true });
    var port = 9002;
    var server = http.createServer(app).listen(port, function () {
      request('http://127.0.0.1:' + port, function (err, response, payload) {
        if (err) {
          assert.fail('Error in request.');
        }

        if (payload.indexOf(content) < 0) {
          assert.fail('"' + content + '" not found in response.');
        }

        if (!/<head>.*?<script[^]*?>[^]*?<\/head>/i.test(payload)) {
          assert.fail('<script> tag not found in <head>.');
        }

        done();
      });
    });
  });
});
