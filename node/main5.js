const { AbortController, abortableFetch } = require('abortcontroller-polyfill/dist/cjs-ponyfill');
const _nodeFetch = require('node-fetch');
const { fetch, Request } = abortableFetch({fetch: _nodeFetch, Request: _nodeFetch.Request});

const controller = new AbortController();
const signal = controller.signal;
controller.abort();
fetch(new Request("http://api.github.com", {signal}))
  .then(r => r.json())
  .then(j => console.log(j))
  .catch(err => {
      if (err.name === 'AbortError') {
          console.log('aborted');
      }
  })
