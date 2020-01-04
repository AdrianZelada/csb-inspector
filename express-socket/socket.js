const moment = require('moment');
module.exports = function (io, port) {
  const sockets = [];
  if (!io) {
    io = require('socket.io')(port);
  }

  io.on('connection', (socket) => {
    sockets.push(socket);
  });


  return {
    emitChannel: (path, prop, args) => {
      const date = moment().format('DD-MM-YY, LTS');
      sockets.forEach((socket) => {
        socket.emit('console', {
          file: path,
          args,
          prop,
          date
        });
      }, {});
    },
  };
}
