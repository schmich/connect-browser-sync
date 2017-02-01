# connect-browser-sync

[Connect](https://github.com/senchalabs/connect) middleware for [BrowserSync](https://github.com/shakyShane/browser-sync).

Use this middleware to automatically inject the necessary BrowserSync `<script>` tags into your HTML pages. Alternatively, you can integrate BrowserSync with your app using [Gulp](https://github.com/shakyShane/gulp-browser-sync) or [Grunt](https://github.com/shakyShane/grunt-browser-sync).

[![NPM version](https://badge.fury.io/js/connect-browser-sync.svg)](https://npmjs.org/package/connect-browser-sync)
[![Build Status](https://travis-ci.org/schmich/connect-browser-sync.svg?branch=master)](https://travis-ci.org/schmich/connect-browser-sync)
[![Dependency Status](https://gemnasium.com/schmich/connect-browser-sync.svg)](https://gemnasium.com/schmich/connect-browser-sync)

## Usage

Assuming you will only use BrowserSync in development:

```
npm install browser-sync --save-dev
npm install connect-browser-sync --save-dev
```

```javascript
// app.js
var express = require('express');
var app = express();

// Other configuration...

if (app.get('env') === 'development') {
  var browserSync = require('browser-sync');
  var bs = browserSync.create().init({ logSnippet: false });
  app.use(require('connect-browser-sync')(bs));
}


// Routes and handlers...
```

See the [BrowserSync API docs](http://www.browsersync.io/docs/api/) for initialization options.

## Notes

- You must use version 2.0.0 or greater of the `browser-sync` package.
- The `app.use` statement must come before any handlers that you want to integrate with BrowserSync. This includes both dynamic route handlers and static asset handlers.
- Injection only happens on responses with a `Content-Type` header of `text/html` and content containing a `</body>` or `</head>` tag.

## Compatibility

### BrowserSync 1.x

If you need to use BrowserSync 1.x, use [version 1.0.2](https://github.com/schmich/connect-browser-sync/releases/tag/v1.0.2) of this package.

### Turbolinks

Turbolinks and BrowserSync can conflict (see [turbolinks#147](https://github.com/turbolinks/turbolinks/issues/147) and [browser-sync#977](https://github.com/BrowserSync/browser-sync/issues/977)). As a workaround, you can inject the BrowserSync tags into `<head>` instead.

To inject the tags into `<head>`, specify `{ injectHead: true }`:

```javascript
if (app.get('env') === 'development') {
  var browserSync = require('browser-sync');
  var bs = browserSync.create().init({ logSnippet: false });
  app.use(require('connect-browser-sync')(bs, { injectHead: true }));
}
```

## Example

See the [example](example) folder.

## License

Copyright &copy; 2014 Chris Schmich
<br>
MIT License, See [LICENSE](LICENSE) for details.
