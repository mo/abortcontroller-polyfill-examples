global.fetch = require('node-fetch');
require('abortcontroller-polyfill');

fetch("http://api.github.com")
  .then(r => r.json())
  .then(j => console.log(j))
