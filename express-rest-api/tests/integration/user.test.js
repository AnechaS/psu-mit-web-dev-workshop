const mongoose = require('mongoose');
const request = require('supertest');
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const config = require('../../config');
const app = require('../../app');

const User = require('../../models/user');

let authToken;

beforeEach(async () => {
    await User.deleteMany({});

    const user = await User.insertMany([
        {
            email: 'admin@email.com',
            password: '123456',
            name: 'admin',
        },
        {
            email: 'user@email.com',
            password: '123456',
            name: 'user',
        },
    ]);

    authToken = jwt.sign({ u: user[0]._id }, config.jwtSecret);
});

afterAll(async () => {
    await mongoose.disconnect();
});

describe('GET /users/me', () => {
    test("should get the logged user's info", () => {
        return request(app)
            .get('/users/me')
            .set('Authorization', `Bearer ${authToken}`)
            .expect('Content-Type', /json/)
            .expect(httpStatus.OK)
            .then((res) => {
                expect(res.body.email).toBe('admin@email.com');
                expect(res.body.name).toBe('admin');
            });
    });

    test.todo(
        'should report error without stacktrace when authToken is expired'
    );
});

describe('GET /users', () => {
    test('should get users', () => {
        return request(app)
            .get('/users')
            .set('Authorization', `Bearer ${authToken}`)
            .expect(httpStatus.OK)
            .then((res) => {
                expect(res.body.results[0].email).toBe('admin@email.com');
                expect(res.body.results[0].name).toBe('admin');
                expect(res.body.results[0].password).toBeUndefined();
            });
    });

    test('should filter users', () => {
        return request(app)
            .get('/users')
            .query({ where: JSON.stringify({ name: 'user' }) })
            .set('Authorization', `Bearer ${authToken}`)
            .expect(httpStatus.OK)
            .then((res) => {
                expect(res.body.results[0].email).toBe('user@email.com');
            });
    });

    test('should count users', () => {
        return request(app)
            .get('/users')
            .query({ count: '1' })
            .set('Authorization', `Bearer ${authToken}`)
            .expect(httpStatus.OK)
            .then((res) => {
                expect(res.body.results[0].email).toBe('admin@email.com');
                expect(res.body.results[1].email).toBe('user@email.com');
                expect(res.body.count).toBe(2);
            });
    });

    test('should count and limit zero', () => {
        return request(app)
            .get('/users')
            .query({
                count: '1',
                limit: 0,
                where: JSON.stringify({ name: 'user' }),
            })
            .set('Authorization', `Bearer ${authToken}`)
            .expect(httpStatus.OK)
            .then((res) => {
                expect(res.body.count).toBe(1);
                expect(res.body.results).toEqual([]);
            });
    });
});

describe('POST /users', () => {
    test('should create a new user', () => {
        return request(app)
            .post('/users')
            .send({
                email: 'bb@email.com',
                name: 'bb',
                password: '123456',
            })
            .set('Authorization', `Bearer ${authToken}`)
            .expect('Content-Type', /json/)
            .expect(httpStatus.CREATED)
            .expect((res) => {
                expect(res.body.email).toBe('bb@email.com');
                expect(res.body.name).toBe('bb');
            });
    });

    test('should error when email and password are not provided', () => {
        return request(app)
            .post('/users')
            .send()
            .set('Authorization', `Bearer ${authToken}`)
            .expect('Content-Type', /json/)
            .expect(httpStatus.BAD_REQUEST)
            .expect((res) => {
                expect(res.body.message).toBe('"email" is required');
            });
    });

    test('should error when email provided is not valid', () => {
        return request(app)
            .post('/users')
            .send({
                email: 'bb',
                password: '123456',
            })
            .set('Authorization', `Bearer ${authToken}`)
            .expect('Content-Type', /json/)
            .expect(httpStatus.BAD_REQUEST)
            .expect((res) => {
                expect(res.body.message).toBe('"email" must be a valid email');
            });
    });

    test.todo(
        'should error when duplicate email' /* , () => {
        return request(app)
            .post('/users')
            .send({
                email: 'user@email.com',
                password: '123456',
            })
            .set('Authorization', `Bearer ${authToken}`)
            .expect('Content-Type', /json/)
            .expect(httpStatus.BAD_REQUEST)
            .expect((res) => {
                expect(res.body.message).toBe('"email" is already exists');
            });
    } */
    );

    test('should error when password is not provided', () => {
        return request(app)
            .post('/users')
            .send({
                email: 'bb@email.com',
            })
            .set('Authorization', `Bearer ${authToken}`)
            .expect('Content-Type', /json/)
            .expect(httpStatus.BAD_REQUEST)
            .expect((res) => {
                expect(res.body.message).toBe('"password" is required');
            });
    });
});

describe('PUT /users/:id', () => {
    test('should update user', async () => {
        const obj = await User.findOne({});
        return request(app)
            .put(`/users/${obj._id}`)
            .send({ name: 'bb' })
            .set('Authorization', `Bearer ${authToken}`)
            .expect('Content-Type', /json/)
            .expect(httpStatus.OK)
            .then((res) => {
                expect(res.body.email).toBe(obj.email);
                expect(res.body.name).toBe('bb');
            });
    });

    test('should error when invalid value', async () => {
        const obj = await User.findOne({});
        return request(app)
            .put(`/users/${obj._id}`)
            .send({ email: 'bb' })
            .set('Authorization', `Bearer ${authToken}`)
            .expect('Content-Type', /json/)
            .expect(httpStatus.BAD_REQUEST)
            .then((res) => {
                expect(res.body.message).toBe('"email" must be a valid email');
            });
    });

    test.todo('should error when duplicate email');
});

describe('DELETE /users/:id', () => {
    test('should delete user', async () => {
        const obj = await User.findOne({});
        await request(app)
            .delete(`/users/${obj._id}`)
            .set('Authorization', `Bearer ${authToken}`)
            .expect(httpStatus.NO_CONTENT);

        await expect(User.findById(obj._id)).resolves.toBeNull();
    });
});
