const express = require('express');
const app = express();

const userRouter = require('./routes/user.route.cjs');
const authRouter = require('./routes/auth.routes.cjs');

app.use(express.json());
app.use('/users', userRouter);
app.use('/auth', authRouter);

app.get('/', (request, response) => {
    response.json({
        message: 'Server running...',
    });
});

module.exports = app;