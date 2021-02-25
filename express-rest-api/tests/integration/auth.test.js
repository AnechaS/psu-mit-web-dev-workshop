const mongoose = require('mongoose');
const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../app');

const User = require('../../models/user');

beforeEach(async () => {
    await User.deleteMany({});

    const user = await User.create({
        email: 'admin@email.com',
        password: '123456',
        name: 'admin',
    });
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe('POST /login', () => {
    test('should return token when email and password matches', () => {
        return request(app)
            .post('/auth/login')
            .send({
                email: 'admin@email.com',
                password: '123456',
            })
            .expect('Content-Type', /json/)
            .expect(httpStatus.OK)
            .then((res) => {
                expect(res.body.email).toBe('admin@email.com');
                expect(res.body.name).toBe('admin');
            });
    });

    test('should report error when email and password are not provided', () => {
        return request(app)
            .post('/auth/login')
            .send({})
            .expect('Content-Type', /json/)
            .expect(httpStatus.BAD_REQUEST)
            .then((res) => {
                expect(res.body.message).toEqual('"email" is required');
            });
    });

    test('should report error when the email provided is not valid', () => {
        return request(app)
            .post('/auth/login')
            .send({
                email: 'admin',
                password: '123456',
            })
            .expect('Content-Type', /json/)
            .expect(httpStatus.BAD_REQUEST)
            .then((res) => {
                expect(res.body.message).toBe('"email" must be a valid email');
            });
    });

    test("should report error when email and password don't match", () => {
        return request(app)
            .post('/auth/login')
            .send({
                email: 'admin@email.com',
                password: 'abc',
            })
            .expect('Content-Type', /json/)
            .expect(httpStatus.UNAUTHORIZED)
            .then((res) => {
                expect(res.body.message).toBe('Incorrect email or password');
            });
    });
});
