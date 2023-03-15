const { Router } = require('express');

const talkerRouter = Router();

// const fs = require('fs').promises;

const path = require('path');

const { isMissingName, 
    isValidName, 
    isMissingAge, 
    isValidAge, 
    isMissingTalk, 
    isMissingWatched, 
    isValidWatched, 
    isMissingRate, 
    isValidRate } = require('../middlewares/talkerValidator');

const tokenValidator = require('../middlewares/tokenValidator');

const insertTalkerFile = require('../utils/handleTalker');

const readJsonData = require('../utils/readJsonData');

const talkerPath = path.resolve(__dirname, '../talker.json');

const validators = [
    tokenValidator,
    isMissingName,
    isValidName,
    isMissingAge,
    isValidAge,
    isMissingTalk,
    isMissingWatched,
    isValidWatched,
    isMissingRate,
    isValidRate];

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

talkerRouter.post('/', ...validators, async (req, res) => {
    try {
        const { name, age, talk: { watchedAt, rate } } = req.body;
        const talkerJson = await readJsonData(talkerPath);
        const newTalker = {
            id: talkerJson.length + 1,
            name,
            age,
            talk: { watchedAt, rate },
        };
        await insertTalkerFile(newTalker);
        return res.status(201).json(newTalker);
    } catch (e) {
        res.status(500).send({ message: `error: ${e}` });
    }
});

module.exports = talkerRouter;