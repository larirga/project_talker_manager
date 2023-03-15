const fs = require('fs').promises;

const path = require('path');

const readJsonData = require('./readJsonData');

const talkerPath = path.resolve(__dirname, '../talker.json');

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

module.exports = insertTalkerFile;