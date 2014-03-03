/* jslint node: true */
'use strict';

var injector = require('connect-injector');

module.exports = function injectBrowserSync(browserSyncServer) {
  var snippet = '';

  browserSyncServer.on('init', function(api) {
    snippet = api.snippet;
  });

  return injector(function(req, res) {
    var contentType = res.getHeader('content-type');
    return contentType && (contentType.toLowerCase().indexOf('text/html') >= 0);
  }, function(callback, content, req, res) {
    var lastBody = /<\s*\/\s*body\s*>(?!(.|\n)*<\s*\/\s*body\s*>)/gi;
    var injected = content.toString().replace(lastBody, snippet + '</body>');
    callback(null, injected);
  });
};
