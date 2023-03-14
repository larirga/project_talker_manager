const { Router } = require('express');

const loginRouter = Router();

const { isMissingEmail, isValidEmailbyRegex, 
        isMissingPassword, isValidPassword } = require('../middlewares/loginValidator');

const randomToken = require('../utils/randomToken');

const validators = [isMissingEmail, isValidEmailbyRegex, isMissingPassword, isValidPassword];

loginRouter.post('/', ...validators, async (_req, res) => {
    try {
        const token = randomToken();

        return res.status(200).json({ token });
    } catch (e) {
        res.status(500).send({ message: `error: ${e}` });
    }
});

module.exports = loginRouter;