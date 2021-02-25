const createHttpError = require('http-errors');
const httpStatus = require('http-status');
const passport = require('passport');

const handleJWT = function (req, res, next) {
    return function (err, user, info) {
        const error = err || info;
        if (error || !user) {
            return next(createHttpError(httpStatus.UNAUTHORIZED));
        }

        req.user = user;

        return next();
    };
};

exports.authorize = function (req, res, next) {
    return passport.authenticate(
        'jwt',
        { session: false },
        handleJWT(req, res, next)
    )(req, res, next);
};
