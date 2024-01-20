const crypto = require("crypto");

const encryptPassword = function (password) {
    return crypto.createHmac('sha256', process.env.SECRET).update(password).digest('hex');
};

module.exports = {
    encryptPassword
};