
var path = require('path');
var appDir = path.resolve(__dirname);
var dir = appDir.split('/');
dir = dir.slice(0, dir.length - 2);
dir = dir.join('/');
module.exports = function (options) {
  let _emitChannels = options.broadcast;
  console = new Proxy(console, {
    get: (target, p)=>{
      return function(...args) {
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
              break;
            default:
              stack = new Error().stack;
              path = regex(stack);
              break;
          }
          printLog(path);
          _emitChannels(path, p, args);
        }
        return target[p].apply(this, args);
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

  function printLog(path, key, args){
    let viewPath = `\n===>>> ${path}`;
    console.warn('\x1b[36m%s\x1b[32m',viewPath);
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
