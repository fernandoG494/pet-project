const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 3,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 3,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    avatar: {
        type: String,
        default: 'https://cdn1.iconfinder.com/data/icons/website-internet/48/website_-_male_user-512.png',
    },
    role: {
        type: String,
        default: 'user'
    },
    favorites: {
        type: Array,
    }
});

module.exports = mongoose.model('User', userSchema);