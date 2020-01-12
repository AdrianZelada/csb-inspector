# CSB-Inspector

csb-inspector is a library that shows us the name of the file and the line of code where the screen printing is executed
  ("console.log (data)" or other "console.function").

Example

![fileImage1](https://i.ibb.co/5vSbGCW/Screen-Shot-2020-01-12-at-2-42-03-AM.png)

Normal Display.

![imageNormal](https://i.ibb.co/wJPx5Jb/Screen-Shot-2020-01-12-at-2-42-39-AM.png)

With CSB-Inspector.

![imageCsb](https://i.ibb.co/sbDpzw2/Screen-Shot-2020-01-12-at-2-44-12-AM.png)

The library makes us see the name of the file and the line of code we even see we can visualize the details of the errors.

## Install

```
npm i --save csb-inspector
```

## How to Apply

### Implementation

```
const csbInspector = require('csb-inspector');

csbInspector();
```

### Options

We can also send you an object with an “outputs” property. It contains an array of functions that receive 3 parameters. This property helps us to extend the functionality of this library, obtaining those parameters we could save them in file or other options that we see useful. This parameter is not mandatory.
```
const csbInspector = require('csb-inspector');

options = {
// This option receives the data from each screen impression and gives us the possibility of extending the functionalities (Optional)
     outputs: [(path, prop, args, date)=>{
           fs.appendFileSync("file.txt", path);
       }]
   }

csbInspector(options);
```

This implementation will be useful for any NodeJs server.
