
const logs = require('./console');
const broadcast = require('./broadcast')();
module.exports = function consoleServerBrowser(options = {}) {
    // logs({
    //     broadcast: options.emitChannel || broadcast.emitChannel,
    // });

  logs({
    broadcast: (path, p,args) => {
      options.emitChannels.forEach((channel) => {
        channel(path, p,args);
      })
    }
  })
}
