var express = require('express'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    strategy = require('passport-local').Strategy,
    session = require('express-session'),
    crypto = require('crypto'),
    flash = require('connect-flash');

var db = require('./db/db.js');

var routes = require('./routes/index');
var users = require('./routes/users');
var login = require('./routes/login');
var profile = require('./routes/profile');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(logger('combined'));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({secret: 'keyboard word', resave: false, saveUninitialized: false}));
app.use(flash());

passport.use(new strategy(function (username, password, done) {
        db.findOne(username, function (err, user) {
            var alertMessage = 'The login or password is incorrect';
            if (err) {
                console.log(err);
                return done(err);
            }
            if (!user) {
                return done(null, false, {message: alertMessage});
            }
            var hash = crypto.createHash('md5');
            hash.update(password);
            if (user.hash !== hash.digest('hex')) {
                return done(null, false, {message: alertMessage});
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, cb) {
    cb(null, user.id); //todo Do we need to use process.nextTick here?
});

passport.deserializeUser(function (id, cb) {
    db.findById(id, function (err, user) {
        if (err) {
            return cb(err);
        }
        cb(null, user);
    });
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
app.use('/login', login);
app.use('/profile', profile);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
