
const consoleServerBrowser = require('./index');
const writeFile = require('./write-file');
const path = require("path");
let name = path.join(__dirname, 'test.txt');
consoleServerBrowser({
    emitChannel: writeFile(name).emitChannel
});

console.log("Adrian");