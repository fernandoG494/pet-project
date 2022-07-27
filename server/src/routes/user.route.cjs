const express = require('express');
const users = require('../usecases/user.usecase.cjs');
const router = express.Router();
const auth = require('../middleware/auth.middleware.cjs');

// /users
// CREATE USER
router.post('/', async (req, res) => {
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
router.patch('/addFav', auth, async (req, res) => {
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

// CHECK FAVORITE
router.post('/checkFav', async (req, res) => {
    const email = req.body.email;
    const url = req.body.url;

    try{
        const exists = await users.checkFavorite(email, url);
        res.json({
            message: 'Favorite checked successfully',
            exists: exists,
        });
    }catch(error){
        // error.status(500 || 'Unknow error');
        res.json({
            message: 'Error checking favorite',
            message: error.message,
        });
    };
});

// REMOVE FAVORITE
router.patch('/removeFav', async (req, res) => {
    const email = req.body.email;
    const url = req.body.url;

    try{
        const user = await users.removeFavorite(email, url);
        res.json({
            message: 'Favorite removed successfully',
            user: user,
        });
    }catch(error){
        // error.status(500 || 'Unknow error');
        res.json({
            message: 'Error removing favorite',
            message: error.message,
        });
    };
});

// GET USER FAVS
router.post('/getFavs', async (req, res) => {
    const email = req.body.email;

    try{
        const user = await users.getUserByEmail(email);
        res.json({
            message: 'User getted successfully',
            user: user,
        });
    }catch(error){
        // error.status(500 || 'Unknow error');
        res.json({
            message: 'Error getting user',
            message: error.message,
        });
    };
});

// GET USER BY EMAIL
router.post('/getUserByEmail', async (req, res) => {
    const email = req.body.email;

    try{
        const user = await users.getUserByEmail(email);
        res.json({
            message: 'User getted successfully',
            user: user,
        });
    }catch(error){
        // error.status(500 || 'Unknow error');
        res.json({
            message: 'Error getting user',
            message: error.message,
        });
    };
});

router.post('/removeUser', async (req, res) => {
    const email = req.body.email;

    try{
        const user = await users.deleteUser(email);
        res.json({
            message: 'User removed successfully',
            user: user,
        });
    }catch(error){
        // error.status(500 || 'Unknow error');
        res.json({
            message: 'Error removing user',
            message: error.message,
        });
    };
});

module.exports = router;