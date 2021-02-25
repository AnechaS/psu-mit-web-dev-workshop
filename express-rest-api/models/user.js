const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const httpStatus = require('http-status');
const createHttpError = require('http-errors');

const userSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 6,
            maxlength: 128,
        },
        name: {
            type: String,
        },
    },
    {
        timestamps: true,
        toJSON: {
            transform: (doc, ret) => {
                delete ret.password;
                return ret;
            },
        },
    }
);

userSchema.pre('save', async function save(next) {
    try {
        if (!this.isModified('password')) return next();

        const hash = await bcrypt.hash(this.password, 10);
        this.password = hash;

        return next();
    } catch (error) {
        return next(error);
    }
});

userSchema.methods.passwordMatches = function (password) {
    return bcrypt.compare(password, this.password);
};

userSchema.statics.get = async function (id) {
    if (mongoose.Types.ObjectId.isValid(id)) {
        let user = await this.findById(id).exec();
        if (user) {
            return user;
        }
    }

    throw new createHttpError(httpStatus.NOT_FOUND, 'Object not found.');
};

module.exports = mongoose.model('User', userSchema);
