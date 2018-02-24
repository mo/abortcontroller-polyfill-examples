const { AbortController, abortableFetch } = require('abortcontroller-polyfill/dist/cjs-ponyfill');
const { fetch } = abortableFetch({fetch: require('node-fetch')});

fetch("http://api.github.com")
  .then(r => r.json())
  .then(j => console.log(j))
