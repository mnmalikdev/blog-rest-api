var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose=require('mongoose');
mongoose.connect('mongodb://localhost:27017/blog_DB',function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log('connected to db');
    }
});
//cookies
var app = express();
var session = require('express-session');
var FileStore = require('session-file-store')(session);
app.use(session({
    name: 'session-id',
    secret: 'my-secret',
    saveUninitialized: false,
    resave: false,
    store: new FileStore()
}));

var indexRouter = require('./app_server/routes/index');
var usersRouter = require('./app_server/routes/users');
var blogRouter = require('./app_server/routes/blogs');
var adminRouter = require('./app_server/routes/admin');
var publisherRouter = require('./app_server/routes/publisher');
// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/', indexRouter);
app.use('/users', usersRouter);
//defining auth function

app.use('/blogs',blogRouter);
//app.use(auth);
app.use('/admin',adminRouter);
app.use('/publisher',publisherRouter);
app.use(express.static(path.join(__dirname, 'public')));
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

//listen on port 3000
app.listen(3000,function(){
    console.log('listening on port 3000');
})
module.exports = app;
