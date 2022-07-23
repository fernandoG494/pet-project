const express = require('express');
const {login} = require('../usecases/user.usecase.cjs');
const httpError = require('http-errors');

const router = express.Router();

// POST LOGIN
router.post('/login', async (request, response) => {
    console.log('POST /auth/login')
    try {
        const {email, password} = request.body;

        if(!email || !password) {
            throw new httpError(400, 'Missing required fields');
        }

        const token = await login(email, password);

        response.json({
            message: 'User logged in successfully',
            token,
        });
    } catch (error) {
        response.status(error.status || 500);
        response.json({
            message: 'Error logging in user',
            error: error.message,
        });
    }
});

module.exports = router;