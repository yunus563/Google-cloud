const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session')
const passport = require('passport')
const dotenv = require('dotenv')
const isAuthenticated = require('./middleware/isauthenticate')
dotenv.config()


const indexRouter = require('./routes/index');
const chatRouter = require('./routes/chat');
const authRouter = require('./routes/auth');


const app = express();
const db = require('./helper/db')()


app.use(session({
  secret: process.env.SESSION_MAXFIY_KALIT ,
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 720000 }
}))



app.use('/', indexRouter);
app.use('/auth',authRouter)
app.use('/chat', isAuthenticated, chatRouter);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));


app.use(passport.initialize())
app.use(passport.session())




// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
