// ./node_modules/.bin/babel-node --presets env main3.js
import AbortController, { abortableFetch } from 'abortcontroller-polyfill/dist/cjs-ponyfill';
import _fetch from 'node-fetch';
const { fetch } = abortableFetch(_fetch);

fetch("http://api.github.com")
  .then(r => r.json())
  .then(j => console.log(j))
