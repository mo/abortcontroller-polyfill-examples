Notes:

unfetch has an open bug about IE8 + CORS not working:
https://github.com/developit/unfetch/issues/106

I wasn't able to get unfetch to work on IE8 even though their README claims IE8 support.
When I tried the "fetch-ie8" npm package instead of unfetch it worked though (but still
no CORS, hence the /response.json URL in the example).

Also keep in mind that github-fetch polyfill only supports IE 10+

To run the example, use:

npm install -g http-server
http-server -p 3000
