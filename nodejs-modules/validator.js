function isString(val) {
    return typeof val === 'string';
}

function isNumber(val) {
    return typeof val === 'number';
}

function isObject() {
    return typeof val === 'object';
}

exports.isString = isString;
exports.isNumber = isNumber;
exports.isObject = isObject;

/* module.exports = {
    isString,
    isNumber,
    isObject
}; */
