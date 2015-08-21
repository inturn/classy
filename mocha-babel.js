'use strict';

// Babel compiler
require('babel/register')({
  stage: 0
});

// Create JSDOM and `document`/`window` globals
const document = global.document = require('jsdom').jsdom(
  '<!doctype html><html><head></head><body></body></html>'
);
const window = global.window = document.defaultView;

// Attach props from `global` to `window`
for (let key in window) {
  if (!window.hasOwnProperty(key)) continue;
  if (key in global) continue;
  global[key] = window[key];
}
