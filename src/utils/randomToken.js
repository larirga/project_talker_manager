const crypto = require('crypto');

const randomToken = () => {
    const token = crypto.randomBytes(8).toString('hex');

    return token;
};

module.exports = randomToken;