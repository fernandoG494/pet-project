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
    const userFound = await UserModel.findOne({email});
    
    if(!userFound){
        throw new createError(404, 'User not found');
    }
    return userFound;
}

async function getUserExists(email){
    const userFound = await UserModel.findOne({email});
    
    if(!userFound){
        return false;
    }
    return true;
}

async function addFavorite(userId, favoriteData){
    const {url} = favoriteData;
    const userFound = await UserModel.findById(userId);
    
    if(!userFound){
        throw new createError(404, 'User not found');
    }

    const newData = await UserModel.findByIdAndUpdate(
        {_id: userId},
        {$push: {favorites: favoriteData}},
        {new: true}
    );
    return newData;
};

async function checkFavorite(email, url){
    const userFound = await UserModel.findOne({email});
    
    if(!userFound){
        throw new createError(404, 'User not found');
    }

    const favoriteFound = userFound.favorites.find(favorite => favorite.url === url);
    
    if(!favoriteFound){
        return false;
    }
    return true;
}

async function removeFavorite(email, url){
    const userFound = await UserModel.findOne({email});
    
    if(!userFound){
        throw new createError(404, 'User not found');
    }

    const newData = await UserModel.findByIdAndUpdate(
        {_id: userFound._id},
        {$pull: {favorites: {url: url}}},
        {new: true}
    );
    return newData;
};

async function getUserFavorites(email){
    const userFound = await UserModel.findOne({email});
    
    if(!userFound){
        throw new createError(404, 'User not found');
    }

    return userFound.favorites;
}

module.exports = {
    login,
    createUser,
    getAllUsers,
    getUserByEmail,
    addFavorite,
    getUserExists,
    checkFavorite,
    removeFavorite
};