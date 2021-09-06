const jwt = require('jsonwebtoken');
const Users = require('../models/userModel');

class Authorization {

    static checkLoggin = async (request, response, next) => {
        try {
            //récupération du JWT du cookie
            var token = request.cookies.jwt;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            console.log("decoded user id is " + decoded.id)
            const loggedUser = await Users.getUserById(decoded.id);
            if (!loggedUser) {
                throw new Error("User cannot find!!");
            }
            request.token = token;
            request.user = loggedUser;

            next()
        } catch (e) {
            console.error(e)
            response.status(401).send({ error: 'Authentication problem!!' })
        }
    };

    static isAdmin = async (request, response, next) => {
        try {
            //récupération du JWT du cookie
            var token = request.cookies.jwt;
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            console.log("decoded user id is " + decoded.id)
            
            const loggedUser = await Users.isUserAdmin(decoded.id);
            if (!loggedUser) {
                throw new Error("User is not an admin!");
            }
            next()
        } catch (e) {
            console.error(e)
            response.status(401).send({ error: e.message })
        }
    };

}

module.exports = Authorization;