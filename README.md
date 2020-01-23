# CSB-INSPECTOR

View complete [**Documentation**](!https://adrianzelada.github.io/csb-inspector)

## Introduction

Many times when developing an application with a Backend written in NodeJs, we tend to send many messages into the terminal “console.log (data)” to help us to keep track of the state of our application, at some point we find tedious to search that printing in the terminal, in some cases we are even mistaken in printing, in some cases we want to identify which file and line of code where that screen printing “console.log (data)” is running because NodeJs only prints the arguments that we pass and does not refer to which file and or in which line of code that print was executed.

**csb-inspector** is a library that identifies the file and code line where the “console.log (data)” screen printing is being executed and shows us the reference of where the printing is being executed.

<p align="center">
  <img src="https://i.ibb.co/7K8J91n/Screen-Shot-2020-01-03-at-2-33-11-AM.png">
</p>
<p align="center">
  <img src="https://i.ibb.co/LQ3ZnnV/Screen-Shot-2020-01-03-at-2-13-44-AM.png">
</p>


If we see the previous image, we can see the reference to the file and line of code that print in the terminal belongs to.


## Instalation

We go to our terminal and in the folder of our NodeJs project we install the dependency.

```
    $ npm install --save csb-inspector
```



## Terminal
#### csb-inspector

In the main file of your nodejs application write this code

```javascript
    const CsbInspector = require('csb-inspector');
    CsbInspector();
```
This is the simplest implementation, which helps to display the file and the line of code in the terminal.

**Options**

```javascript
    const CsbInspector = require('csb-inspector');
    CsbInspector({
      outputs: [
        (path, key, args, date)=> {
          // path:  "reference to file",
          // key: "type of console, 'log', 'error'",
          // args: 'arguments',
          // date: 'Object Date, When execute console'
        }
      ]
    });
```
***Description***

Options | Description | Required | Default
------- | ----------- | -------- | -------
***outputs*** | Array of functions that receive 4 parameters, which allows us to extend the functionality of the library | false | -




As we can see, we send you an object with an “outputs” property. It contains an array of functions that receive 4 parameters.

This property helps us to extend the functionality of this library, obtaining those parameters we could save them in a file or other options that we consider useful. This parameter is not required.
This implementation will be useful for any NodeJs server.

## Terminal and Express
#### csb-inspector/express-socket

The csb-inspector library provides a control panel that shows in the browser in real-time the prints in the terminal "console.log (data)" with its respective reference to the file and line of code and also displays the occurrence time.
This functionality can be implemented for applications based on ExpressJs.

This code must be in the file where the server is initialized with ExpressJs.

```javascript
  const express = require('express');
  const app = express();

  const CsbInspector = require('csb-inspector/express-socket');
  const options = {
      app: app
  }

  CsbInspector(options);
```
> ***ServerPort*** - Is the port where the server is running

Open your browser and load 'http://localhost:{ServerPort}/_console'

**Options**

The library allows us to configure it according to our environment.

```javascript
  const express = require('express');
  const app = express();

  const CsbInspector = require('csb-inspector/express-socket');
  const options = {
      app: app,
      route: "debugger_logs",
      port: 8888,
      host: "http://192.16.3.89",
      disabledBrowser: false,
      outputs: [
        (path, key, args, date)=> {
          // path:  "reference to file",
          // key: "type of console, 'log', 'error'",
          // args: 'arguments',
          // date: 'Object Date, when execute console'
            fs.appendFileSync("file.txt", path);
        }
      ]
    }
  CsbInspector(options);
```

***Description***

Options | Description | Required | Default
------- | ----------- | -------- | -------
***app*** | Express application | true | -
***route*** | Route where the control panel will be displayed | false | _console
***host*** | Host of Server | false | 'http://localhost'
***port*** | Port through the socket listens | false | 8888
***disabledBrowser*** | Disable control panel in browser | false | false
***outputs*** | Array of functions that receive 4 parameters, which allows us to extend the functionality of the library | false | -


Open your browser and load **URL** 'http://192.16.3.89:{***ServerPort***}/debugger_logs'.

> **URL** - Built with the above parameters.
>
> **ServerPort** - Is the port where the server is running.

We code

<p align="center">
  <img src="https://i.ibb.co/grSw7L2/Screen-Shot-2020-01-22-at-10-52-58-PM.png">
</p>

Browser

<p align="center">
  <img src="https://i.ibb.co/fnP71tj/Screen-Shot-2020-01-22-at-10-54-52-PM.png">
</p>

Terminal

<p align="center">
  <img src="https://i.ibb.co/qyM5r58/Screen-Shot-2020-01-22-at-10-58-15-PM.png">
</p>


## Feedback

Find a bug or have a feature request? Please file an [**issue!**](https://github.com/AdrianZelada/csb-inspector/issues)

## Contact

<a href="https://twitter.com/adrzelada?ref_src=twsrc%5Etfw" class="twitter-follow-button" data-show-count="false">Follow @adrzelada</a>


Adrian Pedro Zelada Torrez

Medium: [@adrianpedrozeladatorrez](https://medium.com/@adrianpedrozeladatorrez).

Email: zelada.torreza@gmail.com
