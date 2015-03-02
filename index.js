/* jslint node: true */
'use strict';

var injector = require('connect-injector');

module.exports = function injectBrowserSync(browserSync) {
  var snippet = '';

  browserSync.emitter.on('init', function(config) {
    snippet = config.options.snippet;
  });

  return injector(function(req, res) {
    var contentType = res.getHeader('content-type');
    return contentType && (contentType.toLowerCase().indexOf('text/html') >= 0);
  }, function converter(content, req, res, callback) {
    function inject() {
      var lastBody = /<\s*\/\s*body\s*>(?!(.|\n)*<\s*\/\s*body\s*>)/gi;
      var injected = content.toString().replace(lastBody, snippet + '</body>');
      callback(null, injected);
    };

    if (!snippet) {
      // We don't have the snippet from BrowserSync yet.
      // Block the response until we get it.
      browserSync.events.on('init', function(config) {
        snippet = config.options.snippet;
        inject();
      });
    } else {
      inject();
    }
  });
};
