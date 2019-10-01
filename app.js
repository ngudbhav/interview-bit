var createError = require('http-errors');
var express = require('express');
var flash = require('connect-flash');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');
var moment = require('moment');
var mongoose = require('mongoose');

var company = require('./models/interview');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var session = require('express-session');
const MongoStore = require('connect-mongo')(session);

var app = express();

var config = require('./config/database');
mongoose.connect(config.database);
mongoose.connection.on('connected',()=>{
  console.log('connected to database');
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
var sessionMiddleware = session({
  secret: 'uygugujbjbiubub',
  resave: false,
  saveUninitialized: false,
  //cookie: { secure: true }
});
app.use(sessionMiddleware);
app.use(flash());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  console.log(err);
  // render the error page
  //res.status(err.status || 500);
  //res.render('error');
});
const hbs = require('hbs');
const fs = require('fs');

const partialsDir = __dirname + '/views/partials';

const filenames = fs.readdirSync(partialsDir);

filenames.forEach(function (filename) {
	const matches = /^([^.]+).hbs$/.exec(filename);
	if (!matches) {
		return;
	}
	const name = matches[1];
	const template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
	hbs.registerPartial(name, template);
});
hbs.registerHelper('json', function (context) {
	return JSON.stringify(context, null, 2);
});

module.exports = app;
