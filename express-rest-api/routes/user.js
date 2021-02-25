const express = require('express');
const httpStatus = require('http-status');
const createHttpError = require('http-errors');
const Joi = require('joi');
const { authorize } = require('../middlewares');
const queryParser = require('../utils/queryParser');
const buildQuery = require('../utils/buildQuery');

const User = require('../models/user');

const router = express.Router();

router.get('/', authorize, async function (req, res) {
    const isCount = parseInt(req.query.count);
    const queryParsed = queryParser(req.query);

    const promises = [];
    if (!(queryParsed.limit === 0 && isCount)) {
        if (!queryParsed.limit) {
            queryParsed.limit = 100;
        }
        promises[0] = buildQuery(User.find(), queryParsed);
    }

    if (isCount) {
        promises[1] = buildQuery(User.countDocuments(), queryParsed);
    }

    const [documents, count] = await Promise.all(promises);

    const response = {
        results: documents || [],
        count,
    };

    res.json(response);
});

router.post('/', async function (req, res, next) {
    try {
        const body = req.body;

        const validate = Joi.object({
            email: Joi.string().email().required(),
            password: Joi.string().min(6).max(128).required(),
            name: Joi.string().max(50),
        }).validate(body);
        if (validate.error) {
            return next(
                createHttpError(httpStatus.BAD_REQUEST, validate.error.message)
            );
        }

        const user = await User.create(body);
        return res.status(httpStatus.CREATED).json(user);
    } catch (error) {
        return next(error);
    }
});

router.get('/me', authorize, async function (req, res) {
    res.json(req.user);
});

router.get('/:id', authorize, async function (req, res, next) {
    try {
        const { id } = req.params;
        const user = await User.get(id);
        res.json(user);
    } catch (error) {
        return next(error);
    }
});

router.put('/:id', authorize, async function (req, res, next) {
    try {
        const { id } = req.params;
        const body = req.body;

        const validate = Joi.object({
            email: Joi.string().email(),
            password: Joi.string().min(6).max(128),
            name: Joi.string().max(50),
        }).validate(body);
        if (validate.error) {
            return next(
                createHttpError(httpStatus.BAD_REQUEST, validate.error.message)
            );
        }

        let user = await User.get(id);
        user = Object.assign(user, req.body);
        user = await user.save();
        res.json(user);
    } catch (error) {
        return next(error);
    }
});

router.delete('/:id', authorize, async function (req, res, next) {
    try {
        const { id } = req.params;
        const user = await User.get(id);
        user.remove();
        res.status(httpStatus.NO_CONTENT).end();
    } catch (error) {
        return next(error);
    }
});

module.exports = router;
