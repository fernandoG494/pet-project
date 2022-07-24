const express = require('express');
const cors = require('cors');
const app = express();

const userRouter = require('./routes/user.route.cjs');
const authRouter = require('./routes/auth.routes.cjs');

app.use(express.json());
app.use(cors());

app.use('/users', userRouter);
app.use('/auth', authRouter);

app.get('/', (request, response) => {
    response.json({
        message: 'Server running...',
    });
});

module.exports = app;