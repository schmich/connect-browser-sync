/* jslint node: true */
'use strict';

var injector = require('connect-injector');

function browserSyncInject(browserSyncServer) {
  var snippet = '';

  browserSyncServer.on('init', function(api) {
    snippet = api.snippet;
  });

  var inject = injector(function(req, res) {
    var header = res.getHeader('content-type');
    return header && (header.indexOf('text/html') >= 0);
  }, function(callback, data, req, res) {
    var lastBody = /<\s*\/\s*body\s*>(?!(.|\n)*<\s*\/\s*body\s*>)/gi;
    var injected = data.toString().replace(lastBody, snippet + '\n</body>');
    callback(null, injected);
  });

  return inject;
}

module.exports = browserSyncInject;

