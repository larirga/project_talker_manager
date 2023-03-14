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
        res.status(500).send({ message: `error: ${e}` });
    }
});

talkerRouter.get('/:id', async (req, res) => {
    try {    
        const { id } = req.params;
        const talkerJson = await readJsonData(talkerPath);
        const findIdTalker = talkerJson.find((talk) => talk.id === +(id));
        if (!findIdTalker) {
            return res.status(404).send({ message: 'Pessoa palestrante não encontrada' });
        }
        return res.status(200).json(findIdTalker);
    } catch (e) {
        res.status(500).send({ message: `error: ${e}` });
    } 
});

module.exports = talkerRouter;