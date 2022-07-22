const express = require('express');
const users = require('../usecases/user.usecase.cjs');
const router = express.Router();
const middleware = require('../middleware/auth.middleware.cjs');

// CREATE USER
router.post('/', async (req, res) => {
    try{
        const userData = req.body;
        const newUser = await users.createUser(userData);
        res.json({
            message: 'User created successfully',
            user: newUser,
        });
    }catch(error){
        res.status(error.status || 500);
        res.json({
            message: 'Error creating user',
            error: error.message,
        });
    };
});

// GET ALL USERS
router.get('/', middleware, async (req, res) => {
    try{
        const allUsers = await users.getAllUsers();
        res.json({
            massege: 'All users getted',
            users: allUsers,
        });
    }catch(error){
        error.status(error.status || 500);
        res.json({
            message: 'Error getting all users',
            message: error.message,
        });
    }
});

module.exports = router;