# Boilerplate web app: React, Node.js, Bootstrap, Webpack

Static website boilterplate project template built using Webpack.

##### Server
* Node.js
* Express 4

##### Client JS
* Webpack
	* ESLint
* React 15.6
	* React Router (react-router-dom) 4
* ES6

#### Client Styles
* Bootstrap
* Font Awesome
* Sass

----

Build the client files dist folder 
```sh
# For dev ->
npm run build:dev
# or to watch and build on the fly
npm run watch

# For prod->
npm run build:prod
```

----
##### Required

An api key from Quandl is required for api stock data. The api key is free from  [Quandl](https://www.quandl.com/tools/api)

----


Start the server
```sh
# Add a Qunadl api key to QUANDL_API_KEY= in 1.run-debug.sh
./1.run-dev-sh

# or
QUANDL_API_KEY={key} node app.js
```

## License
[MIT](LICENSE)
