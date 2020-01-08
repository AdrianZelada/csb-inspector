const express = require('express');
const router = express.Router();
const path = require('path');
const connectionSocket = require('./socket');
const consoleServerBrowser = require('../index');
module.exports = (options) => {
  const app = options.app;
  let route = options.route || '_console';
  route = route[0] === '/' ? route : `/${route}`;
  const clientApp = path.join(__dirname, 'public');
  const port = options.port || 8888;
  const host = getHost(options.socket ? app.get('port') : port);
  router.get('/*', (req, res) => {
    const dir = path.join(clientApp, 'index.ejs');
    res.render(dir,{
      data: {
        host: host,
        baseUrl: route
      }
    });
  });

  function LogErrors(err, req, res, next) {
    if (err) {
      console.error('middleware', req.url, err);
    }
    next();
  };

  app.set("view engine", "ejs");
  app.use(route, express.static(clientApp));
  app.use(route, router);
  app.use(LogErrors);
  const bus = connectionSocket(options.socket, port);

  let channels = [bus.emitChannel];

  if (options.outputs) {
    channels = [
      ...channels,
      ...options.outputs,
    ];
  }
  consoleServerBrowser({
    outputs: channels,
  });

  function getHost(port) {
    return `http://localhost:${port}`;
  }

  return app;
};

