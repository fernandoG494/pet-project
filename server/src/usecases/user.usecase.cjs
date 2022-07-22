const jwt = require('../lib/jwt.lib.cjs');
const UserModel = require('../models/user.model.cjs');
const createError = require('http-errors');
const bcrypt = require('bcrypt');

async function login(email, password){
    const userFound = await UserModel.findOne({email});
    console.log(password);
    
    if(!userFound) {
        throw createError(401, 'User not found');
    };
    
    console.log('>>', password, userFound);
    const isValidPassword = await bcrypt.compare(password, userFound.password);

    if(!isValidPassword) {
        throw createError(401, 'Invalid password');
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

function getAllUsers(){
    return UserModel.find();
}

module.exports = {
    createUser,
    getAllUsers,
    login
}