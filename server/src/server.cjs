const express = require('express');
const app = express();
const userRouter = require('./routes/user.route.cjs');

app.use(express.json());

app.use('/users', userRouter);

app.get('/', (request, response) => {
    response.json({
        message: 'Hello World!',
    });
});

module.exports = app;