const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const compression = require('compression'); // Compression middleware, compress responses from all routes
const helmet = require('helmet'); // Protect against web vunerablities, http headers, https://www.npmjs.com/package/helmet

const index = require('./routes/index');
const users = require('./routes/users');
const api = require('./routes/api');

const app = express();


app.use(compression());
app.use(helmet());

// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Serve static assets normally
app.use(express.static(path.join(__dirname, '/dist')));

// Define routes
app.use('/', index);
app.use('/users', users);
app.use('/api', api);


// Catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });

// Single page app method for 404s, return the static html file
// Handles all routes so you do not get a not found error
app.get('*', function (req, res, next) {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});


// Error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});


console.log('port: '+ port);

app.listen(port);
console.log('Server started on port ' + port);
