const express = require('express');
const users = require('../usecases/user.usecase.cjs');
const router = express.Router();
const middleware = require('../middleware/auth.middleware.cjs');

// /users
// CREATE USER
router.post('/', async (req, res) => {
    console.log('POST /users')
    const userData = req.body;

    try{
        const userExists = await users.getUserExists(userData.email);
        
        if(!userExists){
            const newUser = await users.createUser(userData);
            res.status(201).json({
                message: 'User created successfully',
                user: newUser,
            });
        }else{
            res.status(409).json({
                message: 'User already exists',
            });
        }
    }catch(error){
        res.status(error.status || 500);
        res.json({
            message: 'Error creating user',
            error: error.message,
        });
    };
});

// GET ALL USERS
router.get('/', async (req, res) => {
    console.log('GET /users')
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

// ADD FAVORITE
router.patch('/addFav', middleware, async (req, res) => {
    console.log('POST /users/addFav');

    const email = req.body.email;
    const favoriteData = req.body.pictureInfo;
    
    const {_id} = await users.getUserByEmail(email);
    const userId = _id.toString();

    try{
        const user = await users.addFavorite(userId, favoriteData);
        res.json({
            message: 'Favorite added successfully',
            user: user,
        });
    }catch(error){
        // error.status(500 || 'Unknow error');
        res.json({
            message: 'Error adding favorite',
            message: error.message,
        });
    };
});

// REMOVE FAVORITE
router.post('/removeFav', middleware, async (req, res) => {
    console.log('POST /users/removeFav')
    const userId = req.params.id;
    const favoriteId = req.body.favoriteId;

    try{
        const user = await users.removeFavorite(userId, favoriteId);
        res.json({
            message: 'Favorite removed successfully',
            user: user,
        });
    }catch(error){
        error.status(error.status || 500);
        res.json({
            message: 'Error removing favorite',
            message: error.message,
        });
    };
});

module.exports = router;