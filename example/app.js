var express = require('express');
var http = require('http');
var routes = require('./routes');
var app = express();

app.set('views', __dirname);
app.set('view engine', 'ejs');

if (app.get('env') === 'development') {
  var browserSync = require('browser-sync');
  var bs = browserSync.create().init({ logSnippet: false });
  app.use(require('connect-browser-sync')(bs));
}

app.get('/', routes.index);

var port = 3000;
http.createServer(app).listen(port, function() {
  console.log('Listening on port ' + port + '...');
});
