const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const createError = require('http-errors');
const mongoose = require('mongoose');
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const config = require('./config');
const User = require('./models/user');

const routes = require('./routes');

mongoose.Promise = Promise;
mongoose.connect(config.databaseURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Configure Passport
app.use(passport.initialize());
passport.use(
    new JwtStrategy(
        {
            secretOrKey: config.jwtSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        },
        function (payload, done) {
            User.findById(payload.u, function (err, user) {
                if (err) {
                    return done(err, false);
                }
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            });
        }
    )
);

app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    const response = {
        message: err.message,
    };

    if (
        req.app.get('env') === 'development' &&
        (!err.status || err.status >= 500)
    ) {
        response.stack = err.stack;
    }

    res.status(err.status || 500);
    res.json(response);
});

module.exports = app;
