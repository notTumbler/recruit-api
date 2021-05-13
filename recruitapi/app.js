var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose')
var bodyParser = require('body-parser')


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

var http = require('http')
var server = http.createServer(app);
// require('./socketIo/test')(server)
require('./socketIo/socketIoServer')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.urlencoded({ 'limit':'1000000kb'}))
app.use(bodyParser.json({ 'limit':'1000000kb'}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

mongoose.set('useFindAndModify',false)
mongoose.connect('mongodb://localhost:27017/recruit',{
  useNewUrlParser:true, useUnifiedTopology:true
});

const conn = mongoose.connection;

conn.on('connected',() => {
  console.log('数据库recruit连接成功~');
  console.log(`http://localhost:3333`);
})

server.listen('3333')
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

// module.exports = app;
