const string = require('./string');
const { isString, isNumber } = require('./validator');
const _ = require('lodash');

console.log(string(['x', 'v']));
console.log(isString('s'));
console.log(isNumber('s'));

const person = [
    {
        name: 'Goku',
    },
    {
        name: 'Goten',
    },
];

console.log(_.find(person, { name: 'Goku' }));
