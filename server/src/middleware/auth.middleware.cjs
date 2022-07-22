const jsonwebtoken = require('jsonwebtoken');

function auth(request, response, next){
    try{
        const autorization = request.headers.authorization || '';
        const token = autorization.replace('Bearer ', '');
        const payload = jsonwebtoken.verify(token);

        console.log("payload >>", payload);
        request.user = payload;
        next();
    }catch(error){
        console.log("error >>", error);
        response.status(401).json({
            error: 'Not authorized'
        });
    };
};

module.exports = auth;