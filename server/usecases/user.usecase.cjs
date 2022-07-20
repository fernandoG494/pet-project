const UserModel = require('../models/user.model.cjs');
const createError = require('http-errors');

function createUser(userData) {
    const {firstName, email, password} = userData;
    
    if(!firstName || !email || !password) {
        throw new createError(400, 'Missing required fields');
    }
    return UserModel.create(userData);
}

function getAllUsers(){
    return UserModel.find();
}

module.exports = {
    createUser,
    getAllUsers
}