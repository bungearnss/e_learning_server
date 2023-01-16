var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

/* require routes */
var About = require('./routers/About');
var User = require('./routers/User');
var Login = require('./routers/Login')

//open port 13000
var server = app.listen(13000, function () {
    console.log('Ready on port %d', server.address().port);
});

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());

/* use routes */
app.use('/About', About);
app.use('/User', User);
app.use('/Login',Login);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

module.exports = app;