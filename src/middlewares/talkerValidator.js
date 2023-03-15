const validRate = require('../utils/validRate');

const isMissingName = (req, res, next) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({
            message: 'O campo "name" é obrigatório',
            });
    }
    return next();
};

const isValidName = (req, res, next) => {
    const NUMBER_THREE = 3;
    const { name } = req.body;
    if (name.length < NUMBER_THREE) {
    return res.status(400).json({
        message: 'O "name" deve ter pelo menos 3 caracteres',
    });
    }
    return next();
};

const isMissingAge = (req, res, next) => {
    const { age } = req.body;
    if (!age) {
        return res.status(400).json({
            message: 'O campo "age" é obrigatório',
            });
    }
    return next();
};

const isValidAge = (req, res, next) => {
    const { age } = req.body;
    const NUMBER_EIGHTEEN = 18;
    if (typeof age !== 'number') {
    return res.status(400).json({
        message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
    }

    if (!Number.isInteger(age) || age < NUMBER_EIGHTEEN) {
        return res.status(400).json({
            message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
        });
    }

    return next();
};

const isMissingTalk = (req, res, next) => {
    const { talk } = req.body;

    if (!talk) {
        return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
    }
    return next();
};

const isMissingWatched = (req, res, next) => {
    const { talk: { watchedAt } } = req.body;

    if (!watchedAt) {
        return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
    }
    return next();
};

const isValidWatched = (req, res, next) => {
    const { talk: { watchedAt } } = req.body;
    const dateRegex = /^([0-2][0-9]|(3)[0-1])(\/)(((0)[0-9])|((1)[0-2]))(\/)\d{4}$/i;

    if (!dateRegex.test(watchedAt)) {
        return res.status(400)
        .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
    }
    return next();
};

const isMissingRate = (req, res, next) => {
    const { talk: { rate } } = req.body;
    if (!rate && rate !== 0) {
        return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
    }
    if (!validRate(rate)) {
        return res.status(400)
    .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
    return next();
};

const isValidRate = (req, res, next) => {
    const { talk: { rate } } = req.body;
    if (!validRate(rate)) {
        return res.status(400)
    .json({ message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }
    return next();
};

module.exports = {
    isMissingName,
    isValidName,
    isMissingAge,
    isValidAge,
    isMissingTalk,
    isMissingWatched,
    isValidWatched,
    isMissingRate,
    isValidRate,
};