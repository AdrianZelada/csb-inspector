const fs = require('fs');

module.exports = (name) => {
    const exits = fs.existsSync(name);
    if(!exits) {
        fs.writeFileSync(name, "");
    }

    return {
        emitChannel: (path, prop,args)=>{
            console.warn("socket", path);
            fs.appendFileSync(name, path);
        }
    }
}
