jest.mock('../config', () => ({
    databaseURI: `mongodb://localhost:27777/jest`,
    port: 7777,
    jwtSecret: 'yoo',
}));

// beforeAll(function () {});
