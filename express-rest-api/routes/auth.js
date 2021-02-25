const express = require('express');
const Joi = require('joi');
const createHttpError = require('http-errors');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const config = require('../config');

const User = require('../models/user');

const router = express.Router();

function generateToken(user) {
    const token = jwt.sign({ u: user._id }, config.jwtSecret, {
        expiresIn: '30d',
    });

    return token;
}

router.post('/login', async function (req, res, next) {
    try {
        const body = req.body;

        const validate = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
        }).validate(body);
        if (validate.error) {
            return next(
                createHttpError(httpStatus.BAD_REQUEST, validate.error.message)
            );
        }

        const user = await User.findOne({ email: body.email });
        if (user && (await user.passwordMatches(body.password))) {
            const response = Object.assign({}, user.toJSON(), {
                token: generateToken(user),
            });

            return res.json(response);
        }

        return next(
            createHttpError(
                httpStatus.UNAUTHORIZED,
                'Incorrect email or password'
            )
        );
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
