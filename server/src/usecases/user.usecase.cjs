const jwt = require('../lib/jwt.lib.cjs');
const UserModel = require('../models/user.model.cjs');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const { json } = require('express');

async function login(email, password){
    const userFound = await UserModel.findOne({email});
    
    if(!userFound) {
        throw new createError(401, 'User not found');
    };
    
    const isValidPassword = await bcrypt.compare(password, userFound.password);

    if(!isValidPassword) {
        throw new createError(401, 'Invalid password');
    };

    return jwt.sign({ user: userFound._id });
};

async function createUser(userData) {
    const {firstName, lastName, email, password} = userData;
    
    if(!firstName || !lastName || !email || !password) {
        throw new createError(400, 'Missing required fields');
    }

    const hash = await bcrypt.hash(password, 10);
    userData.password = hash;

    return UserModel.create(userData);
}

async function getAllUsers(){
    const allUsers = await UserModel.find({});
    
    if(!allUsers){
        throw new createError(404, 'No users found');
    }
    return allUsers;
}

async function getUserByEmail(email){
    const userFound = await UserModel.findOne({email});
    
    if(!userFound){
        return '';
    }
    return userFound;
}

module.exports = {
    login,
    createUser,
    getAllUsers,
    getUserByEmail,
}