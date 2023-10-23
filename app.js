var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
// 安装校验插件 npm i expressjwt
const {expressjwt} = require('express-jwt')
var indexRouter = require('./routes/index');
var testRouter = require('./routes/test')
var logInRouter = require('./routes/logIn');
var proRouter = require('./routes/pro');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressjwt({
  secret: 'ws20040810',
  algorithms: ['HS256']
}).unless({
  // 对某些不需要token验证的请求做一个处理
  // 数组形式
  path: ['/logIn', '/pro/details'
    /* 对象形式
    *{
    *url: /^\/api\/articles\/\w+/
    *methods: ['get']
    * */
  ]
}))

app.use('/index', indexRouter);
app.use('/pro', proRouter);
app.use('/logIn', logInRouter);
app.get('/test', testRouter)
// catch 404 and forward to error handler
app.use(function(err,req,res,next){
  if(err.name === 'UnauthorizedError'){
    res.status(401).json({code: 401,mag: '无效token值'})
  }else{
    next(err)
  }
})


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
