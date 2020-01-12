
var path = require('path');
var appDir = path.resolve(__dirname);
var dir = appDir.split('/');
const utils = require('./utils');
// const moment = require('moment');
dir = dir.slice(0, dir.length - 2);
dir = dir.join('/');
module.exports = function (options) {
    let group = {};
    let _emitChannels = options.broadcast;
    console = new Proxy(console, {
        get: (target, p)=>{
            return function(...args) {
                let date = new Date();
                const dateText = utils.parseDateTime(date);
                let stack;
                let path;
                if (p !== 'warn'){
                    switch (p) {
                        case 'error':
                            let text = args[0];
                            if(text === 'middleware'){
                                if (args[2].status) {
                                    let url = args[1].split('?')[0];
                                    path = `${url} ${getPath(args[2])}`;
                                    args = [args[2]];
                                } else {
                                    const err = args[2];
                                    const textargs = new String(err.stack);
                                    let splitText = textargs.split("\n");
                                    if (splitText.length > 1) {
                                        path = regex(err.stack, 1);
                                    } else {
                                        path = splitText[0];
                                    }
                                    args = [err.stack];
                                }
                            } else {
                                text = new String(text);
                                let splitText = text.split("\n");
                                if (splitText.length > 1) {
                                    let file = JSON.stringify(splitText[1]);
                                    path = file.slice(8,file.length - 1);
                                } else {
                                    path = splitText[0];
                                }
                            }
                            printLog(dateText, path);
                            _emitChannels(path, p, args, date);
                            return target[p].apply(this, args);
                        case 'groupBy':{
                            let key = args[0];
                            let data = args.slice(1,args.length);
                            let stack = new Error().stack;
                            group[key] = group[key] ? group[key] : [];
                            let path = regex(stack);
                            group[key].push({
                                date: date,
                                prop: 'log',
                                file: path,
                                args: data
                            });
                            break;}
                        case 'groupByEnd':{
                            let key = args[0];
                            let data = args.slice(1,args.length);
                            let stack = new Error().stack;
                            let path = regex(stack);
                            if(group[key]){
                                group[key].push({
                                    date: date,
                                    prop: 'log',
                                    file: path,
                                    args: data
                                });
                                _emitChannels(`Group ${key}`, "group", group[key], date);
                                console.warn('\x1b[35m%s\x1b[33m',`<==== \tGroup By "${key}" \t====>`);
                                group[key].forEach((val)=>{
                                    const dateTime = utils.parseDateTime(val.date);
                                    printLog(dateTime , val.file);
                                    console.warn('\x1b[32m%s\x1b[32m',val.args);
                                });
                                console.warn('\x1b[35m%s\x1b[33m',`<==== \tEnd Group "${key}" \t====>`);
                                delete group[key];
                            }
                            break;}
                        default:
                            stack = new Error().stack;
                            path = regex(stack);
                            printLog(dateText, path);
                            _emitChannels(path, p, args, date);
                            return target[p].apply(this, args);
                    }

                } else {
                    return target[p].apply(this, args);
                }
            }
        }
    });

    function regex(stack, index = 2){
        let regExp = /\(([^)]+)\)/;
        let pathFile = stack.split("\n")[index];
        let reg = regExp.exec(pathFile);
        let path;
        if(reg){
            path=reg[1];
        }else{
            let file = JSON.stringify(pathFile);
            path = file.slice(8,file.length-1);
        }
        path = path.replace(dir, '');
        return path;
    }

    function printLog(date, path){
        let viewPath = `--->>> ${path}`;
        console.warn('\x1b[35m', `->>> Locale Date, Time { ${date} }` ,'\x1b[36m',viewPath, '\x1b[32m');
    }

    function getPath(err) {
        let text = new String(err);
        let splitText = text.split("\n");
        if (splitText.length > 1) {
            let file = JSON.stringify(splitText[1]);
            return file.slice(8,file.length - 1);
        } else {
            return splitText[0];
        }
    }
};
