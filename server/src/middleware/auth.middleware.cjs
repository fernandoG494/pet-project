const jwt = require('../lib/jwt.lib.cjs');

function auth(request, response, next){
    try{
        const authorization = request.headers.authorization || '';
        const token = authorization.replace('Bearer ', '');
        console.log('TOKEN => ', token);
        jwt.verify(token);

        next();
    }catch(error){
        response.status(401).json({
            message: 'Unauthorized',
            error, 
        });
    };
};

module.exports = auth;