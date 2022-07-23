const express = require('express');
const app = express();

const userRouter = require('./routes/user.route.cjs');
const authRouter = require('./routes/auth.routes.cjs');

app.use(express.json());

app.use(function(req, res, next){
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.get('/', (request, response) => {
    response.json({
        message: 'Server running...',
    });
});

module.exports = app;