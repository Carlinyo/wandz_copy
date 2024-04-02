const fs = require('fs');
const path = require('path');

const { name } = require('./../../package.json');

const directoryPath = path.resolve(__dirname, '..', 'output', 'unit', 'coverage');
const src = path.resolve(directoryPath, 'cobertura-coverage.xml');
const dest = path.resolve(directoryPath, `${name.split('/')[1]}-coverage.xml`);

fs.renameSync(src, dest);
