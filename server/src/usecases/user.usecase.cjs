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
    
    const newUser = {
        id: userFound._id,
        email: userFound.email,
        firstName: userFound.firstName,
        lastName: userFound.lastName,
        role: userFound.role,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt,
        token: jwt.sign({user: userFound._id}),
        favorites: userFound.favorites
    };
    
    return newUser;
};

async function createUser(userData) {
    const {firstName, lastName, email, password} = userData;
    
    if(!firstName || !lastName || !email || !password) {
        throw new createError(400, 'Missing required fields');
    }

    const hash = await bcrypt.hash(password, 10);
    
    userData.password = hash;
    userData.role = 'user';
    userData.createdAt = new Date();
    userData.updatedAt = userData.createdAt;
    userData.favorites = [];

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
    // TODO - ask Arturo about this
    const userFound = await UserModel.findOne({email});
    
    if(!userFound){
        return '';
    }
    return userFound;
}

async function addFavorite(userId, favoriteData){
    const userFound = await UserModel.findById(userId);
    
    if(!userFound){
        throw new createError(404, 'User not found');
    }
    
    // userFound.favorites.push(favoriteData);
    // userFound.updatedAt = new Date();

    const newData = await UserModel.findByIdAndUpdate(userId, favoriteData);
    return newData;
}

async function removeFavorite(userId, favoriteData){
    const userFound = await UserModel.findById(userId);
    
    if(!userFound){
        throw new createError(404, 'User not found');
    }
    
    const favoriteIndex = userFound.favorites.findIndex(favorite => favorite._id.toString() === favoriteId);
    userFound.favorites.splice(favoriteIndex, 1);
    userFound.updatedAt = new Date();
    
    return userFound;
}

module.exports = {
    login,
    createUser,
    getAllUsers,
    getUserByEmail,
    addFavorite,
    removeFavorite
};