const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// const MongoStore = require('connect-mongo')(session);
const path = require('path');
// const passport = require('passport');
// const promisify = require('es6-promisify');
// const flash = require('connect-flash');
const expressValidator = require('express-validator');
const errorHandlers = require('./handlers/errorHandlers');
const routes = require('./routes');
const morgan = require('morgan');
// const jsonwebtoken = require('jsonwebtoken');
// require('./handlers/passport');

// Create our Express app for our API Server
const app = express();

// Logger
app.use(morgan('dev'));

// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static('client/build'));

// Exposes a bunch of methods for validating data. Used heavily on userController.validateRegister
app.use(expressValidator());

// populates req.cookies with any cookies that came along with the request
app.use(cookieParser());

// Sessions allow us to store data on visitors from request to request
// This keeps users logged in and allows us to send flash messages
app.use(session({
  secret: process.env.SECRET,
  key: process.env.KEY,
  resave: false,
  saveUninitialized: false,
  // store: new MongoStore({ mongooseConnection: mongoose.connection }),
}));

// // Passport JS is what we use to handle our logins
// app.use(passport.initialize());
// app.use(passport.session());

// // The flash middleware let's us use req.flash('error', 'Shit!'), which will then pass that message to the next page the user requests
// app.use(flash());

// pass variables to our templates + all requests
app.use((req, res, next) => {
  // res.locals.flashes = req.flash();
  res.locals.user = req.user || null;
  res.locals.currentPath = req.path;
  next();
});

// promisify some callback based APIs
// app.use((req, res, next) => {
//   req.login = promisify(req.login, req);
//   next();
// });

// JWT Authentication Middleware
// app.use((req, res, next) => {
//   if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
//     jsonwebtoken.verify(req.headers.authorization.split(' ')[1], process.env.JWT_SECRET, (err, decode) => {
//       if (err) req.user = undefined;
//       req.user = decode;
//       next();
//     });
//   } else {
//     req.user = undefined;
//     next();
//   }
// });

// Add routes, both API and view
app.use(routes);

// If that above routes didnt work, we 404 them and forward to error handler
app.use(errorHandlers.notFound);

// One of our error handlers will see if these errors are just validation errors
app.use(errorHandlers.flashValidationErrors);

// Otherwise this was a really bad error we didn't expect! Shoot eh
if (app.get('env') === 'development') {
  /* Development Error Handler - Prints stack trace */
  app.use(errorHandlers.developmentErrors);
}

// production error handler
app.use(errorHandlers.productionErrors);


// done! we export it so we can start the site in start.js
module.exports = app;

