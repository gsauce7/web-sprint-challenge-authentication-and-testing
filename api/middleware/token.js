const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../secrets/index');


module.exports = function makeToken(user) {

    const payload = {
        id: user.id,
        username: user.username,
    };

    const options = {
        expiresIn: "1000s",
    }
    return jwt.sign(payload, JWT_SECRET, options);

}