const fs = require('fs').promises;

const path = require('path');

const readJsonData = require('./readJsonData');

const talkerPath = path.join(__dirname, '../talker.json');

const insertTalkerFile = async (talker) => {
    try {
    const arrayTalker = await readJsonData(talkerPath);
    arrayTalker.push(talker);

    return await fs.writeFile(talkerPath, JSON.stringify(arrayTalker));
    } catch (error) {
    const err = new Error('Error writing file');
    err.statusCode = 500;
    throw err;
    }
};

const updateTalkerFile = async (talker, id) => {
    try {
        const { name, age, talk } = talker;
        const arrayTalker = await readJsonData(talkerPath);
        const findTalker = arrayTalker.find((t) => t.id === +id);
        if (!findTalker) {
            return false;
        }
        findTalker.name = name;
        findTalker.age = age;
        findTalker.talk = talk;
        await fs.writeFile(talkerPath, JSON.stringify(arrayTalker));
        return findTalker;
    } catch (e) {
        const err = new Error('Error update file');
        err.statusCode = 500;
        return false;
    }
};

const deleteTalkerFile = async (id) => {
    const arrayTalker = await readJsonData(talkerPath);
    const filterFile = arrayTalker.filter((t) => t.id !== +id);
    await fs.writeFile(talkerPath, JSON.stringify(filterFile));
};  

module.exports = {
    insertTalkerFile,
    updateTalkerFile,
    deleteTalkerFile,
};