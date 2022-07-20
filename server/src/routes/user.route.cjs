const express = require('express');
const users = require('../usecases/user.usecase.cjs');
const router = express.Router();

router.post('/create', async (req, res) => {
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