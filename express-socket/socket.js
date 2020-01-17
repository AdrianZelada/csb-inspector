const utils = require('../utils');

module.exports = function (io, port) {
  const sockets = [];
  if (!io) {
    io = require('socket.io')(port);
  }

  io.on('connection', (socket) => {
    sockets.push(socket);
  });


  return {
    emitChannel: (path, prop, args, date) => {
      sockets.forEach((socket) => {
        socket.emit('console', {
          file: path,
          args,
          prop,
          date: utils.parseDateTime(date)
        });
      }, {});
    },
  };
}
