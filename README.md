# connect-browser-sync

[Connect](https://github.com/senchalabs/connect) middleware for [BrowserSync](https://github.com/shakyShane/browser-sync).

Use this middleware to automatically inject the necessary BrowserSync `<script>` tags into your HTML pages.

## Installation

```
npm install browser-sync --save-dev
npm install connect-browser-sync --save-dev
```

## Usage

In `app.js`:

```javascript
var express = require('express');
var app = express();

// Other configuration...

if (app.get('env') == 'development') {
  var browserSync = require('browser-sync');
  var bs = browserSync.init([], { debugInfo: false });
  app.use(require('connect-browser-sync')(bs));
}

// Routes and handlers...
```

- TODO: Warning about minimum supported verison of BrowserSync (0.5.7).
- TODO: Warning about necessary closing `body` tag.
- TODO: Mention non-dependency on browser-sync (this way, the end-user defines which version to use).
- TODO: Mention that `app.use` must come before routes that should be injected.

## Example

TODO

## License

Copyright &copy; 2014 Chris Schmich
<br>
MIT License, See [LICENSE](LICENSE) for details.
