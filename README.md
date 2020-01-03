# CSB-Inspector

It captures the impressions in the console produced by the action of the "console.log" or "console.error" function in the Application Server made in nodejs.
This library is a help for the application developer on the server (BACKEND). There is a problem that at some point it is difficult to track the impressions on the console that we made at the time of development.

Also capturing the impressions in the console we emit in real time (SocketIo) to a display panel in the browser in the url
'http://localhost:{SERVER_PORT}/_console'

Currently the library can be integrated into Expressjs,

## Options

```
options = {
// express application ,
     app: app,
// Path where the application will be, by default it will be "_console" (Optional)
     route: "_console",
// Port where our Socket will point, by default it will be 8888 (Optional)
     port: 8888,
// This option receives the data from each screen impression and gives us the possibility of extending the functionalities (Optional)
     outputs: [(path, prop, args)=>{
           fs.appendFileSync("file.txt", path);
       }]
   }
```

## How to Apply

```
...
const express = require('express');
const app = express();

const CsbInspector = require('csb-inspector/express-socket');

.....
.....
.....

CsbInspector({
        app: app
    });

```

### Csb-Inspector Browser

Open your browser and load 'http://localhost:{SERVER_PORT}/_console'

File Code "users-route.js"

![fileImageI](https://i.ibb.co/8YkGk8n/Screen-Shot-2020-01-03-at-2-36-45-AM.png)

View Csb-Inspector.

![imageI](https://i.ibb.co/QDcxcpm/Screen-Shot-2020-01-03-at-2-18-47-AM.png)


### Impression on the console

CBS-Inspector displays these impressions on the console by adding the respective
 file name and code line where that impression was executed on the console.

File Code.

![fileImage1](https://i.ibb.co/7K8J91n/Screen-Shot-2020-01-03-at-2-33-11-AM.png)

Your Console.

![image1](https://i.ibb.co/LQ3ZnnV/Screen-Shot-2020-01-03-at-2-13-44-AM.png)

