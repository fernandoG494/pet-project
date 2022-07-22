const jwt = require('../lib/jwt.lib.cjs');

function auth(request, response, next){
    try{
        const autorization = request.headers.authorization || '';
        const token = autorization.replace('Bearer ', '');
        const payload = jwt.verify(token);

        next();
    }catch(error){
        console.log("error >>", error);
        response.status(401).json({
            message: 'Unauthorized',
            error, 
        });
    };
};

module.exports = auth;