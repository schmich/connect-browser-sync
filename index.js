/* jslint node: true */
'use strict';

var injector = require('connect-injector');

module.exports = function injectBrowserSync(browserSync, options) {
  var snippet = '';
  var options = options || {}
  var tag = '</body>'
  var regex = /<\s*\/\s*body\s*>(?!(.|\n)*<\s*\/\s*body\s*>)/gi

  if (options.injectHead === true) {
      tag = '</head>'
      regex = /<\/head>/gi
  }

  browserSync.emitter.on('service:running', function(data) {
    if (!snippet) {
      snippet = data.options.get('snippet');
    }
  });

  return injector(function(req, res) {
    var contentType = res.getHeader('content-type');
    return contentType && (contentType.toLowerCase().indexOf('text/html') >= 0);
  }, function converter(content, req, res, callback) {
    function inject() {
      var lastBody = regex
      var injected = content.toString().replace(lastBody, snippet + tag);
      callback(null, injected);
    };

    if (!snippet) {
      // We don't have the snippet from BrowserSync yet.
      // Block the response until we get it.
      browserSync.emitter.on('service:running', function(data) {
        if (!snippet) {
          snippet = data.options.get('snippet');
        }
        inject();
      });
    } else {
      inject();
    }
  });
};
