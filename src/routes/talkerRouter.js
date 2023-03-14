const { Router } = require('express');

const talkerRouter = Router();

// const fs = require('fs').promises;

const path = require('path');
const readJsonData = require('../utils/readJsonData');

const talkerPath = path.resolve(__dirname, '../talker.json');

talkerRouter.get('/', async (_req, res) => {
    try {
        const data = await readJsonData(talkerPath);
        return res.status(200).json(data);
    } catch (e) {
        res.status(200).send({ message: `error: ${e}` });
    }
});

module.exports = talkerRouter;