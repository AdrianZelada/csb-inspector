
const logs = require('./console');
module.exports = function consoleServerBrowser(options = {}) {
  logs({
    broadcast: (path, p,args, date) => {
      if (options.outputs) {
          options.outputs.forEach((channel) => {
              channel(path, p,args, date);
          })
      }
    }
  })
};