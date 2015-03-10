#!/usr/bin/env node

var assert = require('assert');
var connect = require('connect');
var http = require('http');
var browserSync = require('browser-sync');
var connectBrowserSync = require('../index');
var request = require('request');

var content = '7d0b94d0-c6ec-11e4-8830-0800200c9a66';

var bs = browserSync({ logSnippet: false, host: '127.0.0.1' });
var app = connect().use(connectBrowserSync(bs)).use(function(req, res) {
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body>' + content + '</body></html>');
});

describe('connect-browser-sync', function() {
  it('serves a page with injected tags', function(done) {
    this.timeout(30 * 1000);

    var port = 9001;
    var server = http.createServer(app).listen(port, function() {
      request('http://127.0.0.1:' + port, function(err, response, body) {
        if (err) {
          assert.fail('Error in request.');
        }

        if (body.indexOf(content) < 0) {
          assert.fail('"' + content + '" not found in response.');
        }

        if (!/<script.*>/i.test(body)) {
          assert.fail('<script> tag not found in response.');
        }

        done();
      });
    });
  });
});
