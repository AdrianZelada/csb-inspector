const express = require('express');
const router = express.Router();
const path = require('path');
const connectionSocket = require('./socket');
const consoleServerBrowser = require('../index');
const configPack = require('../package');
const fs = require('fs');
module.exports = (options) => {
  const app = options.app;
  let route = options.route || '_console';
  let ipHost = options.host || 'http://localhost';
  route = route[0] === '/' ? route : `/${route}`;
  const clientApp = path.join(__dirname, 'public');
  const port = options.port || 8888;
  const host = getHost(ipHost, options.socket ? app.get('port') : port);
  router.get('/*', (req, res) => {
    if(!options.disabledBrowser){
        const dirHtml = path.join(clientApp, 'console.html');
        fs.readFile(dirHtml, 'utf8',(err, data) => {
            if (err) throw err;
            data = data.replace('<title></title>',`<title>${configPack.name} - V${configPack.version}</title>`);
            data = data.replace('_baseurl_', route + '/');
            data = data.replace('<body>', `<body><span id="host" style="display: none;">${host}</span>`);
            data = data.replace('</body>', `<span style="font-size: 10px; float:right; color: white;">V${configPack.version}</span></body>`);
            res.set('Content-Type', 'text/html');
            res.send( Buffer.from(data));
        });
    } else {
        const dirHtml = path.join(clientApp, 'assets/disabled.html');
        fs.readFile(dirHtml, 'utf8',(err, data) => {
            if (err) throw err;
            res.set('Content-Type', 'text/html');
            res.send( Buffer.from(data));
        });
    }

  });

  function LogErrors(err, req, res, next) {
    if (err) {
      console.error('middleware', req.url, err);
    }
    next();
  };

  app.use(route, express.static(clientApp));
  app.use(route, router);
  app.use(LogErrors);
  let channels = [];
  if(!options.disabledBrowser) {
    const bus = connectionSocket(options.socket, port);
    channels = [bus.emitChannel];
  }
  if (options.outputs) {
    channels = [
      ...channels,
      ...options.outputs,
    ];
  }
  consoleServerBrowser({
    outputs: channels,
  });

  function getHost(host, port) {
    return `${host}:${port}`;
  }

  return app;
};
