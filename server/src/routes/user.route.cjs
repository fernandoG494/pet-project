const express = require('express');
const users = require('../usecases/user.usecase.cjs');
const router = express.Router();

// GET ALL USERS
router.get('/', async (req, res) => {
    try{
        const allUsers = await users.getAllUsers();
        res.json({
            massege: 'All users getted',
            users: allUsers,
        });
    }catch(error){
        error.status(error.status);
        res.json({
            message: 'Error getting all users',
            message: error.message,
        });
    }
});

// GET USER BY EMAIL
router.get('/:email', async (req, res) => {
    try{
        const user = await users.getUserMyEmail(req.params.email);
        res.json({
            massege: 'User getted',
            user,
        });
    }catch(error){
        error.status(error.status);
        res.json({
            message: 'Error getting user',
            message: error.message,
        });
    }
});


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
        res.status(error.status);
        res.json({
            message: 'Error creating user',
            error: error.message,
        });
    };
});


module.exports = router;