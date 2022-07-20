const express = require('express');
const app = express();
const useRouter = require('./routes/user.route.cjs');

app.use(express.json());

app.use('/users', useRouter);

app.get('/', (request, response) => {
    response.json({
        message: 'Hello World!',
    });
});

module.exports = app;